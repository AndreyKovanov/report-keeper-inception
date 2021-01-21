import { ipcRenderer } from 'electron';
import { observable, action, computed, makeObservable } from 'mobx';
import { dateToString } from '@helpers/date';

const oneHour = 60;
const oneMinute = 60000;

export class TimerStore {
  constructor() {
    makeObservable(this, {
      updateWorkedTime: action,
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
    ipcRenderer.send('win:show');
    this.updateWorkedTime();
  };

  public updateWorkedTime = () => {
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

      ipcRenderer.send('persistentTime:setValue', 'startTime', newStartTime);
    }

    this.pauseBegin = null;
    this.startNewDay();
  };

  public startNewDay = async () => {
    const persistentTimestamp = await ipcRenderer.invoke(
      'persistentTime:getValue',
      'startTime'
    );

    const persistentDate = new Date(persistentTimestamp);
    const persistentDateString = dateToString(persistentDate);
    const nowDate = new Date();
    const nowDateString = dateToString(nowDate);

    if (persistentDateString !== nowDateString) {
      ipcRenderer.send(
        'persistentTime:setValue',
        'startTime',
        nowDate.getTime()
      );
    }

    this.startTime =
      persistentDateString === nowDateString ? persistentDate : nowDate;

    this.updateWorkedTime();

    if (this.minuteTimer) {
      clearInterval(this.minuteTimer);
    }

    this.minuteTimer = setInterval(this.updateWorkedTime, oneMinute);

    if (this.notificationTimer) {
      clearInterval(this.notificationTimer);
    }

    const notificationTime = await ipcRenderer.invoke(
      'appSettings:getValue',
      'notificationTime'
    );
    const notificationInterval = notificationTime * oneHour * oneMinute;

    this.notificationTimer = setInterval(this.notifyUser, notificationInterval);
  };

  public minimizeWindow = () => {
    ipcRenderer.send('win:hide');
  };
}
