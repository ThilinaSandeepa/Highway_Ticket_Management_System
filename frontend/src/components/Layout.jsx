import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search, UserCircle } from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center bg-slate-100 rounded-md px-3 py-1.5 w-64">
            <Search className="text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none ml-2 text-sm w-full text-slate-700 placeholder-slate-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-700 transition">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <UserCircle size={28} className="text-slate-400" />
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
