import { useState, useEffect, useCallback } from 'react';
import { loadData, saveData, createGoal, createDeposit, createProperty, createMilestone, createAgent } from '../utils/storage';

export function useGoals() {
  const [data, setData] = useState(() => loadData());

  useEffect(() => {
    saveData(data);
  }, [data]);

  const addGoal = useCallback((goalData) => {
    const goal = createGoal(goalData);
    setData((prev) => ({ ...prev, goals: [goal, ...prev.goals] }));
    return goal;
  }, []);

  const updateGoal = useCallback((id, updates) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    }));
  }, []);

  const deleteGoal = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.filter((g) => g.id !== id),
    }));
  }, []);

  const addDeposit = useCallback((goalId, depositData) => {
    const deposit = createDeposit(depositData);
    setData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => {
        if (g.id !== goalId) return g;
        const newAmount = g.currentAmount + deposit.amount;
        const completed = newAmount >= g.targetAmount;
        return {
          ...g,
          currentAmount: newAmount,
          deposits: [deposit, ...g.deposits],
          completedAt: completed && !g.completedAt ? new Date().toISOString() : g.completedAt,
        };
      }),
    }));
    return deposit;
  }, []);

  const deleteDeposit = useCallback((goalId, depositId) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => {
        if (g.id !== goalId) return g;
        const deposit = g.deposits.find((d) => d.id === depositId);
        if (!deposit) return g;
        return {
          ...g,
          currentAmount: Math.max(0, g.currentAmount - deposit.amount),
          deposits: g.deposits.filter((d) => d.id !== depositId),
        };
      }),
    }));
  }, []);

  const reorderGoals = useCallback((fromIndex, toIndex) => {
    setData((prev) => {
      const goals = [...prev.goals];
      const [moved] = goals.splice(fromIndex, 1);
      goals.splice(toIndex, 0, moved);
      return { ...prev, goals };
    });
  }, []);

  const updateSettings = useCallback((updates) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }));
  }, []);

  const getActiveGoals = useCallback(() => {
    return data.goals.filter((g) => !g.archived);
  }, [data.goals]);

  const getArchivedGoals = useCallback(() => {
    return data.goals.filter((g) => g.archived);
  }, [data.goals]);

  const getAllDeposits = useCallback(() => {
    const now = new Date();
    const deposits = [];
    data.goals.forEach((goal) => {
      goal.deposits.forEach((d) => {
        deposits.push({ ...d, goalName: goal.name, goalId: goal.id });
      });
    });
    return deposits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [data.goals]);

  const getTotalSaved = useCallback(() => {
    return data.goals.reduce((sum, g) => sum + g.currentAmount, 0);
  }, [data.goals]);

  const exportData = useCallback(() => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  // ── Properties ──────────────────────────────────────────────
  const addProperty = useCallback((propertyData) => {
    const property = createProperty(propertyData);
    setData((prev) => ({ ...prev, properties: [property, ...prev.properties] }));
    return property;
  }, []);

  const updateProperty = useCallback((id, updates) => {
    setData((prev) => ({
      ...prev,
      properties: prev.properties.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  }, []);

  const deleteProperty = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      properties: prev.properties.filter((p) => p.id !== id),
    }));
  }, []);

  // ── Milestones ──────────────────────────────────────────────
  const updateMilestone = useCallback((data) => {
    setData((prev) => {
      const existing = prev.milestones.find((m) => m.type === data.type);
      if (existing) {
        return {
          ...prev,
          milestones: prev.milestones.map((m) =>
            m.id === existing.id ? { ...m, ...data } : m
          ),
        };
      }
      const milestone = createMilestone({ ...data, goalId: null });
      return { ...prev, milestones: [...prev.milestones, milestone] };
    });
  }, []);

  const toggleMilestone = useCallback((id, completedAt) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === id ? { ...m, completedAt } : m
      ),
    }));
  }, []);

  // ── Notifications ───────────────────────────────────────────
  const dismissNotification = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, dismissedAt: new Date().toISOString() } : n
      ),
    }));
  }, []);

  // ── Agents ─────────────────────────────────────────────────
  const addAgent = useCallback((agentData) => {
    const agent = createAgent(agentData);
    setData((prev) => ({ ...prev, agents: [agent, ...prev.agents] }));
    return agent;
  }, []);

  const updateAgent = useCallback((id, updates) => {
    setData((prev) => ({
      ...prev,
      agents: prev.agents.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  }, []);

  const deleteAgent = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      agents: prev.agents.filter((a) => a.id !== id),
    }));
  }, []);

  return {
    data,
    addGoal,
    updateGoal,
    deleteGoal,
    addDeposit,
    deleteDeposit,
    reorderGoals,
    updateSettings,
    getActiveGoals,
    getArchivedGoals,
    getAllDeposits,
    getTotalSaved,
    exportData,
    addProperty,
    updateProperty,
    deleteProperty,
    updateMilestone,
    toggleMilestone,
    dismissNotification,
    addAgent,
    updateAgent,
    deleteAgent,
  };
}
