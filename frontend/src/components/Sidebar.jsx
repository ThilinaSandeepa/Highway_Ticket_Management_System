import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Car, Ticket, CreditCard } from 'lucide-react';

const Sidebar = () => {
  const routes = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/users', icon: <Users size={20} /> },
    { name: 'Vehicles', path: '/vehicles', icon: <Car size={20} /> },
    { name: 'Tickets', path: '/tickets', icon: <Ticket size={20} /> },
    { name: 'Payments', path: '/payments', icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col hidden md:flex">
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Ticket className="text-blue-500" />
          HighwayToll
        </h1>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {routes.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 transition-colors ${
                    isActive ? 'bg-blue-600 text-white border-l-4 border-blue-400' : 'hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                  }`
                }
              >
                {route.icon}
                <span className="font-medium">{route.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-800 text-sm text-center text-slate-500">
        &copy; 2026 Traffic Ops
      </div>
    </div>
  );
};

export default Sidebar;
