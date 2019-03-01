import { observable, configure, action } from 'mobx';

configure({
  enforceActions: "observed",
})

class Store {
  @observable public userInfo = {};

  @action
  public setUserInfo = (userInfo: any) => {
    this.userInfo = userInfo;
  }
}

export default new Store()
