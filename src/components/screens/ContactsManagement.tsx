import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.thaneforestdivision.com/api/contacts/');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts.');
        }
        const data = await response.json();
        setContacts(data);
      } catch (error: any) {
        console.error('Error fetching contacts:', error);
        setError(error.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    setDeleteError(null);
    try {
      const response = await fetch(`https://api.thaneforestdivision.com/api/contacts/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact.');
      }
      setContacts(contacts => contacts.filter(c => c.id !== id));
    } catch (error: any) {
      setDeleteError(error.message || 'An unexpected error occurred.');
    }
  };

  const handleView = async (id: number) => {
    navigate(`/contact-view/${id}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-600">Loading contacts...</div>
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
          <h1 className="text-2xl font-bold text-slate-900">Contacts Management</h1>
          <p className="text-slate-600 mt-1">Manage your contacts</p>
        </div>
      </div>

      {deleteError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p className="font-bold">Delete Error</p>
          <p>{deleteError}</p>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-slate-600">
            {filteredContacts.length} contacts found
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Name</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Email</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Subject</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={contact.id} className={`border-b border-slate-200 hover:bg-slate-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900">{contact.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600">{contact.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600">{contact.subject}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleView(contact.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDelete(contact.id)}
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
    </div>
  );
}