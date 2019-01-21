import { observable, configure, action } from 'mobx';

configure({
  enforceActions: "observed",
})

class Store {
  @observable public num : number;


  constructor() {
    this.num = 1;
  }

  @action
  public setAddNum: () => void = () => {
    this.num += 1;
  }
}

export default new Store()
