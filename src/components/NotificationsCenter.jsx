import { useState } from 'react';
import './NotificationsCenter.css';

const ALERT_TYPES = {
  reminder: {
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-subtle)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
  },
  progress: {
    color: 'var(--color-accent-warm)',
    bg: 'rgba(245, 158, 11, 0.10)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  alert: {
    color: 'var(--color-error)',
    bg: 'var(--color-error-subtle)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
};

export function NotificationItem({ notification, onDismiss }) {
  const type = notification.type || 'reminder';
  const config = ALERT_TYPES[type];

  return (
    <div
      className={`notif-item notif-item--${type}`}
      style={{ '--notif-color': config.color, '--notif-bg': config.bg }}
    >
      <div className="notif-icon">{config.icon}</div>
      <div className="notif-body">
        <p className="notif-text">{notification.message}</p>
        {notification.subtext && (
          <p className="notif-subtext">{notification.subtext}</p>
        )}
        <span className="notif-time">
          {notification.createdAt
            ? new Date(notification.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric',
              })
            : 'Now'}
        </span>
      </div>
      {onDismiss && (
        <button
          className="notif-dismiss btn btn-ghost btn-icon btn-sm"
          onClick={() => onDismiss(notification.id)}
          aria-label="Dismiss"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export function NotificationsCenter({ notifications = [], onDismiss }) {
  const unread = notifications.filter((n) => !n.dismissedAt);

  if (unread.length === 0) {
    return (
      <div className="notif-center notif-center--empty">
        <div className="notif-empty-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <p className="notif-empty-text">All caught up — no notifications right now.</p>
      </div>
    );
  }

  return (
    <div className="notif-center">
      <div className="notif-header">
        <span className="notif-header-title">Notifications</span>
        <span className="notif-count">{unread.length}</span>
      </div>
      <div className="notif-list">
        {unread.map((n) => (
          <NotificationItem key={n.id} notification={n} onDismiss={onDismiss} />
        ))}
      </div>
    </div>
  );
}

// Notification builder helpers
export function buildProgressNotification(percent, goalName) {
  return {
    id: `progress-${Date.now()}`,
    type: 'progress',
    message: `You're ${percent}% to your "${goalName}" goal!`,
    subtext: percent >= 100 ? 'Goal reached — amazing work!' : 'Keep going, you\'re making real progress.',
    createdAt: new Date().toISOString(),
  };
}

export function buildReminderNotification(goalName, amount) {
  return {
    id: `reminder-${Date.now()}`,
    type: 'reminder',
    message: `Deposit this week?`,
    subtext: goalName ? `You have ${amount} left for "${goalName}"` : `You have savings goals to work toward.`,
    createdAt: new Date().toISOString(),
  };
}

export function buildAlertNotification(message, subtext) {
  return {
    id: `alert-${Date.now()}`,
    type: 'alert',
    message,
    subtext,
    createdAt: new Date().toISOString(),
  };
}
