import React from 'react';
import { useData } from '../../context/DataContext';
import { Users, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { influencers, bookings, messages, services } = useData();

  const stats = [
    { label: 'Total Influencers', value: influencers.length, icon: Users, color: 'bg-blue-500', link: '/admin/influencers' },
    { label: 'Active Services', value: services.length, icon: TrendingUp, color: 'bg-purple-500', link: '/admin/content' },
    { label: 'Pending Bookings', value: bookings.filter(b => b.status === 'new').length, icon: Calendar, color: 'bg-pink-500', link: '/admin/bookings' },
    { label: 'Unread Messages', value: messages.filter(m => !m.isRead).length, icon: MessageSquare, color: 'bg-orange-500', link: '/admin/messages' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-4xl font-black text-gray-800">{stat.value}</span>
            </div>
            <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
            <Link to="/admin/bookings" className="text-sm text-pink-600 font-bold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No bookings yet.</p>
            ) : (
              bookings.slice(0, 4).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-bold text-gray-800">{booking.customerName}</p>
                    <p className="text-xs text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    booking.status === 'new' ? 'bg-blue-100 text-blue-700' : 
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Messages</h3>
            <Link to="/admin/messages" className="text-sm text-pink-600 font-bold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
             {messages.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No messages yet.</p>
            ) : (
              messages.slice(0, 4).map((msg) => (
                <div key={msg.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-bold text-gray-800">{msg.name}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{msg.subject}</p>
                  </div>
                  {!msg.isRead && <span className="w-2 h-2 rounded-full bg-pink-500"></span>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;