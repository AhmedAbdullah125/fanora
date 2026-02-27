import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { authStore } from './lib/authStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceMarketing from './pages/ServiceMarketing';
import ServiceStudio from './pages/ServiceStudio';
import Influencers from './pages/Influencers';
import InfluencerProfile from './pages/InfluencerProfile';
import Contact from './pages/Contact';
import DownloadAssets from './pages/DownloadAssets';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import InfluencerManager from './pages/admin/InfluencerManager';
import BookingManager from './pages/admin/BookingManager';
import ContentManager from './pages/admin/ContentManager';
import ImageManager from './pages/admin/ImageManager';
import RegisterPage from './pages/Register';
import RegisterSuccessPage from './pages/RegisterSuccess';
import LoginPlaceholder from './pages/LoginPlaceholder';
import ProfilePage from './pages/Profile';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main Layout Wrapper for Public Pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col font-sans text-indigo-900">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

// Middleware: Only accessible if NOT logged in
const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tokens = authStore.get();
  return tokens ? <Navigate to="/profile" replace /> : <>{children}</>;
};

// Middleware: Only accessible if logged in
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tokens = authStore.get();
  return tokens ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster position="top-center" richColors dir="rtl" />
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Utility Route */}
              <Route path="/download-assets" element={
                <PublicLayout>
                  <DownloadAssets />
                </PublicLayout>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/*" element={
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/influencers" element={<InfluencerManager />} />
                    <Route path="/bookings" element={<BookingManager />} />
                    <Route path="/images" element={<ImageManager />} />
                    <Route path="/messages" element={<Dashboard />} /> {/* Placeholder reused */}
                    <Route path="/content" element={<ContentManager />} />
                    <Route path="/settings" element={<Dashboard />} /> {/* Placeholder reused */}
                  </Routes>
                </AdminLayout>
              } />

              {/* Public Routes */}
              <Route path="/*" element={
                <PublicLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/marketing" element={<ServiceMarketing />} />
                    <Route path="/services/studio" element={<ServiceStudio />} />
                    <Route path="/influencers" element={<Influencers />} />
                    <Route path="/influencers/:id" element={<InfluencerProfile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<GuestRoute><LoginPlaceholder /></GuestRoute>} />
                    <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
                    <Route path="/register/success" element={<RegisterSuccessPage />} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  </Routes>
                </PublicLayout>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </DataProvider>
  );
};

export default App;
