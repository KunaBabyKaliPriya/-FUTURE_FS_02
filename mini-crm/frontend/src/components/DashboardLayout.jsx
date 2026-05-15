import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/leads', icon: '👥', label: 'Leads' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-indigo-800 to-indigo-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-indigo-700">
          <span className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>MiniCRM</span>
          <span className={`font-bold text-xl ${sidebarOpen && 'hidden'}`}>MC</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors duration-200 group"
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
          >
            <span className="text-xl">🚪</span>
            <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900 text-2xl"
          >
            ☰
          </button>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome back!</span>
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}