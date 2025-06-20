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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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