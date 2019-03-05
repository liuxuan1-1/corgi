import { observable, configure, action } from 'mobx';

configure({
  enforceActions: "observed",
})

interface IDesignData {
  fileName: string,
}

class Store {
  @observable public data: Partial<IDesignData> = {
    fileName: '123',
  };

  @action
  public setDesignData = (value: Partial<IDesignData>): void => {
    this.data = {...this.data, ...value};
  }
}

export default new Store()
