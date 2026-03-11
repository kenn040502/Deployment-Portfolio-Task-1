import { app, BrowserWindow, ipcMain, shell } from 'electron';
import updater from 'electron-updater';
import log from 'electron-log';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;
const { autoUpdater } = updater;
let mainWindow;

const updateState = {
  idle: 'idle',
  checking: 'checking',
  available: 'available',
  none: 'none',
  downloading: 'downloading',
  downloaded: 'downloaded',
  error: 'error',
};

function sendUpdateStatus(payload) {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send('update:status', payload);
  }
}

function initAutoUpdate() {
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.autoDownload = true;

  autoUpdater.on('checking-for-update', () => {
    sendUpdateStatus({ state: updateState.checking, message: 'Checking for updates...' });
  });

  autoUpdater.on('update-available', (info) => {
    sendUpdateStatus({
      state: updateState.available,
      version: info.version,
      message: `Update ${info.version} available. Downloading...`,
    });
  });

  autoUpdater.on('update-not-available', () => {
    sendUpdateStatus({ state: updateState.none, message: 'No updates available.' });
  });

  autoUpdater.on('download-progress', (progress) => {
    const percent = Math.round(progress.percent);
    sendUpdateStatus({
      state: updateState.downloading,
      percent,
      message: `Downloading update... ${percent}%`,
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    sendUpdateStatus({
      state: updateState.downloaded,
      version: info.version,
      message: `Update ${info.version} ready. Restart to install.`,
    });
  });

  autoUpdater.on('error', (err) => {
    sendUpdateStatus({
      state: updateState.error,
      message: `Update error: ${err?.message || err}`,
    });
  });

  autoUpdater.checkForUpdates();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: '#0b0b14',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (isDev) {
    const devUrl = process.env.ELECTRON_RENDERER_URL || 'http://localhost:5173';
    mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/renderer/index.html'));
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.handle('update:install', () => {
  autoUpdater.quitAndInstall();
});

app.whenReady().then(() => {
  createWindow();
  if (!isDev) {
    initAutoUpdate();
  } else {
    sendUpdateStatus({
      state: updateState.idle,
      message: 'Auto-update runs only in packaged builds.',
    });
  }

  app.on('activate', () => {
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
