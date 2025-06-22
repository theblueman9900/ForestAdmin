import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Image {
  id: number;
  name: string;
  photo: string;
}

export default function ImagesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [viewImage, setViewImage] = useState<Image | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.thaneforestdivision.com/api/photos/');
        if (!response.ok) {
          throw new Error('Failed to fetch images.');
        }
        const data = await response.json();
        setImages(data);
      } catch (error: any) {
        console.error('Error fetching images:', error);
        setError(error.message || 'An unexpected error occurred.');
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
    setDeleteError(null);
    try {
      const response = await fetch(`https://api.thaneforestdivision.com/api/photos/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete image.');
      }
      setImages(images => images.filter(img => img.id !== id));
      setSelectedIds(ids => ids.filter(i => i !== id));
    } catch (error: any) {
      setDeleteError(error.message || 'An unexpected error occurred.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm('Are you sure you want to delete the selected images?')) return;
    setDeleteError(null);
    try {
      const response = await fetch('https://api.thaneforestdivision.com/api/photos/delete-multiple/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete images.');
      }
      setImages(images => images.filter(img => !selectedIds.includes(img.id)));
      setSelectedIds([]);
    } catch (error: any) {
      setDeleteError(error.message || 'An unexpected error occurred.');
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
    setViewError(null);
    try {
      const response = await fetch(`https://api.thaneforestdivision.com/api/photos/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to load image details.');
      }
      const data = await response.json();
      setViewImage(data);
    } catch (error: any) {
      setViewError(error.message || 'An unexpected error occurred.');
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

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Images Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your image library</p>
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
            onClick={() => navigate('/image-form')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Image</span>
          </button>
        </div>
      </div>

      {deleteError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400 p-4 mb-6" role="alert">
          <p className="font-bold">Delete Error</p>
          <p>{deleteError}</p>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {filteredImages.length} images found
          </div>
        </div>
      </div>

      {/* Images Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 focus:ring-offset-slate-800"
                    checked={selectedIds.length === filteredImages.length && filteredImages.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-6 font-medium text-slate-900 dark:text-slate-100">Preview</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900 dark:text-slate-100">Name</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900 dark:text-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((image, index) => (
                <tr key={image.id} className={`border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${selectedIds.includes(image.id) ? 'bg-blue-50 dark:bg-blue-900/20' : index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-25 dark:bg-slate-800/50'}`}> 
                  <td className="py-4 px-4 text-center align-middle">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 focus:ring-offset-slate-800"
                      checked={selectedIds.includes(image.id)}
                      onChange={() => handleSelect(image.id)}
                    />
                  </td>
                  <td className="py-4 px-6">
                    <img
                      src={image.photo}
                      alt={image.name}
                      className="w-16 h-16 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{image.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        onClick={() => handleView(image.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/image-form/${image.id}`)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
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
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
              onClick={() => setViewImage(null)}
            >
              &times;
            </button>
            {viewLoading ? (
              <div className="text-center text-slate-600 dark:text-slate-300">Loading...</div>
            ) : viewError ? (
              <div className="text-red-500 dark:text-red-400 text-center">
                <p className="font-bold">Error</p>
                <p>{viewError}</p>
              </div>
            ) : (
              <>
                <img
                  src={viewImage.photo}
                  alt={viewImage.name}
                  className="w-full h-48 object-cover rounded-lg border border-slate-200 dark:border-slate-600 mb-4"
                />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{viewImage.name}</h2>
                <div className="text-slate-600 dark:text-slate-400">ID: {viewImage.id}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}