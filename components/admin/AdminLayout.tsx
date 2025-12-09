
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, Calendar, MessageSquare, Type, Settings, LogOut, ExternalLink, Image as ImageIcon, Download } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Influencers', path: '/admin/influencers' },
    { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
    { icon: ImageIcon, label: 'Website Images', path: '/admin/images' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: Type, label: 'Content & Translations', path: '/admin/content' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col fixed h-full z-10 shadow-xl">
        <div className="p-6 border-b border-indigo-800">
          <h2 className="text-2xl font-black tracking-tight">Fanora<span className="text-pink-500">CMS</span></h2>
          <p className="text-xs text-indigo-300 mt-1">Admin Control Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'text-indigo-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-bold">{item.label}</span>
            </Link>
          ))}
          
           <div className="pt-4 mt-4 border-t border-indigo-800">
             <Link
              to="/download-assets"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-200 hover:bg-white/10 hover:text-white transition-all"
            >
              <Download size={20} />
              <span className="font-bold">Download Assets</span>
            </Link>
           </div>
        </nav>

        <div className="p-4 border-t border-indigo-800 space-y-2">
          <Link to="/" target="_blank" className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-300 hover:text-white transition-colors">
            <ExternalLink size={16} /> View Website
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
