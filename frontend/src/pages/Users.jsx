import React, { useState, useEffect } from 'react';
import { getUsers, saveUser, deleteUser } from '../api';
import { Trash2, UserPlus } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ userNic: '', userName: '', userAddress: '', gender: '' });

  async function fetchData() {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      console.error('Failed to fetch users');
    }
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    getUsers()
      .then((res) => {
        if (isMounted) {
          setUsers(res.data);
        }
      })
      .catch(() => {
        console.error('Failed to fetch users');
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
      await saveUser(formData);
      setShowModal(false);
      setFormData({ userNic: '', userName: '', userAddress: '', gender: '' });
      fetchData();
    } catch { alert('Error saving user'); }
  };

  const handleDelete = async (nic) => {
    if(!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(nic);
      fetchData();
    } catch { alert('Error deleting user'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-500 text-sm">Manage system users and their details</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
          <UserPlus size={18} /> Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading data...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
                <th className="p-4">NIC</th>
                <th className="p-4">Full Name</th>
                <th className="p-4">Address</th>
                <th className="p-4">Gender</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.userNic} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm text-slate-900 font-medium">{u.userNic}</td>
                  <td className="p-4 text-sm text-slate-700">{u.userName}</td>
                  <td className="p-4 text-sm text-slate-500">{u.userAddress}</td>
                  <td className="p-4 text-sm text-slate-500">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.gender === 'MALE' ? 'bg-blue-100 text-blue-700' : u.gender === 'FEMALE' ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-700'}`}>
                      {u.gender || 'OTHER'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(u.userNic)} className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No users found. Create one.</td>
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
              <h3 className="text-lg font-bold text-slate-900">Add New User</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">NIC</label>
                <input required value={formData.userNic} onChange={e => setFormData({...formData, userNic: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="Enter NIC" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input required value={formData.userName} onChange={e => setFormData({...formData, userName: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="Enter Full Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <input required value={formData.userAddress} onChange={e => setFormData({...formData, userAddress: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" placeholder="Enter Address" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
                  <option value="">Select Gender</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition">Save User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Users;
