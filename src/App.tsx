import React, { useState } from 'react';
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
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const navigateToScreen = (screen: Screen, item?: any) => {
    setCurrentScreen(screen);
    setEditingItem(item || null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'images':
        return <ImagesManagement onNavigate={navigateToScreen} />;
      case 'videos':
        return <VideosManagement onNavigate={navigateToScreen} />;
      case 'services':
        return <ServicesManagement onNavigate={navigateToScreen} />;
      case 'contacts':
        return <ContactsManagement onNavigate={navigateToScreen} />;
      case 'image-form':
        return <ImageForm onNavigate={navigateToScreen} editingItem={editingItem} />;
      case 'video-form':
        return <VideoForm onNavigate={navigateToScreen} editingItem={editingItem} />;
      case 'service-form':
        return <ServiceForm onNavigate={navigateToScreen} editingItem={editingItem} />;
      case 'contact-view':
        return <ContactView onNavigate={navigateToScreen} contact={editingItem} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentScreen={currentScreen}
        onNavigate={navigateToScreen}
      />
      
      <Header 
        onMenuToggle={toggleSidebar} 
        isMenuCollapsed={sidebarCollapsed}
        currentScreen={currentScreen}
        onLogout={handleLogout}
      />
      
      <main className={`transition-all duration-300 pt-16 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;