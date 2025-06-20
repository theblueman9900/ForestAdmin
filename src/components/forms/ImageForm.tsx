import React, { useState } from 'react';
import { ArrowLeft, Upload, X, Image } from 'lucide-react';
import { Screen } from '../../App';

interface ImageFormProps {
  onNavigate: (screen: Screen) => void;
  editingItem?: any;
}

export default function ImageForm({ onNavigate, editingItem }: ImageFormProps) {
  const [title, setTitle] = useState(editingItem?.name || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(editingItem?.photo || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', title);
      
      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      let response;
      if (editingItem) {
        response = await fetch(`https://api.thaneforestdivision.com/api/photos/${editingItem.id}/`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        response = await fetch('https://api.thaneforestdivision.com/api/photos/', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save image');
      }

      onNavigate('images');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onNavigate('images');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => onNavigate('images')}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {editingItem ? 'Edit Image' : 'Add New Image'}
          </h1>
          <p className="text-slate-600 mt-1">
            {editingItem ? 'Update image details' : 'Upload and configure a new image'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
              Image Name *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image name"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Image File {!editingItem && '*'}
            </label>
            
            {/* Preview */}
            {previewUrl && (
              <div className="mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg border border-slate-200"
                />
              </div>
            )}

            {/* File Input */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                required={!editingItem}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Click to upload an image
                  </p>
                  <p className="text-xs text-slate-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>

            {selectedFile && (
              <div className="mt-2 flex items-center space-x-2">
                <Image className="w-4 h-4 text-green-600" />
                <span className="text-sm text-slate-700">{selectedFile.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(editingItem?.photo || '');
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </div>
              ) : (
                'Save Image'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}