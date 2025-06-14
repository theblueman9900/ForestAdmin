import React, { useState } from 'react';
import { Search, Eye, Trash2, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Screen } from '../../App';

interface ContactsManagementProps {
  onNavigate: (screen: Screen, item?: any) => void;
}

export default function ContactsManagement({ onNavigate }: ContactsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for contacts
  const contacts = [
    {
      id: 1,
      senderName: 'John Smith',
      senderEmail: 'john.smith@email.com',
      subject: 'Inquiry about Web Development Services',
      message: 'Hi, I am interested in your web development services. Could you please provide more information about your pricing and timeline?',
      receivedDate: '2024-01-15 10:30 AM',
      status: 'unread'
    },
    {
      id: 2,
      senderName: 'Sarah Johnson',
      senderEmail: 'sarah.j@company.com',
      subject: 'Partnership Opportunity',
      message: 'Hello, I represent a marketing agency and would like to discuss potential partnership opportunities with your company.',
      receivedDate: '2024-01-14 03:45 PM',
      status: 'read'
    },
    {
      id: 3,
      senderName: 'Mike Davis',
      senderEmail: 'mike.davis@startup.io',
      subject: 'Mobile App Development Quote',
      message: 'We are a startup looking for mobile app development services. Can you provide a quote for iOS and Android app development?',
      receivedDate: '2024-01-14 09:15 AM',
      status: 'unread'
    },
    {
      id: 4,
      senderName: 'Emily Wilson',
      senderEmail: 'emily.wilson@nonprofit.org',
      subject: 'Non-profit Website Redesign',
      message: 'Our non-profit organization needs a website redesign. Do you offer any special rates for non-profit organizations?',
      receivedDate: '2024-01-13 02:20 PM',
      status: 'read'
    },
    {
      id: 5,
      senderName: 'David Brown',
      senderEmail: 'david.brown@enterprise.com',
      subject: 'Enterprise Software Development',
      message: 'We need a custom enterprise software solution. Could we schedule a meeting to discuss our requirements?',
      receivedDate: '2024-01-12 11:00 AM',
      status: 'unread'
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.senderEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
            {contacts.filter(c => c.status === 'unread').length} unread messages
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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
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
                <th className="text-left py-3 px-6 font-medium text-slate-900">Received Date</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={contact.id} className={`border-b border-slate-200 hover:bg-slate-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'} ${contact.status === 'unread' ? 'bg-blue-50/30' : ''}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{contact.senderName}</div>
                        <div className="text-sm text-slate-600">{contact.senderEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900 max-w-md truncate">{contact.subject}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{contact.receivedDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {contact.status === 'unread' ? (
                        <>
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                          <span className="text-orange-600 font-medium">Unread</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 font-medium">Read</span>
                        </>
                      )}
                    </div>
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