import * as React from 'react';
// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
import { action, runInAction } from 'mobx';
import BackgroundPanel from '../../../../../components/tools/background';
import Font from '../../../../../components/tools/font';
import Material from '../../../../../components/tools/material';
import { API_URL } from '../../../../../pagesConst';


interface Istates {
}

interface Iprops {
  menuCurrent: string,
  callbackChangeStore: (e: any) => void,
  fontSpecial: {
    [propName: string]: any,
  },
  materialSpecial: {
    [propName: string]: any,
  }
  data: any,
  getMaterialImgList: () => void,
  materialImgList: Array<{
    _id: string,
    type: string,
    url: string,
  }>
}

class NavPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public callbackChangeBackground = (e: any): void => {
    const { data, callbackChangeStore } = this.props;
    if (data.root && data.root.css) {
      data.root.css.background = e;
      callbackChangeStore(data);
    }
  }

  /**
   * 生成font组件
   * @param e font类型
   */
  @action
  public callbackChangeFont = (e: string): void => {
    const { fontSpecial, data, callbackChangeStore } = this.props;
    const element = {
      extends: {
        content: '双击输入内容',
      },
      id: 0,
      position: {
        left: '0px',
        position: 'absolute',
        top: '0px',
        transform: 'rotateZ(0deg)',
        zIndex: 1,
      },
      style: {
        borderColor: '000000',
        borderRadius: '0px',
        borderStyle: 'solid',
        borderWidth: '0px',
        color: '#000000',
        cursor: 'default',
        ...fontSpecial[e],
        fontSize: '70px',
        lineHeight: 1.2,
        opacity: 1,
        overflow: 'hidden',
        overflowWrap: 'break-word',
        padding: '26px',
        textAlign: 'center',
        userSelect: 'none',
      },
      type: 'font',
    }

    const size = data.root.size;
    let result = [0, 0];
    if (size) {
      result = size.split('*');
    }

    element.style.width = `${result[0]}px`;
    element.style.height = `136px`;
    element.position.zIndex = data.element.length + 1;
    element.id = data.element.length;

    data.element.push(element);
    callbackChangeStore(data);
  }

  /**
   * 生成素材组件
   * @param e {type: string, target: string}
   */
  @action
  public callbackChangeMaterial = (e: {
    type: string,
    target: string,
  }): void => {
    const { materialSpecial, data, callbackChangeStore, materialImgList } = this.props;
    if (e.type === 'material') {
      const element = {
        extends: {
          childStyle: {},
          eleId: materialSpecial[e.target].id,
        },
        id: 0,
        position: {
          left: '0px',
          position: 'absolute',
          top: '0px',
          transform: 'rotateZ(0deg)',
          zIndex: 1,
        },
        style: {
          height: '',
          width: '',
        },
        type: 'material',
      }

      const size = data.root.size;
      let result = [0, 0];
      if (size) {
        result = size.split('*');
      }

      element.style.width = `${result[0]}px`;
      element.style.height = `136px`;
      element.position.zIndex = data.element.length + 1;
      element.id = data.element.length;

      data.element.push(element);
      callbackChangeStore(data);
    } else if (e.type === 'img') {
      const item = materialImgList.find((item) => {
        return item._id === e.target
      })

      if (!item) { return; }
      const element = {
        extends: {
          url: item.url,
        },
        id: 0,
        position: {
          left: '0px',
          position: 'absolute',
          top: '0px',
          transform: 'rotateZ(0deg)',
          zIndex: 1,
        },
        style: {
          height: '',
          width: '',
        },
        type: 'img',
      }

      const size = data.root.size;
      let result = [0, 0];
      if (size) {
        result = size.split('*');
      }
      const imgEle = document.createElement('img')
      imgEle.onload = () => {
        runInAction(() => {
          if (imgEle.width > result[0]) {
            element.style.width = `${result[0]}px`;
            element.style.height = `${result[0] * imgEle.height / imgEle.width}px`;

          } else {
            element.style.width = `${imgEle.width}px`;
            element.style.height = `${imgEle.height}px`;
          }
          element.position.zIndex = data.element.length + 1;
          element.id = data.element.length;

          data.element.push(element);
          callbackChangeStore(data);
        })
      }
      imgEle.src = `${API_URL}/${item.url}`
    }
  }

  public renderNavPanel = (): React.ReactNode => {
    const { menuCurrent, fontSpecial, data, materialSpecial, getMaterialImgList, materialImgList } = this.props;
    switch (menuCurrent) {
      case 'background':
        return <BackgroundPanel color={data.root.css.background} callbackChange={this.callbackChangeBackground} />
      case 'font':
        return <Font fontSpecial={fontSpecial} callbackChangeFont={this.callbackChangeFont}  />
      case 'material':
        return (
          <Material
            materialSpecial={materialSpecial}
            callbackChangeMaterial={this.callbackChangeMaterial}
            getMaterialImgList={getMaterialImgList}
            materialImgList={materialImgList}
          />
        )
      default:
        return null;
    }

  }

  public render() {
    return (
      <div className="nav-panel-wrapper">
        {this.renderNavPanel()}
      </div>
    );
  }
}

export default NavPanel;
