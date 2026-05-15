import { useState, useEffect } from 'react';

export default function LeadModal({ open, initial, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: '',
    status: 'New'
  });

  useEffect(() => {
    if (initial) {
      setForm(initial);
    } else {
      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        source: '',
        status: 'New'
      });
    }
  }, [initial, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    header: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    formGroup: {
      marginBottom: '12px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px'
    },
    label: {
      display: 'block',
      marginBottom: '4px',
      fontWeight: '500',
      fontSize: '14px'
    },
    buttons: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'flex-end',
      marginTop: '20px'
    },
    cancelBtn: {
      padding: '8px 16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    saveBtn: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#4F46E5',
      color: 'white',
      cursor: 'pointer'
    }
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={modalStyles.header}>{initial ? 'Edit Lead' : 'New Lead'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Name *</label>
            <input
              type="text"
              required
              style={modalStyles.input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Email *</label>
            <input
              type="email"
              required
              style={modalStyles.input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter email address"
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Phone</label>
            <input
              type="tel"
              style={modalStyles.input}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Company</label>
            <input
              type="text"
              style={modalStyles.input}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Enter company name"
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Source</label>
            <input
              type="text"
              style={modalStyles.input}
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              placeholder="How did you find us?"
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Status</label>
            <select
              style={modalStyles.select}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
            </select>
          </div>

          <div style={modalStyles.buttons}>
            <button type="button" style={modalStyles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={modalStyles.saveBtn}>
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}