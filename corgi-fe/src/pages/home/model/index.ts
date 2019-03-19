import { observable, configure, action } from 'mobx';

configure({
  enforceActions: "observed",
})

class Store {
  @observable public userInfo = {};
  @observable public faceCheck: boolean = false;

  @action
  public setUserInfo = (userInfo: any) => {
    this.userInfo = userInfo;
  }

  @action
  public setFaceCheck = (ok: boolean) => {
    this.faceCheck = ok;
  }
}

export default new Store()
