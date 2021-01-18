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
    });
    this.minuteTimer = setInterval(this.updateTime, oneMinute);
  }

  private startTime = new Date();

  private minuteTimer: NodeJS.Timeout;

  public workedTimeInMinutes = 0;

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
}
