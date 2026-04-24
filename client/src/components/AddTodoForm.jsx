import { useState } from 'react';

export function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const validate = () => {
    if (!title.trim()) { setError('Title is required.'); return false; }
    if (title.trim().length > 200) { setError('Title must be under 200 characters.'); return false; }
    if (description.length > 1000) { setError('Description must be under 1000 characters.'); return false; }
    setError(''); return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result = await onAdd({ title: title.trim(), description: description.trim() });
    setSubmitting(false);
    if (result?.success !== false) { setTitle(''); setDescription(''); setExpanded(false); }
  };

  const handleCancel = () => { setExpanded(false); setError(''); setTitle(''); setDescription(''); };

  return (
    <div style={{
      background: 'white', borderRadius: 16, padding: '18px 20px',
      marginBottom: 16, border: '1px solid #e8eaf0',
      boxShadow: expanded ? '0 4px 20px rgba(102,126,234,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.2s',
    }}>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          {/* Plus icon */}
          <div style={{
            width: 22, height: 22, borderRadius: 6, border: '2px dashed #c7d2fe',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 2, color: '#818cf8'
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="1" x2="6" y2="11"/><line x1="1" y1="6" x2="11" y2="6"/>
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(''); }}
              onFocus={() => setExpanded(true)}
              placeholder="Add a new task…"
              maxLength={200}
              disabled={submitting}
              aria-label="Todo title"
              style={{
                width: '100%', fontSize: 15, fontWeight: 500, color: '#1a1d2e',
                border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'Inter, sans-serif',
              }}
            />

            {expanded && (
              <div style={{ marginTop: 12 }}>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description (optional)"
                  maxLength={1000}
                  rows={2}
                  disabled={submitting}
                  aria-label="Todo description"
                  style={{
                    width: '100%', fontSize: 13, color: '#475569',
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    borderRadius: 8, padding: '8px 12px', outline: 'none',
                    resize: 'none', fontFamily: 'Inter, sans-serif',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#a5b4fc'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />

                {error && (
                  <p role="alert" style={{ fontSize: 13, color: '#ef4444', fontWeight: 500, marginTop: 6 }}>{error}</p>
                )}

                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 10 }}>
                  <button type="button" onClick={handleCancel} disabled={submitting} style={{
                    padding: '7px 16px', fontSize: 13, fontWeight: 500, color: '#64748b',
                    background: 'transparent', border: '1px solid #e2e8f0', borderRadius: 8,
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                  }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting || !title.trim()} style={{
                    padding: '7px 20px', fontSize: 13, fontWeight: 600, color: 'white',
                    background: submitting || !title.trim() ? '#c7d2fe' : 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none', borderRadius: 8, cursor: submitting || !title.trim() ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                    boxShadow: submitting || !title.trim() ? 'none' : '0 2px 8px rgba(102,126,234,0.4)',
                  }}>
                    {submitting ? 'Adding…' : 'Add Task'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}