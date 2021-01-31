import { ipcRenderer } from 'electron';
import { observable, makeObservable, action, autorun, runInAction } from 'mobx';
import { ProjectItem } from '@stores/types';
import { TimerStore } from '@stores/Timer/Timer.store';

export class CurrentReportStore {
  constructor(timerStore: TimerStore) {
    makeObservable(this, {
      reportTask: observable,
      changeReportTask: action,
      reportDuration: observable,
      changeReportDuration: action,
      reportDate: observable,
      changeReportDate: action,
      reportDescription: observable,
      changeReportDescription: action,
      setReportDate: action,
      setReportDuration: action,
    });

    this.initialize();

    autorun(() => {
      this.setReportDate(timerStore.currentDate);
    });

    autorun(() => {
      this.setReportDuration(timerStore.workedHoursDecimal);
    });
  }

  private async initialize() {
    const projectList: ProjectItem[] = await ipcRenderer.invoke(
      'appSettings:getValue',
      'projectList'
    );
    this.projectNames = projectList
      .filter((project) => project.enabled)
      .map((project) => project.name);

    runInAction(() => {
      // eslint-disable-next-line prefer-destructuring
      this.reportTask = this.projectNames[0];
    });
  }

  public projectNames: string[] = [];

  public reportTask = '';

  public reportDuration = '';

  public reportDate = '';

  public reportDescription = '';

  public changeReportTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.reportTask = event.target.value;
  };

  public changeReportDuration = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.reportDuration = event.target.value;
  };

  public setReportDuration = (newValue: string) => {
    this.reportDuration = newValue;
  };

  public changeReportDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.reportDate = event.target.value;
  };

  public setReportDate = (newValue: string) => {
    this.reportDate = newValue;
  };

  public changeReportDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.reportDescription = event.target.value;
  };
}
