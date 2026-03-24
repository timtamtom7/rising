import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { parseCurrencyInput } from '../utils/formatCurrency';
import './EditGoal.css';

export function EditGoal({ goals, onUpdateGoal, currency }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const goal = goals.find((g) => g.id === id);

  const [form, setForm] = useState({
    name: goal?.name || '',
    targetAmount: goal ? String(goal.targetAmount) : '',
    deadline: goal?.deadline?.split('T')[0] || '',
    photoUrl: goal?.photoUrl || '',
  });
  const [errors, setErrors] = useState({});

  if (!goal) {
    return (
      <div className="edit-not-found page-enter">
        <h2>Goal not found</h2>
        <Link to="/app" className="btn btn-primary">Back to goals</Link>
      </div>
    );
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!parseCurrencyInput(form.targetAmount) || parseCurrencyInput(form.targetAmount) <= 0) {
      errs.targetAmount = 'Enter a valid target amount.';
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    onUpdateGoal(goal.id, {
      name: form.name.trim(),
      targetAmount: parseCurrencyInput(form.targetAmount),
      deadline: form.deadline || null,
      photoUrl: form.photoUrl,
    });

    navigate(`/app/goals/${goal.id}`);
  }

  return (
    <div className="edit-goal page-enter">
      <div className="edit-header">
        <button onClick={() => navigate(`/app/goals/${goal.id}`)} className="btn btn-ghost btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1>Edit goal</h1>
        <div style={{ width: 32 }} />
      </div>

      {goal.photoUrl && (
        <div className="edit-photo-preview">
          <img src={goal.photoUrl} alt={goal.name} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="name">Goal name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Trip to Japan..."
            maxLength={80}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="targetAmount">Target amount</label>
          <div className="input-prefix-wrap">
            <span className="input-prefix">{currency}</span>
            <input
              id="targetAmount"
              type="text"
              inputMode="decimal"
              value={form.targetAmount}
              onChange={(e) => update('targetAmount', e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </div>
          {errors.targetAmount && <span className="field-error">{errors.targetAmount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Target date <span className="label-hint">(optional)</span></label>
          <input
            id="deadline"
            type="date"
            value={form.deadline}
            onChange={(e) => update('deadline', e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate(`/app/goals/${goal.id}`)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
