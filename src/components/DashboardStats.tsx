import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

export default function DashboardStats() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Users',
      value: '1,429',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Orders',
      value: '892',
      change: '+8.1%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Growth Rate',
      value: '23.4%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-slate-500 text-sm">vs last month</span>
              </div>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}