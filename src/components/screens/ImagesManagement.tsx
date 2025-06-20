import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Screen } from '../../App';

interface ImagesManagementProps {
  onNavigate: (screen: Screen, item?: any) => void;
}

interface Image {
  id: number;
  name: string;
  photo: string;
}

export default function ImagesManagement({ onNavigate }: ImagesManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [viewImage, setViewImage] = useState<Image | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.thaneforestdivision.com/api/photos/');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await fetch(`https://api.thaneforestdivision.com/api/photos/${id}/`, {
        method: 'DELETE',
      });
      setImages(images => images.filter(img => img.id !== id));
      setSelectedIds(ids => ids.filter(i => i !== id));
    } catch (error) {
      alert('Failed to delete image.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm('Are you sure you want to delete the selected images?')) return;
    try {
      await fetch('https://api.thaneforestdivision.com/api/photos/delete-multiple/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });
      setImages(images => images.filter(img => !selectedIds.includes(img.id)));
      setSelectedIds([]);
    } catch (error) {
      alert('Failed to bulk delete images.');
    }
  };

  const handleSelect = (id: number) => {
    setSelectedIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredImages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredImages.map(img => img.id));
    }
  };

  const handleView = async (id: number) => {
    setViewLoading(true);
    setViewImage(null);
    try {
      const response = await fetch(`https://api.thaneforestdivision.com/api/photos/${id}/`);
      const data = await response.json();
      setViewImage(data);
    } catch (error) {
      alert('Failed to load image details.');
    } finally {
      setViewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-600">Loading images...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Images Management</h1>
          <p className="text-slate-600 mt-1">Manage your image library</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleBulkDelete}
            disabled={selectedIds.length === 0}
            className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Selected
          </button>
          <button
            onClick={() => onNavigate('image-form')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Image</span>
          </button>
        </div>
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
                <th className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
                    checked={selectedIds.length === filteredImages.length && filteredImages.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Preview</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Name</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((image, index) => (
                <tr key={image.id} className={`border-b border-slate-200 hover:bg-slate-50 ${selectedIds.includes(image.id) ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}> 
                  <td className="py-4 px-4 text-center align-middle">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300 hover:ring-2 hover:ring-blue-200"
                      checked={selectedIds.includes(image.id)}
                      onChange={() => handleSelect(image.id)}
                    />
                  </td>
                  <td className="py-4 px-6">
                    <img
                      src={image.photo}
                      alt={image.name}
                      className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900">{image.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleView(image.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNavigate('image-form', image)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDelete(image.id)}
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

      {/* Image Detail Modal */}
      {viewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
              onClick={() => setViewImage(null)}
            >
              &times;
            </button>
            {viewLoading ? (
              <div className="text-center text-slate-600">Loading...</div>
            ) : (
              <>
                <img
                  src={viewImage.photo}
                  alt={viewImage.name}
                  className="w-full h-48 object-cover rounded-lg border border-slate-200 mb-4"
                />
                <h2 className="text-xl font-bold text-slate-900 mb-2">{viewImage.name}</h2>
                <div className="text-slate-600">ID: {viewImage.id}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}