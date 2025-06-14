import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Screen } from '../../App';

interface ServicesManagementProps {
  onNavigate: (screen: Screen, item?: any) => void;
}

export default function ServicesManagement({ onNavigate }: ServicesManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for services
  const services = [
    {
      id: 1,
      title: 'Web Development',
      shortDescription: 'Custom website development using modern technologies',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      shortDescription: 'Native and cross-platform mobile application development',
      status: 'active',
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      title: 'Digital Marketing',
      shortDescription: 'Comprehensive digital marketing strategies and campaigns',
      status: 'inactive',
      createdAt: '2024-01-13'
    },
    {
      id: 4,
      title: 'UI/UX Design',
      shortDescription: 'User interface and user experience design services',
      status: 'active',
      createdAt: '2024-01-12'
    },
    {
      id: 5,
      title: 'Cloud Solutions',
      shortDescription: 'Cloud infrastructure setup and migration services',
      status: 'active',
      createdAt: '2024-01-11'
    }
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services Management</h1>
          <p className="text-slate-600 mt-1">Manage your service offerings</p>
        </div>
        <button
          onClick={() => onNavigate('service-form')}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-slate-600">
            {filteredServices.length} services found
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Service Title</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Short Description</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Created</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service, index) => (
                <tr key={service.id} className={`border-b border-slate-200 hover:bg-slate-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900">{service.title}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600 max-w-md">{service.shortDescription}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {service.status === 'active' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 font-medium">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-red-600 font-medium">Inactive</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600">{service.createdAt}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onNavigate('service-form', service)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}