import React from 'react';
import { ArrowLeft, Mail, Calendar, CheckCircle, X } from 'lucide-react';
import { Screen } from '../../App';

interface ContactViewProps {
  onNavigate: (screen: Screen) => void;
  contact: any;
}

export default function ContactView({ onNavigate, contact }: ContactViewProps) {
  if (!contact) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-slate-600">No contact selected</p>
          <button
            onClick={() => onNavigate('contacts')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Back to Contacts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('contacts')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contact Message</h1>
            <p className="text-slate-600 mt-1">View and manage contact details</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {contact.status === 'unread' && (
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <CheckCircle className="w-4 h-4" />
              <span>Mark as Read</span>
            </button>
          )}
          <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            <X className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Header Info */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{contact.senderName}</h2>
                <p className="text-slate-600">{contact.senderEmail}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{contact.receivedDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {contact.status === 'unread' ? (
                <span className="flex items-center space-x-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Unread</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Read</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="border-b border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Subject</h3>
          <p className="text-slate-700">{contact.subject}</p>
        </div>

        {/* Message Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Message</h3>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Reply</span>
              </button>
              <button className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                <span>Forward</span>
              </button>
            </div>
            <button
              onClick={() => onNavigate('contacts')}
              className="text-slate-600 hover:text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}