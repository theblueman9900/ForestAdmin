import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Screen } from '../../App';

interface ContactsManagementProps {
  onNavigate: (screen: Screen, item?: any) => void;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactsManagement({ onNavigate }: ContactsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://api.thaneforestdivision.com/api/contacts/');
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
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

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-600">Loading contacts...</div>
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
          <p className="text-slate-600 mt-1">Manage incoming contact messages</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            {contacts.length} total messages
          </div>
        </div>
      </div>

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
            {filteredContacts.length} messages found
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Sender</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Subject</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Phone</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={contact.id} className={`border-b border-slate-200 hover:bg-slate-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{contact.name}</div>
                        <div className="text-sm text-slate-600">{contact.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900 max-w-md truncate">{contact.subject}</div>
                    <div className="text-sm text-slate-600 max-w-md truncate">{contact.message}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600">{contact.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onNavigate('contact-view', contact)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
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