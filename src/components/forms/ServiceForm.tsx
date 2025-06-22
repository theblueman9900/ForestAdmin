import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (id) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://api.thaneforestdivision.com/api/services/${id}/`);
          if (!response.ok) {
            throw new Error('Failed to fetch service details.');
          }
          const data = await response.json();
          setTitle(data.title || '');
          setDescription(data.description || '');
          setPreviewUrl(data.file || '');
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchServiceData();
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
      formData.append('title', title);
      formData.append('description', description);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      let response;
      if (id) {
        response = await fetch(`https://api.thaneforestdivision.com/api/services/${id}/`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        response = await fetch('https://api.thaneforestdivision.com/api/services/', {
          method: 'POST',
          body: formData,
        });
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to save service');
      }
      navigate('/services');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/services');
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center text-slate-600 dark:text-slate-300">Loading form...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={handleCancel}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {id ? 'Edit Service' : 'Add New Service'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {id ? 'Update service details' : 'Upload a new service'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        {error && !isSubmitting && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400 p-4 mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Service Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter service title"
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter service description"
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              required
              rows={4}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Service File *</label>
            <input
              type="file"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileSelect}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-700 dark:file:text-slate-300 dark:hover:file:bg-slate-600"
            />
            {previewUrl && (
              <a href={`https://api.thaneforestdivision.com${previewUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 block">View Current File</a>
            )}
          </div>

          {/* Error */}
          {error && isSubmitting && <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>}

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : id ? 'Update Service' : 'Add Service'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}