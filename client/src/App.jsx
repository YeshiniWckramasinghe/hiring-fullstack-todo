import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { ErrorBanner } from './components/ErrorBanner';
import { LoadingSkeleton } from './components/LoadingSkeleton';

const FILTERS = ['all', 'pending', 'done'];

export default function App() {
  const { todos, loading, error, clearError, createTodo, updateTodo, toggleDone, deleteTodo, pendingCount, doneCount } = useTodos();
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter((t) => {
    if (filter === 'pending') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const progress = todos.length > 0 ? Math.round((doneCount / todos.length) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>

      {/* Header */}
      <header style={{
        background: 'white', borderBottom: '1px solid #e8eaf0',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 18, color: '#1a1d2e', letterSpacing: '-0.3px' }}>My Tasks</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{pendingCount} pending</span>
            </div>
            <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{doneCount} done</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '28px 20px 80px' }}>

        <ErrorBanner message={error} onDismiss={clearError} />

        {/* Progress card */}
        {todos.length > 0 && (
          <div style={{
            background: 'white', borderRadius: 16, padding: '20px 24px',
            marginBottom: 16, border: '1px solid #e8eaf0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#64748b' }}>Overall progress</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#667eea' }}>{progress}%</span>
            </div>
            <div style={{ height: 6, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99,
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                width: `${progress}%`, transition: 'width 0.5s cubic-bezier(.4,0,.2,1)'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>{doneCount} of {todos.length} completed</span>
              {progress === 100 && <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>All done! 🎉</span>}
            </div>
          </div>
        )}

        {/* Add form */}
        <AddTodoForm onAdd={createTodo} />

        {/* Filters */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'white', padding: 4, borderRadius: 12, border: '1px solid #e8eaf0', width: 'fit-content', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '6px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 500, transition: 'all 0.15s', textTransform: 'capitalize',
              background: filter === f ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
              color: filter === f ? 'white' : '#64748b',
              boxShadow: filter === f ? '0 2px 8px rgba(102,126,234,0.35)' : 'none',
            }}>
              {f}
              {f === 'pending' && pendingCount > 0 && (
                <span style={{
                  marginLeft: 6, borderRadius: 99, padding: '1px 7px', fontSize: 11, fontWeight: 600,
                  background: filter === f ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: filter === f ? 'white' : '#64748b',
                }}>{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Todo list */}
        {loading ? (
          <LoadingSkeleton />
        ) : filteredTodos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>
              {filter === 'done' ? '🎉' : filter === 'pending' ? '☀️' : '📋'}
            </div>
            <p style={{ fontSize: 16, fontWeight: 500, color: '#64748b', marginBottom: 4 }}>
              {filter === 'done' ? 'No completed tasks yet' : filter === 'pending' ? 'All caught up!' : 'No tasks yet'}
            </p>
            <p style={{ fontSize: 14, color: '#94a3b8' }}>
              {filter === 'all' ? 'Add your first task above.' : 'Switch filter to see more.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} onToggle={toggleDone} onUpdate={updateTodo} onDelete={deleteTodo} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}