import React, { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Calendar, CheckCircle, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ContactView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://api.thaneforestdivision.com/api/contacts/${id}/`)
        .then(res => res.json())
        .then(data => setContact(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="p-6 text-slate-600">Loading contact details...</div>;
  }

  if (!contact) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-slate-600">No contact found</p>
          <button
            onClick={() => navigate('/contacts')}
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
            onClick={() => navigate('/contacts')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contact Message</h1>
            <p className="text-slate-600 mt-1">View and manage contact details</p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="mb-2"><span className="font-semibold">Name:</span> {contact.name}</div>
        <div className="mb-2"><span className="font-semibold">Email:</span> {contact.email}</div>
        <div className="mb-2"><span className="font-semibold">Phone:</span> {contact.phone}</div>
        <div className="mb-2"><span className="font-semibold">Subject:</span> {contact.subject}</div>
        <div className="mb-4"><span className="font-semibold">Message:</span> {contact.message}</div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => navigate('/contacts')}
          className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}