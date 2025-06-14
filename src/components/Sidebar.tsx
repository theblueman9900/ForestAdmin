import React from 'react';
import {
  LayoutDashboard,
  Image,
  Video,
  Briefcase,
  Mail,
  ChevronRight,
  Building2
} from 'lucide-react';
import { Screen } from '../App';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function Sidebar({ isCollapsed, onToggle, currentScreen, onNavigate }: SidebarProps) {
  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', screen: 'dashboard' as Screen },
    { icon: Image, label: 'Images', screen: 'images' as Screen },
    { icon: Video, label: 'Videos', screen: 'videos' as Screen },
    { icon: Briefcase, label: 'Services', screen: 'services' as Screen },
    { icon: Mail, label: 'Contacts', screen: 'contacts' as Screen },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 transition-all duration-300 z-50 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-white">AdminPro</span>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={onToggle}
              className="p-1 hover:bg-slate-700 rounded-md transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onNavigate(item.screen)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  currentScreen === item.screen
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                  currentScreen === item.screen ? 'text-white' : 'text-slate-400 group-hover:text-white'
                }`} />
                {!isCollapsed && (
                  <span className="flex-1 text-left">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Collapse Button for Mobile */}
      {isCollapsed && (
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onToggle}
            className="w-full p-2 hover:bg-slate-700 rounded-md transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-400 mx-auto transform rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}