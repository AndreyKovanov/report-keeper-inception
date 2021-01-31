import { ipcRenderer } from 'electron';
import { observable, makeObservable, action } from 'mobx';
import { ProjectItem } from '@stores/types';

export class CurrentReportStore {
  constructor() {
    makeObservable(this, {
      reportTask: observable,
      changeReportTask: action,
      reportDuration: observable,
      changeReportDuration: action,
      reportDate: observable,
      changeReportDate: action,
      reportDescription: observable,
      changeReportDescription: action,
    });

    this.initialize();
  }

  private async initialize() {
    const projectList: ProjectItem[] = await ipcRenderer.invoke(
      'appSettings:getValue',
      'projectList'
    );
    this.projectNames = projectList
      .filter((project) => project.enabled)
      .map((project) => project.name);

    // eslint-disable-next-line prefer-destructuring
    this.reportTask = this.projectNames[0];
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

  public changeReportDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.reportDate = event.target.value;
  };

  public changeReportDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.reportDescription = event.target.value;
  };
}
