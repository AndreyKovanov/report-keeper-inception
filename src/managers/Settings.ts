import { app, ipcMain } from 'electron';
import ElectronStore from 'electron-store';

const getDefaultSettings = () => ({
  projects: [
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
  realTime: false,
  topMost: true,
  filePath: app.getPath('userData'),
  notificationTime: 1,
  newFileEveryWeek: false,
  workTime: 8,
  theme: 'dark',
  autoLaunch: true,
});

export const SettingsManager = new ElectronStore({
  name: 'app-settings',
  defaults: getDefaultSettings(),
});

ipcMain.handle('getSettingsValue', (event, key) => {
  return SettingsManager.get(key);
});

ipcMain.handle('setSettingsValue', (event, key, value) => {
  return SettingsManager.set(key, value);
});
