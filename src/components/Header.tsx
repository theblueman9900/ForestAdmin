import React from 'react';
import { Search, Bell, User, ChevronDown, Menu, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuCollapsed: boolean;
  onLogout: () => void;
}

export default function Header({ onMenuToggle, isMenuCollapsed, onLogout }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`fixed top-0 right-0 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-40 transition-all duration-300 ${
      isMenuCollapsed ? 'left-16' : 'left-64'
    }`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Admin Portal</span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-slate-600" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Admin User</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-500 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}