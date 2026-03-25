// Rising — Electron Main Process (macOS)
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Rising',
    backgroundColor: '#ffffff',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // Preload script for secure IPC
      preload: path.join(__dirname, 'preload.js'),
    },
    // macOS window chrome
    titleBarStyle: 'default',
    trafficLightPosition: { x: 16, y: 16 },
  });

  // Build app menu
  const template = buildMenu();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

function buildMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    // App menu (macOS only)
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              {
                label: 'Preferences…',
                accelerator: 'Cmd+,',
                click: () => mainWindow?.webContents.send('navigate', '/app/settings'),
              },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),

    // File menu
    {
      label: 'File',
      submenu: [
        {
          label: 'New Goal',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow?.webContents.send('navigate', '/app/goals/new'),
        },
        { type: 'separator' },
        {
          label: 'Export Data…',
          accelerator: 'CmdOrCtrl+E',
          click: () => mainWindow?.webContents.send('action', 'export'),
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },

    // Edit menu
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },

    // View menu
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },

    // Go menu
    {
      label: 'Go',
      submenu: [
        {
          label: 'Home',
          accelerator: 'CmdOrCtrl+Shift+H',
          click: () => mainWindow?.webContents.send('navigate', '/app'),
        },
        {
          label: 'Properties',
          accelerator: 'CmdOrCtrl+P',
          click: () => mainWindow?.webContents.send('navigate', '/app/properties'),
        },
        {
          label: 'Milestones',
          click: () => mainWindow?.webContents.send('navigate', '/app/milestones'),
        },
        {
          label: 'Mortgage Calculator',
          click: () => mainWindow?.webContents.send('navigate', '/app/mortgage'),
        },
        {
          label: 'Mortgage Rates',
          click: () => mainWindow?.webContents.send('navigate', '/app/rates'),
        },
        {
          label: 'Charts',
          click: () => mainWindow?.webContents.send('navigate', '/app/charts'),
        },
        { type: 'separator' },
        {
          label: 'Settings',
          accelerator: 'Cmd+,',
          click: () => mainWindow?.webContents.send('navigate', '/app/settings'),
        },
        ...(isMac
          ? [
              { type: 'separator' as const },
              { role: 'minimize' as const },
              { role: 'zoom' as const },
            ]
          : [{ role: 'minimize' as const }]),
      ],
    },

    // Window menu
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac
          ? [
              { type: 'separator' as const },
              { role: 'front' as const },
              { type: 'separator' as const },
              { role: 'window' as const },
            ]
          : [{ role: 'close' as const }]),
      ],
    },

    // Help menu
    {
      role: 'help',
      submenu: [
        {
          label: 'Rising on GitHub',
          click: () => shell.openExternal('https://github.com/timtamtom7/rising'),
        },
        {
          label: 'Report an Issue',
          click: () => shell.openExternal('https://github.com/timtamtom7/rising/issues'),
        },
      ],
    },
  ];

  return template;
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // macOS: re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: prevent new window creation
app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (event, url) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.origin !== 'http://localhost:5173' && parsedUrl.origin !== 'file://') {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
});
