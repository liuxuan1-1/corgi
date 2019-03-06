import { observable, configure, action } from 'mobx';

configure({
  enforceActions: "observed",
})

interface IDesignData {
  fileName: string,
  info: {
    [propName: string]: any
  }
}

class Store {
  @observable public data: Partial<IDesignData> = {
    fileName: '123',
    info: {
      element: [{
        css: {
          border: 0,
          top: 0,
        },
        id: 0,
        type: 'font',
      }],
      root: {
        css: {
          background: '#ffffff',
          height: '1008px',
          width: '640px',
        }
      }
    }
  };

  @action
  public setDesignData = (value: Partial<IDesignData>): void => {
    this.data = {...this.data, ...value};
  }
}

export default new Store()
