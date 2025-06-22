import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ImageForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageData = async () => {
      if (id) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://api.thaneforestdivision.com/api/photos/${id}/`);
          if (!response.ok) {
            throw new Error('Failed to fetch image details.');
          }
          const data = await response.json();
          setTitle(data.name || '');
          setPreviewUrl(data.photo || '');
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchImageData();
  }, [id]);

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
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', title);
      if (selectedFile) {
        formData.append('photo', selectedFile);
      }
      let response;
      if (id) {
        response = await fetch(`https://api.thaneforestdivision.com/api/photos/${id}/`, {
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to save image');
      }
      navigate('/images');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the image');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/images');
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center text-slate-600">Loading form...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={handleCancel}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {id ? 'Edit Image' : 'Add New Image'}
          </h1>
          <p className="text-slate-600 mt-1">
            {id ? 'Update image details' : 'Upload a new image'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {error && !isSubmitting && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Image Name *
            </label>
            <input
              id="name"
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Image File *</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="w-16 h-16 object-cover rounded border" />
              )}
            </div>
          </div>

          {/* Error for submission */}
          {error && isSubmitting && <div className="text-red-600 text-sm">{error}</div>}

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : id ? 'Update Image' : 'Add Image'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}