import { ipcRenderer } from 'electron';
import { observable, makeObservable, action, runInAction } from 'mobx';
import { ColorTheme, ProjectItem } from '@stores/types';

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

  public changeProjectList = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const currentElementIndex = this.projectList.findIndex(
      (item) => item.name === name
    );
    this.projectList[currentElementIndex] = { name, enabled: checked };
  };

  public changeTopMost = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    this.topMost = checked;
  };

  public changeFilePath = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.filePath = event.target.value;
  };

  public changeNotificationTime = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.notificationTime = parseFloat(event.target.value || '0');
  };

  public changeDayNorm = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.dayNorm = parseFloat(event.target.value || '0');
  };

  public changeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.theme = event.target.value as ColorTheme;
  };

  public changeAutoLaunch = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    this.autoLaunch = checked;
  };

  public chooseReportsDirectory = async () => {
    const paths = await ipcRenderer.invoke('appWindow:chooseDirectoryPath');
    if (paths && paths[0]) {
      const [newPath] = paths;
      runInAction(() => {
        this.filePath = newPath;
      });
    }
  };

  public chooseReportsTemplate = async () => {
    const projectNames: string[] | undefined = await ipcRenderer.invoke(
      'appWindow:chooseReportsTemplate'
    );
    if (projectNames?.length) {
      runInAction(() => {
        this.projectList = projectNames.map((name) => ({
          name,
          enabled: true,
        }));
      });
    }
  };
}
