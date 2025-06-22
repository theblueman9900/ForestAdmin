import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/screens/Dashboard';
import ImagesManagement from './components/screens/ImagesManagement';
import VideosManagement from './components/screens/VideosManagement';
import ServicesManagement from './components/screens/ServicesManagement';
import ContactsManagement from './components/screens/ContactsManagement';
import ImageForm from './components/forms/ImageForm';
import VideoForm from './components/forms/VideoForm';
import ServiceForm from './components/forms/ServiceForm';
import ContactView from './components/screens/ContactView';
import Login from './components/screens/Login';

export type Screen = 
  | 'dashboard' 
  | 'images' 
  | 'videos' 
  | 'services' 
  | 'contacts'
  | 'image-form'
  | 'video-form'
  | 'service-form'
  | 'contact-view';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true' && !!sessionStorage.getItem('token');
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Simulate login API call
  const loginApi = async (email: string, password: string): Promise<{ token: string }> => {
    // Replace this with your real API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a 50% chance of failure
        if (password === 'password123' && email === 'admin@example.com') {
          resolve({ token: 'fake-jwt-token-123' });
        } else {
          reject(new Error('Invalid credentials. Please try again.'));
        }
      }, 800);
    });
  };

  const handleLogin = async (email: string, password: string): Promise<void> => {
    const result = await loginApi(email, password);
    // The Login component will handle the error, so we don't need a try-catch here.
    // If login is successful, update the state.
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('token', result.token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('token');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <Header onMenuToggle={toggleSidebar} isMenuCollapsed={sidebarCollapsed} onLogout={handleLogout} />
      <main className={`transition-all duration-300 pt-16 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/images" element={<ImagesManagement />} />
          <Route path="/videos" element={<VideosManagement />} />
          <Route path="/services" element={<ServicesManagement />} />
          <Route path="/contacts" element={<ContactsManagement />} />
          <Route path="/image-form" element={<ImageForm />} />
          <Route path="/image-form/:id" element={<ImageForm />} />
          <Route path="/video-form" element={<VideoForm />} />
          <Route path="/video-form/:id" element={<VideoForm />} />
          <Route path="/service-form" element={<ServiceForm />} />
          <Route path="/service-form/:id" element={<ServiceForm />} />
          <Route path="/contact-view/:id" element={<ContactView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;