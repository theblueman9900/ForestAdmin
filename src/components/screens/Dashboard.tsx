import React from 'react';
import DashboardStats from '../DashboardStats';
import RecentActivity from '../RecentActivity';
import QuickActions from '../QuickActions';

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, Admin! 👋
        </h1>
        <p className="text-slate-600">
          Here's what's happening with your admin portal today.
        </p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        
        {/* Quick Actions - Takes 1 column */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Overview</h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <p className="text-slate-600">Chart visualization would go here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Server Status</span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Online</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Database</span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Connected</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">API Services</span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Running</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}