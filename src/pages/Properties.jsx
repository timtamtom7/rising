import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { formatCurrency } from '../utils/formatCurrency';
import './Properties.css';

export function Properties({ properties, onAddProperty, onDeleteProperty, onUpdateProperty, currency = 'USD' }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    price: '',
    link: '',
    photos: '',
    notes: '',
    estimatedValue: '',
  });
  const [formError, setFormError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    const price = parseFloat(form.price);
    if (!form.name.trim()) { setFormError('Property name is required.'); return; }
    if (!price || price <= 0) { setFormError('Please enter a valid price.'); return; }
    const photos = form.photos
      ? form.photos.split('\n').map((p) => p.trim()).filter(Boolean)
      : [];
    const estimatedValue = form.estimatedValue ? parseFloat(form.estimatedValue) : null;
    try {
      onAddProperty({
        name: form.name.trim(),
        address: form.address.trim(),
        price,
        link: form.link.trim(),
        photos,
        notes: form.notes.trim(),
        estimatedValue,
      });
      setForm({ name: '', address: '', price: '', link: '', photos: '', notes: '', estimatedValue: '' });
      setShowForm(false);
    } catch (err) {
      setFormError('Failed to save property. Please try again.');
    }
  }

  function handleDelete(id) {
    if (window.confirm('Remove this property?')) {
      onDeleteProperty(id);
    }
  }

  function handleSimulatePriceDrop(id) {
    const prop = properties.find((p) => p.id === id);
    if (prop) {
      const dropped = prop.price * 0.97;
      onUpdateProperty(id, {
        priceDroppedAt: new Date().toISOString(),
        price: dropped,
      });
    }
  }

  return (
    <div className="properties-page page-enter">
      <div className="properties-header">
        <div>
          <h1 className="properties-title">Properties</h1>
          <p className="properties-subtitle">
            {properties.length > 0
              ? `${properties.length} ${properties.length === 1 ? 'listing' : 'listings'} saved`
              : 'Save properties you\'re interested in'}
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add Property
        </button>
      </div>

      {showForm && (
        <form className="properties-form" onSubmit={handleSubmit}>
          <div className="properties-form-grid">
            <div className="form-field">
              <label>Property Name *</label>
              <input
                type="text"
                placeholder="e.g. 123 Oak Street"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label>Address</label>
              <input
                type="text"
                placeholder="Full address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Listing Price *</label>
              <div className="input-prefix-wrap">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 650000"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-field">
              <label>Est. Property Value (mock)</label>
              <div className="input-prefix-wrap">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 680000"
                  value={form.estimatedValue}
                  onChange={(e) => setForm({ ...form, estimatedValue: e.target.value })}
                />
              </div>
            </div>
            <div className="form-field form-field--full">
              <label>Listing Link</label>
              <input
                type="url"
                placeholder="https://zillow.com/..."
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </div>
            <div className="form-field form-field--full">
              <label>Photo URLs (one per line)</label>
              <textarea
                rows={2}
                placeholder="https://...&#10;https://..."
                value={form.photos}
                onChange={(e) => setForm({ ...form, photos: e.target.value })}
              />
            </div>
            <div className="form-field form-field--full">
              <label>Notes</label>
              <textarea
                rows={3}
                placeholder="Visited March 10. Great kitchen but small backyard..."
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

          <div className="properties-form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Property
            </button>
          </div>
        </form>
      )}

      {properties.length === 0 ? (
        <div className="properties-empty">
          <div className="properties-empty-graphic">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <h3>No properties yet</h3>
          <p>Add properties you\'re watching — track prices, links, and your notes all in one place.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Add your first property
          </button>
        </div>
      ) : (
        <>
          <div className="properties-grid stagger-in">
            {properties.map((prop) => (
              <div key={prop.id} className="property-card-wrap">
                <PropertyCard
                  property={prop}
                  currency={currency}
                  onDelete={handleDelete}
                />
                <button
                  className="btn btn-sm btn-ghost property-price-drop-btn"
                  onClick={() => handleSimulatePriceDrop(prop.id)}
                  title="Simulate price drop"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
                    <polyline points="17 18 23 18 23 12"/>
                  </svg>
                  Simulate price drop
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
