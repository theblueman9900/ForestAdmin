import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Screen } from '../../App';

interface ImagesManagementProps {
  onNavigate: (screen: Screen, item?: any) => void;
}

export default function ImagesManagement({ onNavigate }: ImagesManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for images
  const images = [
    {
      id: 1,
      title: 'Homepage Hero Image',
      description: 'Main banner image for the homepage',
      thumbnail: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Product Showcase',
      description: 'Featured product image for marketing',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      title: 'Team Photo',
      description: 'Official team photo for about page',
      thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      createdAt: '2024-01-13'
    },
    {
      id: 4,
      title: 'Office Space',
      description: 'Modern office interior for corporate page',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      createdAt: '2024-01-12'
    }
  ];

  const filteredImages = images.filter(image =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Images Management</h1>
          <p className="text-slate-600 mt-1">Manage your image library</p>
        </div>
        <button
          onClick={() => onNavigate('image-form')}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Image</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-slate-600">
            {filteredImages.length} images found
          </div>
        </div>
      </div>

      {/* Images Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Preview</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Title</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Description</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Created</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((image, index) => (
                <tr key={image.id} className={`border-b border-slate-200 hover:bg-slate-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                  <td className="py-4 px-6">
                    <img
                      src={image.thumbnail}
                      alt={image.title}
                      className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900">{image.title}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600 max-w-xs truncate">{image.description}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600">{image.createdAt}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNavigate('image-form', image)}
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