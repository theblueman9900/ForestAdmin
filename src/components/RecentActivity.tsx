import React from 'react';
import { Clock, User, ShoppingCart, FileText, CheckCircle } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'user',
      title: 'New user registered',
      description: 'John Smith created an account',
      time: '2 minutes ago',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'order',
      title: 'Order completed',
      description: 'Order #1234 was successfully processed',
      time: '15 minutes ago',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'order',
      title: 'New order received',
      description: 'Order #1235 requires processing',
      time: '1 hour ago',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      type: 'report',
      title: 'Monthly report generated',
      description: 'Sales report for November is ready',
      time: '2 hours ago',
      icon: FileText,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div className={`${activity.color} p-2 rounded-lg flex-shrink-0`}>
              <activity.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 mb-1">
                {activity.title}
              </p>
              <p className="text-sm text-slate-600 mb-1">
                {activity.description}
              </p>
              <div className="flex items-center text-xs text-slate-500">
                <Clock className="w-3 h-3 mr-1" />
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}