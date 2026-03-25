// Rising — Electron Preload Script
// Exposes safe IPC channels to the renderer process
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Navigation from main process
  onNavigate: (callback) => {
    ipcRenderer.on('navigate', (_, path) => callback(path));
  },

  // Actions from main process (e.g. menu actions)
  onAction: (callback) => {
    ipcRenderer.on('action', (_, action) => callback(action));
  },

  // Platform info
  platform: process.platform,

  // App version
  getVersion: () => {
    return process.env.APP_VERSION || '1.0.0';
  },

  // Open external URL
  openExternal: (url) => {
    require('electron').shell.openExternal(url);
  },
});
