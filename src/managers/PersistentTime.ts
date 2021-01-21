import { ipcMain } from 'electron';
import ElectronStore from 'electron-store';

export const PersistentTimeManager = new ElectronStore({
  name: 'time-storage',
  defaults: {
    startTime: new Date().getTime(),
  },
});

ipcMain.handle('persistentTime:getValue', (event, key) => {
  return PersistentTimeManager.get(key);
});

ipcMain.on('persistentTime:setValue', (event, key, value) => {
  PersistentTimeManager.set(key, value);
});
