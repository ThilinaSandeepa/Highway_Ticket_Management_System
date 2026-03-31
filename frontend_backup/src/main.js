import "./style.css";

const api = {
  async request(path, options = {}) {
    const res = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(errorBody || `Request failed: ${res.status}`);
    }

    if (res.status === 204) {
      return null;
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },

  listUsers: () => api.request("/api/v0/users"),
  createUser: (payload) => api.request("/api/v0/users", { method: "POST", body: JSON.stringify(payload) }),
  deleteUser: (id) => api.request(`/api/v0/users/${encodeURIComponent(id)}`, { method: "DELETE" }),

  listVehicles: () => api.request("/api/v0/vehicle"),
  createVehicle: (payload) => api.request("/api/v0/vehicle", { method: "POST", body: JSON.stringify(payload) }),
  deleteVehicle: (id) => api.request(`/api/v0/vehicle/${encodeURIComponent(id)}`, { method: "DELETE" }),

  listTickets: () => api.request("/api/v0/ticket"),
  createTicket: (payload) => api.request("/api/v0/ticket", { method: "POST", body: JSON.stringify(payload) }),
  deleteTicket: (id) => api.request(`/api/v0/ticket/${encodeURIComponent(id)}`, { method: "DELETE" }),

  listPayments: () => api.request("/api/v0/payment"),
  createPayment: (payload) => api.request("/api/v0/payment", { method: "POST", body: JSON.stringify(payload) }),
  deletePayment: (id) => api.request(`/api/v0/payment/${encodeURIComponent(id)}`, { method: "DELETE" })
};

const toastEl = document.getElementById("toast");
const healthBtn = document.getElementById("health-check");
const healthResult = document.getElementById("health-result");

function showToast(message, isError = false) {
  toastEl.textContent = message;
  toastEl.style.background = isError ? "#7f1d1d" : "#142b20";
  toastEl.classList.add("show");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2200);
}

function wireCreateForm(formId, createFn, transformPayload, reloadFn) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = transformPayload(Object.fromEntries(formData.entries()));

    try {
      await createFn(payload);
      showToast("Saved successfully");
      form.reset();
      await reloadFn();
    } catch (error) {
      showToast(error.message, true);
    }
  });
}

function renderList(containerId, rows, titleBuilder, subBuilder, deleteFn, idField) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (!Array.isArray(rows) || rows.length === 0) {
    container.innerHTML = "<p class=\"item-sub\">No records found.</p>";
    return;
  }

  rows.forEach((row) => {
    const card = document.createElement("article");
    card.className = "list-item";

    const textWrapper = document.createElement("div");
    textWrapper.innerHTML = `<p class="item-title">${titleBuilder(row)}</p><p class="item-sub">${subBuilder(row)}</p>`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-danger";
    removeBtn.type = "button";
    removeBtn.textContent = "Delete";
    removeBtn.addEventListener("click", async () => {
      try {
        await deleteFn(row[idField]);
        showToast("Deleted");
        card.remove();
      } catch (error) {
        showToast(error.message, true);
      }
    });

    card.append(textWrapper, removeBtn);
    container.appendChild(card);
  });
}

async function loadUsers() {
  const users = await api.listUsers();
  renderList(
    "users-list",
    users,
    (u) => `${u.userName} (${u.userNic})`,
    (u) => `${u.gender} | ${u.userAddress}`,
    api.deleteUser,
    "userNic"
  );
}

async function loadVehicles() {
  const vehicles = await api.listVehicles();
  renderList(
    "vehicles-list",
    vehicles,
    (v) => `${v.vehicleNumber} - ${v.vehicleModel}`,
    (v) => `Owner NIC: ${v.userNic}`,
    api.deleteVehicle,
    "vehicleNumber"
  );
}

async function loadTickets() {
  const tickets = await api.listTickets();
  renderList(
    "tickets-list",
    tickets,
    (t) => `${t.ticketId} (${t.status})`,
    (t) => `${t.description} | NIC: ${t.userNic} | Vehicle: ${t.vehicleNumber}`,
    api.deleteTicket,
    "ticketId"
  );
}

async function loadPayments() {
  const payments = await api.listPayments();
  renderList(
    "payments-list",
    payments,
    (p) => `${p.paymentId} (${p.status})`,
    (p) => `Ticket: ${p.ticketId} | Amount: ${p.amount} | Date: ${p.date}`,
    api.deletePayment,
    "paymentId"
  );
}

async function refreshAll() {
  const loaders = [loadUsers, loadVehicles, loadTickets, loadPayments];
  const results = await Promise.allSettled(loaders.map((fn) => fn()));
  const failCount = results.filter((r) => r.status === "rejected").length;

  if (failCount > 0) {
    showToast(`${failCount} section(s) failed to load. Verify backend services.`, true);
    return;
  }

  showToast("All sections refreshed");
}

wireCreateForm("users-form", api.createUser, (x) => x, loadUsers);
wireCreateForm("vehicles-form", api.createVehicle, (x) => x, loadVehicles);
wireCreateForm("tickets-form", api.createTicket, (x) => x, loadTickets);
wireCreateForm("payments-form", api.createPayment, (x) => ({ ...x, amount: Number(x.amount) }), loadPayments);

document.querySelectorAll("button[data-refresh]").forEach((button) => {
  button.addEventListener("click", async () => {
    const section = button.dataset.refresh;

    try {
      if (section === "users") await loadUsers();
      if (section === "vehicles") await loadVehicles();
      if (section === "tickets") await loadTickets();
      if (section === "payments") await loadPayments();
      showToast(`Refreshed ${section}`);
    } catch (error) {
      showToast(error.message, true);
    }
  });
});

healthBtn.addEventListener("click", async () => {
  healthResult.textContent = "Checking...";
  try {
    const [users, vehicles, tickets, payments] = await Promise.all([
      api.listUsers(),
      api.listVehicles(),
      api.listTickets(),
      api.listPayments()
    ]);

    healthResult.textContent = `OK | Users: ${users.length} | Vehicles: ${vehicles.length} | Tickets: ${tickets.length} | Payments: ${payments.length}`;
    showToast("Gateway and services responding");
  } catch (error) {
    healthResult.textContent = "Failed";
    showToast(`Health check failed: ${error.message}`, true);
  }
});

refreshAll();
