import React from 'react';
import { useData } from '../../context/DataContext';
import { BookingStatus } from '../../types';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const BookingManager: React.FC = () => {
  const { bookings, updateBookingStatus } = useData();

  const getStatusColor = (status: BookingStatus) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {bookings.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date / Time</th>
                  <th className="p-4">Service ID</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-bold text-gray-800">{booking.customerName}</p>
                      <p className="text-gray-500 text-xs">{booking.email}</p>
                    </td>
                    <td className="p-4">
                      {new Date(booking.date).toLocaleString()}
                    </td>
                    <td className="p-4 font-mono text-xs">{booking.serviceId}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                       <div className="flex gap-2">
                         {booking.status === 'new' && (
                           <>
                             <button onClick={() => updateBookingStatus(booking.id, 'confirmed')} title="Confirm" className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle size={18} /></button>
                             <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} title="Cancel" className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><XCircle size={18} /></button>
                           </>
                         )}
                         {booking.status === 'confirmed' && (
                           <button onClick={() => updateBookingStatus(booking.id, 'completed')} title="Mark Completed" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Clock size={18} /></button>
                         )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManager;