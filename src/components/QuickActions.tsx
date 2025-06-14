import React from 'react';
import { Plus, Upload, Download, Settings, Users, FileText } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    {
      title: 'Add User',
      description: 'Create a new user account',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Import Data',
      description: 'Upload CSV or Excel files',
      icon: Upload,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Export Report',
      description: 'Download analytics report',
      icon: Download,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'System Settings',
      description: 'Configure application',
      icon: Settings,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-1 text-left`}
          >
            <div className="flex items-center space-x-3">
              <action.icon className="w-5 h-5" />
              <div>
                <p className="font-medium">{action.title}</p>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}