/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { app, BrowserWindow, shell, ipcMain, Tray } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
// import MenuBuilder from './menu';
import TrayBuilder from './tray';
import { getAssetPath } from './utils';
import { SettingsManager } from './managers/Settings';
import { PersistentTimeManager } from './managers/PersistentTime';
import { AppWindowManager } from './managers/AppWindow';
import { ExcelFileManager } from './managers/ExcelFile';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const initializeManagers = () => {
  PersistentTimeManager.has('init');
  SettingsManager.has('init');
  AppWindowManager.init();
  ExcelFileManager.init();
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  initializeManagers();

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    frame: false,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: SettingsManager.get('topMost'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  const trayBuilder = new TrayBuilder(mainWindow);
  tray = trayBuilder.buildTray(getAssetPath('icons/16x16.png'));

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

/**
 * IPC listeners...
 */

ipcMain.on('win:hide', () => {
  mainWindow?.hide();
});

ipcMain.on('win:show', () => {
  mainWindow?.show();
});

// HACK: This event will never happen.
// It keeps reference to Tray to avoid destroying by Garbage collector.
// https://www.electronjs.org/docs/faq#my-apps-tray-disappeared-after-a-few-minutes
ipcMain.on('app:not-happen', () => {
  console.table(tray);
});
