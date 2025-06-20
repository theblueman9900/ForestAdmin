import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, FileText, Eye } from 'lucide-react';
import { Screen } from '../../App';

interface ServicesManagementProps {
  onNavigate: (screen: Screen, item?: any) => void;
}

interface Service {
  id: number;
  title: string;
  description: string;
  file: string;
}

export default function ServicesManagement({ onNavigate }: ServicesManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [viewService, setViewService] = useState<Service | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://api.thaneforestdivision.com/api/services/');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await fetch(`https://api.thaneforestdivision.com/api/services/${id}/`, {
        method: 'DELETE',
      });
      setServices(services => services.filter(s => s.id !== id));
      setSelectedIds(ids => ids.filter(i => i !== id));
    } catch (error) {
      alert('Failed to delete service.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm('Are you sure you want to delete the selected services?')) return;
    try {
      await fetch('https://api.thaneforestdivision.com/api/services/delete-multiple/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });
      setServices(services => services.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    } catch (error) {
      alert('Failed to bulk delete services.');
    }
  };

  const handleSelect = (id: number) => {
    setSelectedIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredServices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredServices.map(s => s.id));
    }
  };

  const handleView = async (id: number) => {
    setViewLoading(true);
    setViewService(null);
    try {
      const response = await fetch(`https://api.thaneforestdivision.com/api/services/${id}/`);
      const data = await response.json();
      setViewService(data);
    } catch (error) {
      alert('Failed to load service details.');
    } finally {
      setViewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-600">Loading services...</div>
        </div>
      </div>
    );
  }

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

      {/* Bulk Delete Button */}
      <div className="mb-4">
        <button
          onClick={handleBulkDelete}
          disabled={selectedIds.length === 0}
          className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete Selected
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
                <th className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
                    checked={selectedIds.length === filteredServices.length && filteredServices.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Service Title</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Description</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">File</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service, index) => (
                <tr key={service.id} className={`border-b border-slate-200 hover:bg-slate-50 ${selectedIds.includes(service.id) ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}> 
                  <td className="py-4 px-4 text-center align-middle">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300 hover:ring-2 hover:ring-blue-200"
                      checked={selectedIds.includes(service.id)}
                      onChange={() => handleSelect(service.id)}
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900">{service.title}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600 max-w-md">{service.description}</div>
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href={`https://api.thaneforestdivision.com${service.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View File</span>
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleView(service.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNavigate('service-form', service)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDelete(service.id)}
                      >
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

      {/* Service Detail Modal */}
      {viewService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
              onClick={() => setViewService(null)}
            >
              &times;
            </button>
            {viewLoading ? (
              <div className="text-center text-slate-600">Loading...</div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{viewService.title}</h2>
                <div className="text-slate-600 mb-4">ID: {viewService.id}</div>
                <div className="mb-4 text-slate-700">{viewService.description}</div>
                <a
                  href={`https://api.thaneforestdivision.com${viewService.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <FileText className="w-4 h-4" />
                  <span>View File</span>
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}