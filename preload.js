const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  navigateTo: (url) => ipcRenderer.send('navigate-to', url),
  navigateBack: () => ipcRenderer.send('navigate-back'),
  navigateForward: () => ipcRenderer.send('navigate-forward'),
  reloadPage: () => ipcRenderer.send('reload-page'),
  onURLUpdated: (callback) => ipcRenderer.on('url-updated', (event, url) => callback(url)),
  onCanGoBack: (callback) => ipcRenderer.on('can-go-back', (event, canGoBack) => callback(canGoBack)),
  onCanGoForward: (callback) => ipcRenderer.on('can-go-forward', (event, canGoForward) => callback(canGoForward)),
});