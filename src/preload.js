// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    bigSize: (height) => ipcRenderer.send('big-size', height),
    smallSize: () => ipcRenderer.send('small-size'),
    
  })