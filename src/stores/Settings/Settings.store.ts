import { ipcRenderer } from 'electron';
import { observable, makeObservable, action } from 'mobx';

interface ProjectItem {
  name: string;
  enabled: boolean;
}

type ColorTheme = 'dark' | 'light';

export class SettingsStore {
  constructor() {
    makeObservable(this, {
      projectList: observable,
      topMost: observable,
      filePath: observable,
      notificationTime: observable,
      dayNorm: observable,
      theme: observable,
      autoLaunch: observable,
      saveAndReload: action,
      changeProjectList: action,
      changeTopMost: action,
      changeFilePath: action,
      changeNotificationTime: action,
      changeDayNorm: action,
      changeTheme: action,
      changeAutoLaunch: action,
    });

    this.load();
  }

  private async load() {
    const settings = await ipcRenderer.invoke('appSettings:getAll');

    this.projectList = settings.projectList;
    this.topMost = settings.topMost;
    this.filePath = settings.filePath;
    this.notificationTime = settings.notificationTime;
    this.dayNorm = settings.dayNorm;
    this.theme = settings.theme;
    this.autoLaunch = settings.autoLaunch;
  }

  public projectList: ProjectItem[] = [];

  public topMost = true;

  public autoLaunch = true;

  public notificationTime = 0;

  public dayNorm = 0;

  public filePath = '';

  public theme: ColorTheme = 'dark';

  public saveAndReload = () => {
    const {
      projectList,
      topMost,
      filePath,
      notificationTime,
      dayNorm,
      theme,
      autoLaunch,
    } = this;

    ipcRenderer.send('appSettings:setAll', {
      projectList: projectList.map((item) => ({ ...item })),
      topMost,
      filePath,
      notificationTime,
      dayNorm,
      theme,
      autoLaunch,
    });
  };

  public changeProjectList = (newValue: ProjectItem[]) => {
    this.projectList = newValue;
  };

  public changeTopMost = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    this.topMost = checked;
  };

  public changeFilePath = (newValue: string) => {
    this.filePath = newValue;
  };

  public changeNotificationTime = (newValue: number) => {
    this.notificationTime = newValue;
  };

  public changeDayNorm = (newValue: number) => {
    this.dayNorm = newValue;
  };

  public changeTheme = (newValue: ColorTheme) => {
    this.theme = newValue;
  };

  public changeAutoLaunch = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    this.autoLaunch = checked;
  };
}
