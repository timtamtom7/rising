import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseCurrencyInput, CURRENCY_SYMBOLS } from '../utils/formatCurrency';
import './CreateGoal.css';

const UNSPLASH_TOPICS = [
  { id: 'travel', label: 'Travel & Adventure' },
  { id: 'nature', label: 'Nature & Outdoors' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'food', label: 'Food & Drink' },
  { id: 'technology', label: 'Technology' },
  { id: 'animals', label: 'Animals' },
];

const PLACEHOLDER_PHOTOS = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
];

export function CreateGoal({ onCreate, currency }) {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    photoUrl: '',
    startingAmount: '',
  });
  const [photoMode, setPhotoMode] = useState('pick'); // 'pick' | 'upload'
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Give your goal a name.';
    if (!form.targetAmount || parseCurrencyInput(form.targetAmount) <= 0) errs.targetAmount = 'Enter a target amount.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validate()) setStep(2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.photoUrl && !form.name) return;

    onCreate({
      name: form.name.trim(),
      targetAmount: parseCurrencyInput(form.targetAmount),
      deadline: form.deadline || null,
      photoUrl: form.photoUrl,
      startingAmount: parseCurrencyInput(form.startingAmount),
    });

    navigate('/app');
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update('photoUrl', ev.target.result);
    reader.readAsDataURL(file);
  }

  function handlePhotoSelect(url) {
    update('photoUrl', url);
    setStep(3);
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
    else navigate('/app');
  }

  const progress = Math.min(100, (parseCurrencyInput(form.startingAmount) / Math.max(1, parseCurrencyInput(form.targetAmount))) * 100);

  return (
    <div className="create-goal page-enter">
      <div className="create-goal-header">
        <button onClick={handleBack} className="btn btn-ghost btn-sm back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1>Create Goal</h1>
        <div className="step-indicator">
          <span className={step >= 1 ? 'active' : ''}>1</span>
          <span className={step >= 2 ? 'active' : ''}>2</span>
          <span className={step >= 3 ? 'active' : ''}>3</span>
        </div>
      </div>

      <div className="create-progress">
        <div className="create-progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
      </div>

      <form onSubmit={handleSubmit} className="create-goal-form">
        {step === 1 && (
          <div className="form-step">
            <div className="form-group">
              <label htmlFor="name">What are you saving for?</label>
              <input
                id="name"
                type="text"
                placeholder="Trip to Japan, New MacBook Pro, Emergency Fund..."
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                autoFocus
                maxLength={80}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="targetAmount">Target amount</label>
              <div className="input-prefix-wrap">
                <span className="input-prefix">{CURRENCY_SYMBOLS[currency] || '$'}</span>
                <input
                  id="targetAmount"
                  type="text"
                  inputMode="decimal"
                  placeholder="5,000"
                  value={form.targetAmount}
                  onChange={(e) => update('targetAmount', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              {errors.targetAmount && <span className="field-error">{errors.targetAmount}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="deadline">
                Target date <span className="label-hint">(optional)</span>
              </label>
              <input
                id="deadline"
                type="date"
                value={form.deadline}
                onChange={(e) => update('deadline', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="startingAmount">
                Already saved <span className="label-hint">(optional)</span>
              </label>
              <div className="input-prefix-wrap">
                <span className="input-prefix">{CURRENCY_SYMBOLS[currency] || '$'}</span>
                <input
                  id="startingAmount"
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={form.startingAmount}
                  onChange={(e) => update('startingAmount', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
            </div>

            <button type="button" className="btn btn-primary btn-full btn-lg" onClick={handleNext}>
              Continue
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <div className="form-group">
              <label>Choose a photo for your goal</label>
              <p className="field-hint">This photo will gradually reveal as you get closer to your goal.</p>

              <div className="photo-mode-tabs">
                <button
                  type="button"
                  className={`tab-btn ${photoMode === 'pick' ? 'tab-btn--active' : ''}`}
                  onClick={() => setPhotoMode('pick')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                  </svg>
                  Browse photos
                </button>
                <button
                  type="button"
                  className={`tab-btn ${photoMode === 'upload' ? 'tab-btn--active' : ''}`}
                  onClick={() => setPhotoMode('upload')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload photo
                </button>
              </div>

              {photoMode === 'pick' && (
                <div className="photo-pick">
                  <input
                    type="text"
                    placeholder="Search for a photo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="photo-search"
                  />
                  <div className="photo-grid">
                    {PLACEHOLDER_PHOTOS.map((url) => (
                      <button
                        key={url}
                        type="button"
                        className={`photo-option ${form.photoUrl === url ? 'photo-option--selected' : ''}`}
                        onClick={() => handlePhotoSelect(url)}
                      >
                        <img src={url} alt="Goal" />
                      </button>
                    ))}
                  </div>
                  <p className="field-hint" style={{ marginTop: 'var(--space-3)' }}>
                    Tip: Unsplash API key needed for search. Currently showing curated photos.
                  </p>
                </div>
              )}

              {photoMode === 'upload' && (
                <div className="photo-upload-area">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  {form.photoUrl && form.photoUrl.startsWith('data:') ? (
                    <div className="photo-preview">
                      <img src={form.photoUrl} alt="Preview" />
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => fileRef.current.click()}
                      >
                        Change photo
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() => fileRef.current.click()}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                      <span>Click to upload a photo</span>
                      <span className="upload-hint">JPG, PNG, WebP up to 5MB</span>
                    </button>
                  )}
                </div>
              )}

              <div className="skip-photo">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep(3)}>
                  Skip for now →
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            {form.photoUrl && (
              <div className="goal-preview-photo">
                <img src={form.photoUrl} alt="Your goal" />
                <div className="goal-preview-overlay" />
              </div>
            )}

            <div className="goal-preview-card">
              <h3 className="goal-preview-name">{form.name || 'Your Goal'}</h3>

              {form.targetAmount && (
                <div className="goal-preview-amounts">
                  <span className="goal-preview-current amount">
                    {CURRENCY_SYMBOLS[currency] || '$'}{parseCurrencyInput(form.startingAmount).toLocaleString()}
                  </span>
                  <span className="goal-preview-sep">/</span>
                  <span className="goal-preview-target amount">
                    {CURRENCY_SYMBOLS[currency] || '$'}{parseCurrencyInput(form.targetAmount).toLocaleString()}
                  </span>
                </div>
              )}

              <div className="goal-preview-progress">
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {form.deadline && (
                <p className="goal-preview-deadline">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Target: {new Date(form.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
                Change photo
              </button>
              <button type="submit" className="btn btn-primary btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                Create goal & start saving
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
