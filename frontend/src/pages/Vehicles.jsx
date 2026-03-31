import React, { useState, useEffect } from 'react';
import { getVehicles, saveVehicle, deleteVehicle } from '../api';
import { Trash2, Plus, Car } from 'lucide-react';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ vehicleNumber: '', vehicleModel: '', userNic: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getVehicles();
      setVehicles(res.data);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveVehicle(formData);
      setShowModal(false);
      setFormData({ vehicleNumber: '', vehicleModel: '', userNic: '' });
      fetchData();
    } catch(e) { alert('Error saving vehicle'); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this vehicle?')) return;
    try {
      await deleteVehicle(id);
      fetchData();
    } catch(e) { alert('Error deleting vehicle'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vehicles</h1>
          <p className="text-slate-500 text-sm">Manage registered vehicles</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
          <Car size={18} /> Add Vehicle
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading data...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
                <th className="p-4">Vehicle Number</th>
                <th className="p-4">Model</th>
                <th className="p-4">Owner NIC</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map(v => (
                <tr key={v.vehicleNumber} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm text-slate-900 font-medium">{v.vehicleNumber}</td>
                  <td className="p-4 text-sm text-slate-700">{v.vehicleModel}</td>
                  <td className="p-4 text-sm text-slate-500">{v.userNic}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(v.vehicleNumber)} className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">No vehicles found. Create one.</td>
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
              <h3 className="text-lg font-bold text-slate-900">Add New Vehicle</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label>
                <input required value={formData.vehicleNumber} onChange={e => setFormData({...formData, vehicleNumber: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition" placeholder="e.g. ABC-1234" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                <input required value={formData.vehicleModel} onChange={e => setFormData({...formData, vehicleModel: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition" placeholder="e.g. Toyota Prius" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Owner NIC</label>
                <input required value={formData.userNic} onChange={e => setFormData({...formData, userNic: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition" placeholder="Enter Owner's NIC" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition">Save Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Vehicles;
