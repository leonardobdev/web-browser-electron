const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('navigate-to', (event, url) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.webContents.loadURL(url);
  }
});

ipcMain.on('navigate-back', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win && win.webContents.canGoBack()) {
    win.webContents.goBack();
  }
});

ipcMain.on('navigate-forward', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win && win.webContents.canGoForward()) {
    win.webContents.goForward();
  }
});

ipcMain.on('reload-page', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.webContents.reload();
  }
});