import React, { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Calendar, CheckCircle, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ContactView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://api.thaneforestdivision.com/api/contacts/${id}/`);
          if (!response.ok) {
            throw new Error('Failed to fetch contact details.');
          }
          const data = await response.json();
          setContact(data);
        } catch (error: any) {
          setError(error.message || 'An unexpected error occurred.');
        } finally {
          setLoading(false);
        }
      };
      fetchContact();
    }
  }, [id]);

  if (loading) {
    return <div className="p-6 text-slate-600 dark:text-slate-300">Loading contact details...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate('/contacts')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to Contacts
        </button>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">No contact found</p>
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
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Message</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">View and manage contact details</p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <div className="mb-2"><span className="font-semibold text-slate-900 dark:text-white">Name:</span> <span className="text-slate-700 dark:text-slate-300">{contact.name}</span></div>
        <div className="mb-2"><span className="font-semibold text-slate-900 dark:text-white">Email:</span> <span className="text-slate-700 dark:text-slate-300">{contact.email}</span></div>
        <div className="mb-2"><span className="font-semibold text-slate-900 dark:text-white">Phone:</span> <span className="text-slate-700 dark:text-slate-300">{contact.phone}</span></div>
        <div className="mb-2"><span className="font-semibold text-slate-900 dark:text-white">Subject:</span> <span className="text-slate-700 dark:text-slate-300">{contact.subject}</span></div>
        <div className="mb-4"><span className="font-semibold text-slate-900 dark:text-white">Message:</span> <p className="text-slate-700 dark:text-slate-300 mt-1">{contact.message}</p></div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => navigate('/contacts')}
          className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}