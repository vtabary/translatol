const { app, BrowserWindow } = require('electron');
const electron = require('@electron/remote/main');
electron.initialize();

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  electron.enable(win.webContents);
  win.maximize();

  // and load the index.html of the app.
  if (app.isPackaged) {
    win.loadFile(resolve(__dirname, '../../../dist/apps/ui/index.html'));
  } else {
    win.loadURL('http://localhost:4200');
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

app.on('ready', createWindow);
