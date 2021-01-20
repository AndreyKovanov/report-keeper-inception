import { app, Menu, BrowserWindow, Tray, nativeImage } from 'electron';
// import path from 'path';
// import { isWindows } from './utils';

export default class TrayBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildTray(iconPath: string): Tray {
    // const iconName = isWindows() ? '/icon.png' : '/mac-icon.png';
    // const iconPath = path.join(__dirname, iconName);
    const trayIcon = nativeImage.createFromPath(iconPath);
    const tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate(this.getMenuTemplate());

    tray.setContextMenu(contextMenu);
    tray.setToolTip('Report Keeper');

    return tray;
  }

  private getMenuTemplate() {
    return [
      {
        label: 'Show/Hide',
        click: () => {
          if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
          } else {
            this.mainWindow.show();
          }
        },
      },
      {
        label: 'Quit',
        click: () => {
          app.quit();
        },
      },
    ];
  }
}
