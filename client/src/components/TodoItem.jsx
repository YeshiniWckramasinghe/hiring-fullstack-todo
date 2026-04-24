import { useState } from 'react';

function PencilIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editError, setEditError] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleEdit = () => { setEditTitle(todo.title); setEditDescription(todo.description || ''); setEditError(''); setEditing(true); };

  const handleSave = async () => {
    if (!editTitle.trim()) { setEditError('Title cannot be empty.'); return; }
    if (editTitle.trim().length > 200) { setEditError('Title must be under 200 characters.'); return; }
    setSaving(true);
    const result = await onUpdate(todo._id, { title: editTitle.trim(), description: editDescription.trim() });
    setSaving(false);
    if (result?.success !== false) setEditing(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); setTimeout(() => setConfirmDelete(false), 3000); return; }
    await onDelete(todo._id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
    if (e.key === 'Escape') setEditing(false);
  };

  const cardStyle = {
    background: todo.done ? '#fafafa' : 'white',
    border: `1px solid ${hovered && !todo.done ? '#c7d2fe' : '#e8eaf0'}`,
    borderRadius: 14, padding: '14px 16px',
    transition: 'all 0.2s', opacity: todo._id?.startsWith('temp-') ? 0.7 : 1,
    boxShadow: hovered && !todo.done ? '0 4px 16px rgba(102,126,234,0.1)' : '0 1px 3px rgba(0,0,0,0.04)',
    transform: hovered && !todo.done ? 'translateY(-1px)' : 'none',
  };

  return (
    <div style={cardStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            autoFocus value={editTitle} maxLength={200} disabled={saving}
            onChange={(e) => { setEditTitle(e.target.value); setEditError(''); }}
            onKeyDown={handleKeyDown}
            style={{
              fontSize: 15, fontWeight: 500, color: '#1a1d2e', padding: '7px 12px',
              background: '#f8fafc', border: '1px solid #a5b4fc', borderRadius: 8,
              outline: 'none', fontFamily: 'Inter, sans-serif', width: '100%',
            }}
          />
          <textarea
            value={editDescription} maxLength={1000} rows={2} disabled={saving}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Description (optional)"
            style={{
              fontSize: 13, color: '#475569', padding: '7px 12px',
              background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8,
              outline: 'none', resize: 'none', fontFamily: 'Inter, sans-serif', width: '100%',
            }}
          />
          {editError && <p role="alert" style={{ fontSize: 13, color: '#ef4444' }}>{editError}</p>}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            <button onClick={() => setEditing(false)} disabled={saving} style={{
              padding: '5px 14px', fontSize: 12, fontWeight: 500, color: '#64748b',
              background: 'transparent', border: '1px solid #e2e8f0', borderRadius: 7,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>Cancel</button>
            <button onClick={handleSave} disabled={saving || !editTitle.trim()} style={{
              padding: '5px 16px', fontSize: 12, fontWeight: 600, color: 'white',
              background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none',
              borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo._id)}
            aria-label={todo.done ? 'Mark as undone' : 'Mark as done'}
            style={{
              width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 2,
              border: `2px solid ${todo.done ? '#667eea' : '#cbd5e1'}`,
              background: todo.done ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {todo.done && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className={`line-through-animate ${todo.done ? 'done' : ''}`} style={{
              fontSize: 15, fontWeight: 500, lineHeight: 1.4,
              color: todo.done ? '#94a3b8' : '#1a1d2e',
            }}>
              {todo.title}
            </p>
            {todo.description && (
              <p style={{ fontSize: 13, color: todo.done ? '#cbd5e1' : '#64748b', marginTop: 3, lineHeight: 1.5 }}>
                {todo.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex', gap: 4, flexShrink: 0,
            opacity: hovered ? 1 : 0, transition: 'opacity 0.15s',
          }}>
            <button onClick={handleEdit} title="Edit" aria-label="Edit todo" style={{
              width: 30, height: 30, borderRadius: 8, border: '1px solid #e2e8f0',
              background: 'white', color: '#94a3b8', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#667eea'; e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.background = '#eef2ff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; }}
            >
              <PencilIcon />
            </button>
            <button onClick={handleDelete} title={confirmDelete ? 'Click again to confirm' : 'Delete'} aria-label="Delete todo" style={{
              width: 30, height: 30, borderRadius: 8,
              border: `1px solid ${confirmDelete ? '#fca5a5' : '#e2e8f0'}`,
              background: confirmDelete ? '#fef2f2' : 'white',
              color: confirmDelete ? '#ef4444' : '#94a3b8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
              onMouseEnter={(e) => { if (!confirmDelete) { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.background = '#fef2f2'; } }}
              onMouseLeave={(e) => { if (!confirmDelete) { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; } }}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}