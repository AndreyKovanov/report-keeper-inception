import { ipcRenderer } from 'electron';
import { observable, makeObservable, computed } from 'mobx';
import { calculateWorkDays } from '@helpers/date';

export class StatisticsStore {
  constructor() {
    makeObservable(this, {
      dayEffort: observable,
      weekEffort: observable,
      monthEffort: observable,
      dayNorm: observable,
      workDaysInMonth: observable,
      weekNorm: computed,
      monthNorm: computed,
    });

    this.initialize();
  }

  private async initialize() {
    this.workDaysInMonth = calculateWorkDays();
    this.dayNorm = await ipcRenderer.invoke('appSettings:getValue', 'dayNorm');
  }

  public dayEffort = 0;

  public weekEffort = 0;

  public monthEffort = 0;

  public dayNorm = 0;

  public workDaysInMonth = 0;

  public get weekNorm() {
    return this.dayNorm * 5;
  }

  public get monthNorm() {
    return this.dayNorm * this.workDaysInMonth;
  }
}
