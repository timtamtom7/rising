import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGoals } from './hooks/useGoals';
import { Nav } from './components/Nav';
import { Landing } from './pages/Landing';
import { Onboarding, isOnboardingComplete } from './pages/Onboarding';
import { Home } from './pages/Home';
import { CreateGoal } from './pages/CreateGoal';
import { GoalDetail } from './pages/GoalDetail';
import { DepositFlow } from './pages/DepositFlow';
import { EditGoal } from './pages/EditGoal';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { Pricing } from './pages/Pricing';
import './index.css';

function AppLayout({ children, totalSaved, currency }) {
  return (
    <div className="app-layout">
      <Nav totalSaved={totalSaved} currency={currency} />
      <main className="app-main">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  const {
    data,
    addGoal,
    updateGoal,
    deleteGoal,
    addDeposit,
    updateSettings,
    getActiveGoals,
    getArchivedGoals,
    getAllDeposits,
    getTotalSaved,
    exportData,
  } = useGoals();

  const { settings } = data;
  const totalSaved = getTotalSaved();
  const currentPlan = settings.subscription?.plan || 'free';

  // Apply theme on mount and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Onboarding */}
        <Route
          path="/onboarding"
          element={
            isOnboardingComplete()
              ? <Navigate to="/app" replace />
              : <Onboarding />
          }
        />

        {/* Pricing */}
        <Route
          path="/pricing"
          element={<Pricing currentPlan={currentPlan} />}
        />

        {/* App routes */}
        <Route
          path="/app"
          element={
            <AppLayout totalSaved={totalSaved} currency={settings.currency}>
              <Home
                goals={data.goals}
                totalSaved={totalSaved}
                currency={settings.currency}
              />
            </AppLayout>
          }
        />

        <Route
          path="/app/goals/new"
          element={
            <AppLayout totalSaved={totalSaved} currency={settings.currency}>
              <CreateGoal
                onCreate={addGoal}
                currency={settings.currency}
              />
            </AppLayout>
          }
        />

        <Route
          path="/app/goals/:id"
          element={
            <AppLayout totalSaved={totalSaved} currency={settings.currency}>
              <GoalDetail
                goals={data.goals}
                onUpdateGoal={updateGoal}
                onDeleteGoal={deleteGoal}
                currency={settings.currency}
              />
            </AppLayout>
          }
        />

        <Route
          path="/app/goals/:id/deposit"
          element={
            <AppLayout totalSaved={totalSaved} currency={settings.currency}>
              <DepositFlow
                goals={data.goals}
                onAddDeposit={addDeposit}
                currency={settings.currency}
              />
            </AppLayout>
          }
        />

        <Route
          path="/app/goals/:id/edit"
          element={
            <AppLayout totalSaved={totalSaved} currency={settings.currency}>
              <EditGoal
                goals={data.goals}
                onUpdateGoal={updateGoal}
                currency={settings.currency}
              />
            </AppLayout>
          }
        />

        <Route
          path="/app/history"
          element={
            <AppLayout totalSaved={totalSaved} currency={settings.currency}>
              <History
                goals={data.goals}
                getAllDeposits={getAllDeposits}
                getTotalSaved={getTotalSaved}
                currency={settings.currency}
              />
            </AppLayout>
          }
        />

        <Route
          path="/app/settings"
          element={
            <AppLayout totalSaved={totalSaved} currency={settings.currency}>
              <Settings
                data={data}
                onUpdateSettings={updateSettings}
                onExportData={exportData}
              />
            </AppLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
