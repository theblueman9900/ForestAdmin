import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Play, ExternalLink } from 'lucide-react';
import { Screen } from '../../App';

interface VideosManagementProps {
  onNavigate: (screen: Screen, item?: any) => void;
}

export default function VideosManagement({ onNavigate }: VideosManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for videos
  const videos = [
    {
      id: 1,
      title: 'Company Introduction',
      description: 'Overview video showcasing our company values and mission',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '3:45',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Product Demo',
      description: 'Detailed demonstration of our flagship product features',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '8:22',
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      title: 'Customer Testimonials',
      description: 'Happy customers sharing their success stories',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '5:18',
      createdAt: '2024-01-13'
    },
    {
      id: 4,
      title: 'Behind the Scenes',
      description: 'A look at our development process and team culture',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '6:30',
      createdAt: '2024-01-12'
    }
  ];

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Videos Management</h1>
          <p className="text-slate-600 mt-1">Manage your video library</p>
        </div>
        <button
          onClick={() => onNavigate('video-form')}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Video</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-slate-600">
            {filteredVideos.length} videos found
          </div>
        </div>
      </div>

      {/* Videos Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Title</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Description</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Duration</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Video URL</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Created</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.map((video, index) => (
                <tr key={video.id} className={`border-b border-slate-200 hover:bg-slate-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-medium text-slate-900">{video.title}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600 max-w-xs truncate">{video.description}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600">{video.duration}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                      >
                        <span className="text-sm truncate max-w-32">View Video</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600">{video.createdAt}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNavigate('video-form', video)}
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