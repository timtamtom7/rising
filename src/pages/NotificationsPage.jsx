import { useMemo } from 'react';
import { NotificationsCenter, buildProgressNotification, buildReminderNotification, buildAlertNotification } from '../components/NotificationsCenter';
import './NotificationsPage.css';

export function NotificationsPage({ notifications, onDismiss, goals = [], properties = [] }) {
  // Auto-generate contextual notifications
  const generatedNotifications = useMemo(() => {
    const notifs = [];

    goals.forEach((goal) => {
      if (goal.archived) return;
      const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
      if (progress > 0 && progress < 100) {
        notifs.push(buildProgressNotification(progress, goal.name));
      }
      if (progress >= 100) {
        notifs.push(buildProgressNotification(100, goal.name));
      }
    });

    // Weekly deposit reminder (show if there's an active goal with amount left)
    const activeGoal = goals.find((g) => !g.archived && g.currentAmount < g.targetAmount);
    if (activeGoal) {
      notifs.push(buildReminderNotification(
        activeGoal.name,
        `$${(activeGoal.targetAmount - activeGoal.currentAmount).toLocaleString()}`
      ));
    }

    // Property alerts — check for price drops or stale listings
    properties.forEach((prop) => {
      if (prop.priceDroppedAt) {
        notifs.push(buildAlertNotification(
          `Price drop on ${prop.name}!`,
          `This listing dropped ${Math.round((1 - prop.price / (prop.priceDroppedAt * 1.031)) * 100)}% — now ${prop.price.toLocaleString()}`
        ));
      }
      const daysOnMarket = Math.ceil((new Date() - new Date(prop.listedAt)) / (1000 * 60 * 60 * 24));
      if (daysOnMarket > 30) {
        notifs.push(buildAlertNotification(
          `${prop.name} has been on market ${daysOnMarket} days`,
          'Price drop might be coming — good time to make an offer.'
        ));
      }
    });

    return notifs;
  }, [goals, properties]);

  const allNotifications = [...generatedNotifications, ...notifications.filter((n) => !n.dismissedAt)];

  function handleDismiss(id) {
    onDismiss(id);
  }

  return (
    <div className="notif-page page-enter">
      <div className="notif-page-header">
        <h1 className="notif-page-title">Notifications</h1>
        <p className="notif-page-subtitle">
          Contextual alerts about your goals, savings progress, and properties.
        </p>
      </div>

      <div className="notif-page-grid">
        <div className="notif-page-section">
          <h2 className="notif-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            Smart Alerts
          </h2>
          <NotificationsCenter notifications={generatedNotifications} onDismiss={handleDismiss} />
        </div>
      </div>
    </div>
  );
}
