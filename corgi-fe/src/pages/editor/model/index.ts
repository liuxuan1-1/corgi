import { observable, configure, action, runInAction } from 'mobx';
import { message } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../pagesConst';

configure({
  enforceActions: "observed",
})

interface IDesignData {
  fileName: string,
  info: {
    [propName: string]: any
  },
  category: string[],
  isRelease?: boolean,
}

const pageParam = location.search.slice(1).split('&').map(e => e.split('='));
let templateId:string = '';
let designId: string = '';

if (Array.isArray(pageParam[0])) {
  if (pageParam[0][0] === 'templateid' && pageParam[0][1]) {
    templateId = pageParam[0][1]
  } else if (pageParam[0][0] === 'designid' && pageParam[0][1]) {
    designId = pageParam[0][1]
  }
}

class Store {
  @observable public data: Partial<IDesignData> = {
    category: [],
    fileName: '',
    info: {
      element: [],
      root: {
        css: {
        },
        size: '',
      }
    },
  };

  @observable public fontSpecial = {
    描边: {
      textShadow: "rgb(93, 97, 255) 1px -2px 0px, rgb(93, 97, 255) 2px -2px 0px, rgb(93, 97, 255) 2px 1px 0px, rgb(93, 97, 255) 2px 2px 0px, rgb(93, 97, 255) 1px 2px 0px, rgb(93, 97, 255) 2px 2px 0px, rgb(93, 97, 255) -2px 1px 0px, rgb(93, 97, 255) -2px 2px 0px, rgb(93, 97, 255) 1px -1px 0px, rgb(93, 97, 255) 1px 1px 0px, rgb(93, 97, 255) 1px 1px 0px, rgb(93, 97, 255) -1px 1px 0px, rgb(255, 42, 106) 0px 0px 0px, rgb(255, 42, 106) 0.707107px 0.707107px 0px, rgb(255, 42, 106) 1.41421px 1.41421px 0px, rgb(255, 42, 106) 2.12132px 2.12132px 0px, rgb(255, 42, 106) 2.82843px 2.82843px 0px, rgb(255, 42, 106) 3.53553px 3.53553px 0px, rgb(255, 42, 106) 4.24264px 4.24264px 0px, rgb(255, 42, 106) 4.94975px 4.94975px 0px, rgb(255, 42, 106) 5.65685px 5.65685px 0px, rgb(255, 42, 106) 6.36396px 6.36396px 0px, rgb(0, 0, 0) 0px 0px 20px"
    },
    火焰: {
      textShadow: "0 -5px 4px #FF3, 2px -10px 6px #fd3,-2px -15px 11px #f80, 2px -18px 18px #f20"
    },
    立体: {
      textShadow: "rgb(204, 213, 219) 0px 0px 0px, rgb(204, 213, 219) 0.707107px 0.707107px 0px, rgb(204, 213, 219) 1.41421px 1.41421px 0px, rgb(204, 213, 219) 2.12132px 2.12132px 0px, rgb(204, 213, 219) 2.82843px 2.82843px 0px, rgb(204, 213, 219) 3.53553px 3.53553px 0px, rgb(204, 213, 219) 4.24264px 4.24264px 0px, rgb(204, 213, 219) 4.94975px 4.94975px 0px, rgb(204, 213, 219) 5.65685px 5.65685px 0px, rgb(204, 213, 219) 6.36396px 6.36396px 0px, rgb(0, 0, 0) 0px 0px 20px"
    },
    颤抖: {
      textShadow: "rgb(255, 42, 106) -1px 0px 0px, rgb(255, 42, 106) -2px 0px 0px, rgb(255, 42, 106) -3px 0px 0px, rgb(83, 235, 239) 1px 0px 0px, rgb(83, 235, 239) 2px 0px 0px, rgb(83, 235, 239) 3px 0px 0px, rgb(0, 0, 0) 0px 0px 0px"
    },
  }

  public getSaveData = (noMessage: boolean = false) => {
    let url = `${API_URL}/api/design/save`;
    if (templateId) {
      url = `${API_URL}/api/template/save`;
    } else if (designId) {
      url = `${API_URL}/api/design/save`;
    } else {
      message.error(`文件不存在`);
      return;
    }
  
    axios({
      data: {
        ...this.data,
        id: designId || templateId,
      },
      method: 'post',
      url,
      withCredentials: true,
    }).then((e) => {
      const result = e.data;
      if (result.success) {
        if (!noMessage) {
          message.success(`保存成功`);
        }
      } else {
        message.error(`保存失败: ${result.message}`);
      }
    }).catch((e) => {
      message.error(`保存失败`);
      // tslint:disable-next-line: no-console
      console.error(`保存失败: ${JSON.stringify(e)}`)
    })
  }

  @action
  public getFetchData = () => {
    let url = `${API_URL}/api/design/getfile`;
    if (templateId) {
      url = `${API_URL}/api/template/getfile`;
    } else if (designId) {
      url = `${API_URL}/api/design/getfile`;
    } else {
      message.error(`文件不存在`);
      return;
    }
    axios({
      method: 'get',
      params: {
        id: designId || templateId,
      },
      url,
      withCredentials: true,
    }).then((e) => {
      const result = e.data;
      if (result.success) {
        runInAction(() => {
          this.data = result.data;
        })
      } else {
        message.error(`获取文件数据失败: ${result.message}`);
      }
    }).catch((e) => {
      message.error(`获取文件数据请求失败`);
      // tslint:disable-next-line: no-console
      console.error(`获取文件数据请求失败: ${JSON.stringify(e)}`)
    })
  }


  /**
   * 更改模板发布状态
   * @param release 变更状态
   */
  @action
  public getRelease(release: boolean) {
    axios({
      data: {
        id: templateId,
        isRelease: release,
      },
      method: 'post',
      url: `${API_URL}/api/template/release`,
      withCredentials: true,
    }).then((e) => {
      const result = e.data;
      if (result.success) {
        runInAction(() => {
          this.data.isRelease = release;
        })
        message.success(`操作成功`);
      } else {
        message.error(`操作失败: ${result.message}`);
      }
    }).catch((e) => {
      message.error(`release操作请求失败`);
      // tslint:disable-next-line: no-console
      console.error(`release操作请求失败: ${JSON.stringify(e)}`)
    })
  }

  @action
  public setDesignData = (value: Partial<IDesignData>): void => {
    this.data = {...this.data, ...value};
  }
}

export default new Store()
