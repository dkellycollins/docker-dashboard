import { app, BrowserWindow } from 'electron';
import { format } from 'url';

let window: BrowserWindow;

function createWindow() {
  window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  const url = format({
    pathname: `${app.getAppPath()}/dist/renderer/index.html`,
    protocol: 'file:',
    slashes: true
  });
  window.loadURL(url);
}

app.on('ready', createWindow);
