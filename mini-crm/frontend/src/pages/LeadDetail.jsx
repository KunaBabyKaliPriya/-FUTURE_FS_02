import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge.jsx';

export default function LeadDetail() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('New');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadLead = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/leads/${id}`);
      setLead(response.data);
      setNotes(response.data.notes || '');
      setStatus(response.data.status || 'New');
    } catch (error) {
      console.error('Error loading lead:', error);
      toast.error(error?.response?.data?.message || 'Failed to load lead details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadLead();
    }
  }, [id]); // Added id as dependency

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await api.put(`/leads/${id}`, { 
        notes, 
        status 
      });
      setLead(data);
      setNotes(data.notes || '');
      setStatus(data.status);
      toast.success('Lead updated successfully');
    } catch (error) {
      console.error('Error saving lead:', error);
      toast.error(error?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl">
        <Link to="/leads" className="text-sm text-indigo-600 hover:underline">← Back to leads</Link>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-3">
          <div className="text-slate-500 text-center py-8">Loading lead details...</div>
        </div>
      </div>
    );
  }

  // Error state - if lead is null after loading
  if (!lead) {
    return (
      <div className="max-w-3xl">
        <Link to="/leads" className="text-sm text-indigo-600 hover:underline">← Back to leads</Link>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-3">
          <div className="text-red-500 text-center py-8">Lead not found or an error occurred</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link to="/leads" className="text-sm text-indigo-600 hover:underline">← Back to leads</Link>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-3">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{lead.name || 'No name'}</h1>
            <p className="text-slate-500">
              {lead.email || 'No email'} · {lead.phone || 'No phone'}
            </p>
            <p className="text-slate-500">
              {lead.company || 'No company'} · {lead.source || 'No source'}
            </p>
          </div>
          <StatusBadge status={lead.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <div className="text-slate-500">Created</div>
            <div>{lead.createdAt ? new Date(lead.createdAt).toLocaleString() : 'N/A'}</div>
          </div>
          <div>
            <div className="text-slate-500">Updated</div>
            <div>{lead.updatedAt ? new Date(lead.updatedAt).toLocaleString() : 'N/A'}</div>
          </div>
        </div>

        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>

        <label className="block text-sm font-medium mb-1">Follow-up notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add follow-up notes…"
        />

        <div className="flex gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-colors"
          >
            {saving ? 'Saving...' : 'Save changes'}
          </button>
          <Link
            to="/leads"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-center"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}