import React, { useEffect, useState } from 'react';
import { Users, Car, Ticket, CreditCard, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { healthCheck } from '../api';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <p className="text-xs text-green-500 font-medium mt-1">{trend}</p>
    </div>
    <div className="bg-blue-50 p-3 rounded-lg">
      <Icon className="text-blue-600" size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  const [healthStatus, setHealthStatus] = useState('Checking...');

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const res = await healthCheck();
      setHealthStatus('Online');
    } catch (err) {
      setHealthStatus('Offline');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome to the Highway Toll Management System</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <Activity size={18} className={healthStatus === 'Online' ? 'text-green-500' : 'text-red-500'} />
          <span className="text-sm font-medium text-slate-700">API Gateway: {healthStatus}</span>
          <button onClick={checkHealth} className="ml-2 text-xs text-blue-600 hover:text-blue-800 underline">Refresh</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1,248" trend="+12% from last week" icon={Users} />
        <StatCard title="Registered Vehicles" value="842" trend="+5% from last week" icon={Car} />
        <StatCard title="Tickets Issued Today" value="156" trend="+18% from yesterday" icon={Ticket} />
        <StatCard title="Revenue Today" value="$3,420" trend="+8% from yesterday" icon={CreditCard} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Weekly Revenue ($)</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
