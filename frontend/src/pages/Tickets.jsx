import React, { useState, useEffect } from 'react';
import { getTickets, saveTicket, deleteTicket } from '../api';
import { Trash2, Ticket as TicketIcon } from 'lucide-react';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ ticketId: '', description: '', status: '', userNic: '', vehicleNumber: '' });

  async function fetchData() {
    setLoading(true);
    try {
      const res = await getTickets();
      setTickets(res.data);
    } catch {
      console.error('Failed to fetch tickets');
    }
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    getTickets()
      .then((res) => {
        if (isMounted) {
          setTickets(res.data);
        }
      })
      .catch(() => {
        console.error('Failed to fetch tickets');
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveTicket(formData);
      setShowModal(false);
      setFormData({ ticketId: '', description: '', status: '', userNic: '', vehicleNumber: '' });
      fetchData();
    } catch { alert('Error saving ticket'); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this ticket?')) return;
    try {
      await deleteTicket(id);
      fetchData();
    } catch { alert('Error deleting ticket'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tickets</h1>
          <p className="text-slate-500 text-sm">Issue and track highway toll tickets</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
          <TicketIcon size={18} /> Issue Ticket
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading data...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
                <th className="p-4">Ticket ID</th>
                <th className="p-4">Description</th>
                <th className="p-4">Status</th>
                <th className="p-4">User NIC</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map(t => (
                <tr key={t.ticketId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm text-slate-900 font-medium">{t.ticketId}</td>
                  <td className="p-4 text-sm text-slate-700">{t.description}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{t.userNic}</td>
                  <td className="p-4 text-sm text-slate-500">{t.vehicleNumber}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(t.ticketId)} className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">No tickets found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Issue New Ticket</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ticket ID</label>
                <input required value={formData.ticketId} onChange={e => setFormData({...formData, ticketId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition">
                  <option value="">Select Status</option>
                  <option value="NONPAID">NONPAID</option>
                  <option value="PAID">PAID</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">User NIC</label>
                <input required value={formData.userNic} onChange={e => setFormData({...formData, userNic: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label>
                <input required value={formData.vehicleNumber} onChange={e => setFormData({...formData, vehicleNumber: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition">Save Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Tickets;
