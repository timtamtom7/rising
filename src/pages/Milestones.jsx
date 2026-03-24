import { useState } from 'react';
import { MilestoneTracker } from '../components/MilestoneTracker';
import './Milestones.css';

export function Milestones({ milestones, onToggleMilestone, onUpdateMilestone, goals = [], currency = 'USD' }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: '', lender: '', date: '' });

  function handleToggle(id, completed) {
    onToggleMilestone(id, completed ? new Date().toISOString() : null);
  }

  function handleAddOrUpdate(data) {
    onUpdateMilestone(data);
    setEditingId(null);
    setEditForm({ amount: '', lender: '', date: '' });
  }

  function startEdit(id, current) {
    setEditingId(id);
    setEditForm({
      amount: current?.amount ? String(current.amount) : '',
      lender: current?.lender || '',
      date: current?.date || '',
    });
  }

  const preApprovedMilestone = milestones.find((m) => m.type === 'pre_approved');
  const downPaymentMilestone = milestones.find((m) => m.type === 'down_payment_saved');
  const activeGoal = goals.find((g) => !g.archived);

  return (
    <div className="milestones-page page-enter">
      <div className="milestones-header">
        <h1 className="milestones-title">Milestones</h1>
        <p className="milestones-subtitle">Track your path from pre-approval to closing.</p>
      </div>

      <div className="milestones-grid">
        <div className="milestones-tracker-section">
          <MilestoneTracker
            milestones={milestones}
            currentAmount={activeGoal?.currentAmount || 0}
            targetAmount={activeGoal?.targetAmount || 0}
            onToggle={handleToggle}
            onUpdate={handleAddOrUpdate}
          />
        </div>

        <div className="milestones-sidebar">
          {/* Pre-approval details */}
          <div className="milestone-detail-card">
            <div className="milestone-detail-card-header">
              <h3>Pre-Approval Details</h3>
              {preApprovedMilestone && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => startEdit(preApprovedMilestone.id, preApprovedMilestone)}
                >
                  Edit
                </button>
              )}
            </div>
            {preApprovedMilestone ? (
              <div className="milestone-detail-content">
                <div className="milestone-detail-row">
                  <span className="milestone-detail-label">Amount</span>
                  <span className="milestone-detail-value amount">
                    {preApprovedMilestone.amount
                      ? `$${Number(preApprovedMilestone.amount).toLocaleString()}`
                      : '—'}
                  </span>
                </div>
                <div className="milestone-detail-row">
                  <span className="milestone-detail-label">Lender</span>
                  <span className="milestone-detail-value">
                    {preApprovedMilestone.lender || '—'}
                  </span>
                </div>
                <div className="milestone-detail-row">
                  <span className="milestone-detail-label">Date</span>
                  <span className="milestone-detail-value">
                    {preApprovedMilestone.date || '—'}
                  </span>
                </div>
              </div>
            ) : (
              <AddMilestoneDetailForm
                milestoneType="pre_approved"
                onSubmit={handleAddOrUpdate}
              />
            )}
          </div>

          {/* Down payment saved details */}
          {downPaymentMilestone && (
            <div className="milestone-detail-card">
              <div className="milestone-detail-card-header">
                <h3>Down Payment</h3>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => startEdit(downPaymentMilestone.id, downPaymentMilestone)}
                >
                  Edit
                </button>
              </div>
              <div className="milestone-detail-content">
                <div className="milestone-detail-row">
                  <span className="milestone-detail-label">Amount Saved</span>
                  <span className="milestone-detail-value amount">
                    {downPaymentMilestone.amount
                      ? `$${Number(downPaymentMilestone.amount).toLocaleString()}`
                      : '—'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* How much do you need? recalc */}
          {activeGoal && (
            <div className="need-calculator">
              <h3 className="need-calculator-title">How much do you need?</h3>
              <div className="need-calculator-body">
                <div className="need-row">
                  <span>Target goal</span>
                  <span className="amount">${Number(activeGoal.targetAmount).toLocaleString()}</span>
                </div>
                <div className="need-row">
                  <span>Saved so far</span>
                  <span className="amount">${Number(activeGoal.currentAmount).toLocaleString()}</span>
                </div>
                <div className="need-row need-row--remaining">
                  <span>Still needed</span>
                  <span className="amount">
                    ${Math.max(0, activeGoal.targetAmount - activeGoal.currentAmount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AddMilestoneDetailForm({ milestoneType, onSubmit }) {
  const [form, setForm] = useState({ amount: '', lender: '', date: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      type: milestoneType,
      completedAt: new Date().toISOString(),
      amount: form.amount ? parseFloat(form.amount) : null,
      lender: form.lender,
      date: form.date,
    });
  }

  return (
    <form className="milestone-detail-form" onSubmit={handleSubmit}>
      {milestoneType === 'pre_approved' && (
        <>
          <div className="milestone-form-field">
            <label>Pre-Approval Amount</label>
            <input
              type="number"
              placeholder="e.g. 500000"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div className="milestone-form-field">
            <label>Lender</label>
            <input
              type="text"
              placeholder="e.g. Chase Bank"
              value={form.lender}
              onChange={(e) => setForm({ ...form, lender: e.target.value })}
            />
          </div>
          <div className="milestone-form-field">
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </>
      )}
      <button type="submit" className="btn btn-primary btn-sm btn-full">
        Save Details
      </button>
    </form>
  );
}
