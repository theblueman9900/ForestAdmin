import React, { useState } from 'react';
import { ArrowLeft, Upload, X, Video, Link } from 'lucide-react';
import { Screen } from '../../App';

interface VideoFormProps {
  onNavigate: (screen: Screen) => void;
  editingItem?: any;
}

export default function VideoForm({ onNavigate, editingItem }: VideoFormProps) {
  const [title, setTitle] = useState(editingItem?.title || '');
  const [description, setDescription] = useState(editingItem?.description || '');
  const [videoUrl, setVideoUrl] = useState(editingItem?.videoUrl || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourceType, setSourceType] = useState<'url' | 'file'>('url');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate save process
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('videos');
    }, 1000);
  };

  const handleCancel = () => {
    onNavigate('videos');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => onNavigate('videos')}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {editingItem ? 'Edit Video' : 'Add New Video'}
          </h1>
          <p className="text-slate-600 mt-1">
            {editingItem ? 'Update video details' : 'Upload or link a new video'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
              Video Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              rows={4}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Video Source Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Video Source *
            </label>
            <div className="flex space-x-4 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="url"
                  checked={sourceType === 'url'}
                  onChange={(e) => setSourceType(e.target.value as 'url' | 'file')}
                  className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-slate-700">Video URL</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="file"
                  checked={sourceType === 'file'}
                  onChange={(e) => setSourceType(e.target.value as 'url' | 'file')}
                  className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-slate-700">Upload File</span>
              </label>
            </div>

            {/* URL Input */}
            {sourceType === 'url' && (
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={sourceType === 'url'}
                />
              </div>
            )}

            {/* File Upload */}
            {sourceType === 'file' && (
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Click to upload a video file
                    </p>
                    <p className="text-xs text-slate-500">
                      MP4, MOV, AVI up to 100MB
                    </p>
                  </div>
                </label>

                {selectedFile && (
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <Video className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-slate-700">{selectedFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

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
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Video'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}