import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v0',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthCheck = () => api.get('/payment/health');

// Users
export const getUsers = () => api.get('/users');
export const saveUser = (data) => api.post('/users', data);
export const deleteUser = (nic) => api.delete(`/users/${nic}`);

// Vehicles
export const getVehicles = () => api.get('/vehicle');
export const saveVehicle = (data) => api.post('/vehicle', data);
export const deleteVehicle = (id) => api.delete(`/vehicle/${id}`);

// Tickets
export const getTickets = () => api.get('/ticket');
export const saveTicket = (data) => api.post('/ticket', data);
export const deleteTicket = (id) => api.delete(`/ticket/${id}`);

// Payments
export const getPayments = () => api.get('/payment');
export const savePayment = (data) => api.post('/payment', data);
export const deletePayment = (id) => api.delete(`/payment/${id}`);

export default api;
