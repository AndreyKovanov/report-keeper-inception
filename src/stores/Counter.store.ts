import { observable, action } from 'mobx';

export class CounterStore {
  @observable
  public countValue = 0;

  @action
  public increment = (): void => {
    this.countValue += 1;
  };

  @action
  public decrement = (): void => {
    this.countValue -= 1;
  };

  @observable
  public inputTitle = '';

  @action
  public changeTitle = (newValue: string): void => {
    this.inputTitle = newValue;
  };
}
