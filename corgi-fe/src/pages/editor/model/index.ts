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
  }
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
    fileName: '',
    info: {
      element: [],
      root: {
        css: {
        },
        size: '',
      }
    }
  };

  public getSaveData = () => {
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
        message.success(`保存成功`);
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

  @action
  public setDesignData = (value: Partial<IDesignData>): void => {
    this.data = {...this.data, ...value};
  }
}

export default new Store()
