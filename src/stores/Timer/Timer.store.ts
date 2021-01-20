import { ipcRenderer } from 'electron';
import { observable, action, computed, makeObservable } from 'mobx';

const oneHour = 60;
const oneMinute = 60000;

export class TimerStore {
  constructor() {
    makeObservable(this, {
      updateTime: action,
      workedTimeInMinutes: observable,
      workedMinutes: computed,
      workedHours: computed,
      isPaused: observable,
      startPause: action,
      stopPause: action,
      startNewDay: action,
      minimizeWindow: action,
    });

    this.startNewDay();
  }

  private startTime = new Date();

  private pauseBegin: Date | null = null;

  private minuteTimer: NodeJS.Timeout | null = null;

  private notificationTimer: NodeJS.Timeout | null = null;

  public workedTimeInMinutes = 0;

  public isPaused = false;

  private notifyUser = () => {
    // ipcRenderer.send('mainWindow:show', {});
    // this.reportField.focus();

    this.updateTime();
  };

  public updateTime = () => {
    const elapsedTime = new Date().getTime() - this.startTime.getTime();
    this.workedTimeInMinutes = Math.round(elapsedTime / oneMinute);
  };

  public get workedMinutes() {
    const workedMinutesString = (this.workedTimeInMinutes % oneHour).toString();

    return workedMinutesString.length > 1
      ? workedMinutesString
      : `0${workedMinutesString}`;
  }

  public get workedHours() {
    const workedHoursString = Math.floor(
      this.workedTimeInMinutes / oneHour
    ).toString();

    return workedHoursString.length > 1
      ? workedHoursString
      : `0${workedHoursString}`;
  }

  public startPause = () => {
    this.isPaused = true;

    this.pauseBegin = new Date();

    if (this.minuteTimer) {
      clearInterval(this.minuteTimer);
    }

    if (this.notificationTimer) {
      clearInterval(this.notificationTimer);
    }
  };

  public stopPause = () => {
    this.isPaused = false;

    const currentTime = new Date();
    if (
      this.pauseBegin &&
      currentTime.getDate() === this.pauseBegin.getDate()
    ) {
      const pauseDuration = currentTime.getTime() - this.pauseBegin.getTime();
      const newStartTime = this.startTime.getTime() + pauseDuration;

      // this.settings.timeStamp = new Date(newStartTime);
      // ipcRenderer.send('settings:save', [this.settings, true]);
    }

    this.pauseBegin = null;
    this.startNewDay();
  };

  public startNewDay = () => {
    // const timestamp = new Date(this.settings.timeStamp);
    const timestamp = new Date();
    const timestampDate = `${timestamp.getDay()}${timestamp.getMonth()}${timestamp.getFullYear()}`;
    const nowTime = new Date();
    const nowDate = `${nowTime.getDay()}${nowTime.getMonth()}${nowTime.getFullYear()}`;

    if (timestampDate !== nowDate) {
      // this.settings.timeStamp = nowTime;
      // ipcRenderer.send('settings:save', [this.settings, true]);
    }

    // this.startTime = new Date(this.settings.timeStamp);
    this.startTime = new Date();
    this.updateTime();

    if (this.minuteTimer) {
      clearInterval(this.minuteTimer);
    }

    if (this.notificationTimer) {
      clearInterval(this.notificationTimer);
    }

    this.minuteTimer = setInterval(this.updateTime, oneMinute);
    // const notificationInterval =
    //   this.settings.notificationTime * oneHour * oneMinute;
    const notificationInterval = 1 * oneHour * oneMinute;
    this.notificationTimer = setInterval(this.notifyUser, notificationInterval);
  };

  public minimizeWindow = () => {
    ipcRenderer.invoke('win:hide');
  };
}
