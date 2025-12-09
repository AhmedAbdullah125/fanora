import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) navigate('/admin');
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid password. Try "admin123"');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-full text-white shadow-lg">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-black text-white text-center mb-2">Fanora Admin</h2>
        <p className="text-indigo-200 text-center mb-8">Secure Access Portal</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              autoFocus
            />
          </div>
          {error && <p className="text-red-300 text-sm font-bold text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
          >
            Authenticate
          </button>
        </form>
        <p className="text-center text-white/30 text-xs mt-6">Hint: Pass is admin123</p>
      </div>
    </div>
  );
};

export default Login;