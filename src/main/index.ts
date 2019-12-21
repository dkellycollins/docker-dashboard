import { app, BrowserWindow } from 'electron';
import { join } from 'path';
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
  console.log(url);
  window.loadURL(url);
}

app.on('ready', createWindow);
