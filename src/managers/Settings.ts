import { app, ipcMain } from 'electron';
import ElectronStore from 'electron-store';
import AutoLaunch from 'auto-launch';

const getDefaultSettings = () => ({
  projectList: [
    {
      name: 'Internal.Communication',
      enabled: true,
    },
    {
      name: 'Internal.Development',
      enabled: true,
    },
    {
      name: 'Internal.Investigation',
      enabled: true,
    },
    {
      name: 'Internal.Testing',
      enabled: true,
    },
    {
      name: 'Internal.Estimation',
      enabled: true,
    },
    {
      name: 'Internal.Administration',
      enabled: true,
    },
    {
      name: 'Internal.Code review',
      enabled: true,
    },
  ],
  topMost: true,
  filePath: app.getPath('userData'),
  notificationTime: 1,
  dayNorm: 8,
  theme: 'dark',
  autoLaunch: true,
});

export const SettingsManager = new ElectronStore({
  name: 'app-settings',
  defaults: getDefaultSettings(),
});

ipcMain.handle('appSettings:getValue', (event, key) => {
  return SettingsManager.get(key);
});

ipcMain.handle('appSettings:getAll', () => {
  return SettingsManager.store;
});

ipcMain.on('appSettings:setValue', (event, key, value) => {
  SettingsManager.set(key, value);
});

ipcMain.on('appSettings:setAll', async (event, newSettings) => {
  SettingsManager.store = newSettings;

  const autoLauncher = new AutoLaunch({
    name: 'report-keeper-inception',
  });

  const isAutoLaunchEnabled = await autoLauncher.isEnabled();

  if (!isAutoLaunchEnabled && newSettings.autoLaunch) {
    autoLauncher.enable();
  } else if (isAutoLaunchEnabled && !newSettings.autoLaunch) {
    autoLauncher.disable();
  }

  // Restart app to apply settings
  app.relaunch();
  app.quit();
});
