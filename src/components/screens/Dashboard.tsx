import React, { useEffect, useState } from 'react';
import { Plus, Eye, Image as ImageIcon, Video as VideoIcon, FileText, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ImageItem { id: number; name: string; photo: string; }
interface VideoItem { id: number; name: string; video: string; }
interface ServiceItem { id: number; title: string; }
interface ContactItem { id: number; name: string; subject: string; }

export default function Dashboard() {
  const [stats, setStats] = useState({ images: 0, videos: 0, services: 0, contacts: 0 });
  const [recent, setRecent] = useState<{
    images: ImageItem[];
    videos: VideoItem[];
    services: ServiceItem[];
    contacts: ContactItem[];
  }>({ images: [], videos: [], services: [], contacts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const [imagesRes, videosRes, servicesRes, contactsRes] = await Promise.all([
          fetch('https://api.thaneforestdivision.com/api/photos/'),
          fetch('https://api.thaneforestdivision.com/api/videos/'),
          fetch('https://api.thaneforestdivision.com/api/services/'),
          fetch('https://api.thaneforestdivision.com/api/contacts/'),
        ]);
        const [images, videos, services, contacts] = await Promise.all([
          imagesRes.json(),
          videosRes.json(),
          servicesRes.json(),
          contactsRes.json(),
        ]);

        if (!imagesRes.ok || !videosRes.ok || !servicesRes.ok || !contactsRes.ok) {
          throw new Error('Failed to fetch some resources');
        }

        setStats({
          images: images.length,
          videos: videos.length,
          services: services.length,
          contacts: contacts.length,
        });
        setRecent({
          images: images.slice(0, 3),
          videos: videos.slice(0, 3),
          services: services.slice(0, 3),
          contacts: contacts.slice(0, 3),
        });
      } catch (e) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, Admin! 👋
        </h1>
        <p className="text-slate-600">
          Here's what's happening with your admin portal today.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center">
          <ImageIcon className="w-8 h-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-slate-900">{stats.images}</div>
          <div className="text-slate-600 mb-2">Images</div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm" onClick={() => navigate('/images')}>View All</button>
            <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm" onClick={() => navigate('/image-form')}>Add New</button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center">
          <VideoIcon className="w-8 h-8 text-red-500 mb-2" />
          <div className="text-2xl font-bold text-slate-900">{stats.videos}</div>
          <div className="text-slate-600 mb-2">Videos</div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm" onClick={() => navigate('/videos')}>View All</button>
            <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm" onClick={() => navigate('/video-form')}>Add New</button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center">
          <FileText className="w-8 h-8 text-purple-500 mb-2" />
          <div className="text-2xl font-bold text-slate-900">{stats.services}</div>
          <div className="text-slate-600 mb-2">Services</div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm" onClick={() => navigate('/services')}>View All</button>
            <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm" onClick={() => navigate('/service-form')}>Add New</button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center">
          <Mail className="w-8 h-8 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-slate-900">{stats.contacts}</div>
          <div className="text-slate-600 mb-2">Contacts</div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm" onClick={() => navigate('/contacts')}>View All</button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Images</h3>
          {loading ? <div>Loading...</div> : error ? <div className="text-red-500">{error}</div> : recent.images.length === 0 ? <div className="text-slate-500">No images</div> : recent.images.map((img) => (
            <div key={img.id} className="flex items-center mb-2">
              <img src={img.photo} alt={img.name} className="w-10 h-10 object-cover rounded mr-3 border" />
              <div className="flex-1">
                <div className="font-medium text-slate-900 text-sm">{img.name}</div>
              </div>
              <button className="text-blue-600 hover:underline text-xs" onClick={() => navigate('/images')}>View</button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Videos</h3>
          {loading ? <div>Loading...</div> : error ? <div className="text-red-500">{error}</div> : recent.videos.length === 0 ? <div className="text-slate-500">No videos</div> : recent.videos.map((vid) => (
            <div key={vid.id} className="flex items-center mb-2">
              <VideoIcon className="w-8 h-8 text-red-500 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-slate-900 text-sm">{vid.name}</div>
              </div>
              <button className="text-blue-600 hover:underline text-xs" onClick={() => navigate('/videos')}>View</button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Services</h3>
          {loading ? <div>Loading...</div> : error ? <div className="text-red-500">{error}</div> : recent.services.length === 0 ? <div className="text-slate-500">No services</div> : recent.services.map((srv) => (
            <div key={srv.id} className="flex items-center mb-2">
              <FileText className="w-8 h-8 text-purple-500 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-slate-900 text-sm">{srv.title}</div>
              </div>
              <button className="text-blue-600 hover:underline text-xs" onClick={() => navigate('/services')}>View</button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Contacts</h3>
          {loading ? <div>Loading...</div> : error ? <div className="text-red-500">{error}</div> : recent.contacts.length === 0 ? <div className="text-slate-500">No contacts</div> : recent.contacts.map((c) => (
            <div key={c.id} className="flex items-center mb-2">
              <Mail className="w-8 h-8 text-orange-500 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-slate-900 text-sm">{c.name}</div>
                <div className="text-xs text-slate-500">{c.subject}</div>
              </div>
              <button className="text-blue-600 hover:underline text-xs" onClick={() => navigate('/contacts')}>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}