import { observable, action, makeObservable } from 'mobx';

export class CounterStore {
  constructor() {
    makeObservable(this, {
      countValue: observable,
      increment: action,
      decrement: action,
      inputTitle: observable,
      changeTitle: action,
    });
  }

  public countValue = 0;

  public increment = (): void => {
    this.countValue += 1;
  };

  public decrement = (): void => {
    this.countValue -= 1;
  };

  public inputTitle = '';

  public changeTitle = (newValue: string): void => {
    this.inputTitle = newValue;
  };
}
