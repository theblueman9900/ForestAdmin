import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Play, ExternalLink, Eye } from 'lucide-react';
import { Screen } from '../../App';

interface VideosManagementProps {
  onNavigate: (screen: Screen, item?: any) => void;
}

interface Video {
  id: number;
  name: string;
  video: string;
}

export default function VideosManagement({ onNavigate }: VideosManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [viewVideo, setViewVideo] = useState<Video | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://api.thaneforestdivision.com/api/videos/');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await fetch(`https://api.thaneforestdivision.com/api/videos/${id}/`, {
        method: 'DELETE',
      });
      setVideos(videos => videos.filter(v => v.id !== id));
      setSelectedIds(ids => ids.filter(i => i !== id));
    } catch (error) {
      alert('Failed to delete video.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm('Are you sure you want to delete the selected videos?')) return;
    try {
      await fetch('https://api.thaneforestdivision.com/api/videos/delete-multiple/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });
      setVideos(videos => videos.filter(v => !selectedIds.includes(v.id)));
      setSelectedIds([]);
    } catch (error) {
      alert('Failed to bulk delete videos.');
    }
  };

  const handleSelect = (id: number) => {
    setSelectedIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredVideos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredVideos.map(v => v.id));
    }
  };

  const handleView = async (id: number) => {
    setViewLoading(true);
    setViewVideo(null);
    try {
      const response = await fetch(`https://api.thaneforestdivision.com/api/videos/${id}/`);
      const data = await response.json();
      setViewVideo(data);
    } catch (error) {
      alert('Failed to load video details.');
    } finally {
      setViewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-600">Loading videos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Videos Management</h1>
          <p className="text-slate-600 mt-1">Manage your video library</p>
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
            onClick={() => onNavigate('video-form')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Video</span>
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
                <th className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
                    checked={selectedIds.length === filteredVideos.length && filteredVideos.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Name</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Video</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.map((video, index) => (
                <tr key={video.id} className={`border-b border-slate-200 hover:bg-slate-50 ${selectedIds.includes(video.id) ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}> 
                  <td className="py-4 px-4 text-center align-middle">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300 hover:ring-2 hover:ring-blue-200"
                      checked={selectedIds.includes(video.id)}
                      onChange={() => handleSelect(video.id)}
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-medium text-slate-900">{video.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <a
                        href={video.video}
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
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleView(video.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNavigate('video-form', video)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDelete(video.id)}
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

      {/* Video Detail Modal */}
      {viewVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
              onClick={() => setViewVideo(null)}
            >
              &times;
            </button>
            {viewLoading ? (
              <div className="text-center text-slate-600">Loading...</div>
            ) : (
              <>
                <video
                  src={viewVideo.video}
                  controls
                  className="w-full h-48 object-cover rounded-lg border border-slate-200 mb-4"
                />
                <h2 className="text-xl font-bold text-slate-900 mb-2">{viewVideo.name}</h2>
                <div className="text-slate-600">ID: {viewVideo.id}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}