import { useState } from 'react';
import './Agents.css';

export function Agents({ agents, onAddAgent, onDeleteAgent, onUpdateAgent }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [formError, setFormError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!form.name.trim()) { setFormError('Agent name is required.'); return; }
    if (editingId) {
      onUpdateAgent(editingId, { ...form });
      setEditingId(null);
    } else {
      onAddAgent({ ...form });
    }
    setForm({ name: '', phone: '', email: '', notes: '' });
    setShowForm(false);
  }

  function startEdit(agent) {
    setEditingId(agent.id);
    setForm({ name: agent.name, phone: agent.phone, email: agent.email, notes: agent.notes });
    setShowForm(true);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: '', phone: '', email: '', notes: '' });
    setShowForm(false);
    setFormError('');
  }

  function handleDelete(id) {
    if (window.confirm('Remove this agent?')) {
      onDeleteAgent(id);
    }
  }

  return (
    <div className="agents-page page-enter">
      <div className="agents-header">
        <div>
          <h1 className="agents-title">Agent Connection</h1>
          <p className="agents-subtitle">
            {agents.length > 0
              ? `${agents.length} agent${agents.length === 1 ? '' : 's'} saved`
              : 'Store agent contacts and notes'}
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormError(''); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add Agent
        </button>
      </div>

      {/* Find an agent section */}
      <div className="agents-find-section">
        <div className="agents-find-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div className="agents-find-body">
          <h3>Find an agent</h3>
          <p>Search for a real estate agent in your area.</p>
          <div className="agents-find-links">
            <a
              href="https://www.zillow.com/agents/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Zillow Agent Finder
            </a>
            <a
              href="https://www.yellowpages.com/real-estate-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Yellow Pages
            </a>
          </div>
        </div>
      </div>

      {showForm && (
        <form className="agents-form" onSubmit={handleSubmit}>
          <div className="agents-form-header">
            <h3>{editingId ? 'Edit Agent' : 'Add Agent'}</h3>
          </div>
          <div className="agents-form-grid">
            <div className="form-field">
              <label>Agent Name *</label>
              <input
                type="text"
                placeholder="e.g. Sarah Johnson"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input
                type="tel"
                placeholder="e.g. (555) 123-4567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="e.g. sarah@realty.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-field form-field--full">
              <label>Notes</label>
              <textarea
                rows={3}
                placeholder="Met at open house March 15. specializes in first-time buyers..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>

          {formError && (
            <div className="form-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {formError}
            </div>
          )}

          <div className="agents-form-actions">
            <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Agent' : 'Save Agent'}
            </button>
          </div>
        </form>
      )}

      {agents.length === 0 && !showForm ? (
        <div className="agents-empty">
          <div className="agents-empty-graphic">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>No agents yet</h3>
          <p>Add your real estate agent's contact info so you can track interactions and follow-ups.</p>
        </div>
      ) : (
        <div className="agents-list stagger-in">
          {agents.map((agent) => (
            <div key={agent.id} className="agent-card">
              <div className="agent-card-header">
                <div className="agent-avatar">
                  {agent.name.charAt(0).toUpperCase()}
                </div>
                <div className="agent-card-info">
                  <h3 className="agent-name">{agent.name}</h3>
                  {agent.phone && <a href={`tel:${agent.phone}`} className="agent-contact">{agent.phone}</a>}
                  {agent.email && <a href={`mailto:${agent.email}`} className="agent-contact">{agent.email}</a>}
                </div>
                <div className="agent-card-actions">
                  <button
                    className="btn btn-ghost btn-sm btn-icon"
                    onClick={() => startEdit(agent)}
                    aria-label="Edit agent"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    className="btn btn-ghost btn-sm btn-icon"
                    onClick={() => handleDelete(agent.id)}
                    aria-label="Delete agent"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
              {agent.notes && (
                <p className="agent-notes">{agent.notes}</p>
              )}
              <span className="agent-added">
                Added {new Date(agent.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
