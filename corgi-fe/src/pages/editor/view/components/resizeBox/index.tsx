import * as React from 'react';
import { inject, observer } from 'mobx-react';

// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';
import './index.scss';

interface IselectData {
  id: number,
  position: {
    [propsName: string]: any,
  },
  style: {
    [propsName: string]: any,
  },
  type: string,
}

interface Istates {
}

interface Iprops {
  store?: any,
  scaleValue: number,
}

/**
 * 文字组件两个点, 左右
 * 图片组件四个角
 */

@inject('store')
@observer
class ResizeBox extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public dragObj = {
    able: false,
    clientX: 0,
    clientY: 0,
    type: '',
  }

  constructor(props: Iprops) {
    super(props);
    document.body.addEventListener('mousemove', this.handleMouseMove);
    document.body.addEventListener('mouseup', this.handleMouseUp)

  }

  public handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target: HTMLDivElement = e.target as HTMLDivElement;
    e.stopPropagation();
    e.preventDefault();
    switch (target.dataset.type) {
      case 'left':
        this.dragObj.able = true;
        this.dragObj.clientX = e.clientX;
        this.dragObj.type = 'left';
        break;
      case 'right':
        this.dragObj.able = true;
        this.dragObj.clientX = e.clientX;
        this.dragObj.type = 'right';
        break;
      case 'down':
        this.dragObj.able = true;
        this.dragObj.clientY = e.clientY;
        this.dragObj.type = 'down';
        break;
      case 'top':
        this.dragObj.able = true;
        this.dragObj.clientY = e.clientY;
        this.dragObj.type = 'top';
        break;
      case 'top-left':
        this.dragObj.able = true;
        this.dragObj.clientX = e.clientX;
        this.dragObj.clientY = e.clientY;
        this.dragObj.type = 'top-left';
        break;
      case 'top-right':
        this.dragObj.able = true;
        this.dragObj.clientX = e.clientX;
        this.dragObj.clientY = e.clientY;
        this.dragObj.type = 'top-right';
        break;
      case 'bottom-left':
        this.dragObj.able = true;
        this.dragObj.clientX = e.clientX;
        this.dragObj.clientY = e.clientY;
        this.dragObj.type = 'bottom-left';
        break;
      case 'bottom-right':
        this.dragObj.able = true;
        this.dragObj.clientX = e.clientX;
        this.dragObj.clientY = e.clientY;
        this.dragObj.type = 'bottom-right';
        break;
      default:
        break;
    }
    return;

  }

  public handleMouseUp = (e: MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    this.dragObj = {
      able: false,
      clientX: 0,
      clientY: 0,
      type: '',
    }
  }

  /**
   * 鼠标移动
   */
  public handleMouseMove = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!this.dragObj.able) { return }
    const { selectData, data } = this.props.store;
    const { scaleValue } = this.props;
    const { info } = data;
    const result = info.element.find((e: any): boolean => {
      return e.id === selectData.id
    })
    const left: number = parseInt(selectData.position.left.slice(0, -2), 10) + (e.clientX - this.dragObj.clientX);
    let width: number = 0;
    const top: number = parseInt(selectData.position.top.slice(0, -2), 10) + (e.clientY - this.dragObj.clientY);;
    let height: number = 0;
    let newSelectData: IselectData = {
      ...selectData
    }
    switch (this.dragObj.type) {
      case 'left':
        width = parseInt(selectData.style.width.slice(0, -2), 10) - (e.clientX - this.dragObj.clientX);
        this.dragObj.clientX = e.clientX;
        newSelectData = {
          id: selectData.id,
          position: {
            ...selectData.position,
            left: `${left}px`,
          },
          style: {
            ...selectData.style,
            width: `${width}px`,
          },
          type: selectData.type,
        }
        result.position.left = `${left / scaleValue}px`;
        result.style.width = `${width / scaleValue}px`;
        break;
      case 'right':
        width = parseInt(selectData.style.width.slice(0, -2), 10) + (e.clientX - this.dragObj.clientX);
        this.dragObj.clientX = e.clientX;
        newSelectData = {
          id: selectData.id,
          position: {
            ...selectData.position,
          },
          style: {
            ...selectData.style,
            width: `${width}px`,
          },
          type: selectData.type,
        }
        result.style.width = `${width / scaleValue}px`;
        break;
      case 'top':
        height = parseInt(selectData.style.height.slice(0, -2), 10) - (e.clientY - this.dragObj.clientY);
        this.dragObj.clientY = e.clientY;
        newSelectData = {
          id: selectData.id,
          position: {
            ...selectData.position,
            top: `${top}px`,
          },
          style: {
            ...selectData.style,
            height: `${height}px`,
          },
          type: selectData.type,
        }
        result.position.top = `${top / scaleValue}px`;
        result.style.height = `${height / scaleValue}px`;
        break;
      case 'down':
        height = parseInt(selectData.style.height.slice(0, -2), 10) + (e.clientY - this.dragObj.clientY);
        this.dragObj.clientY = e.clientY;
        newSelectData = {
          id: selectData.id,
          position: {
            ...selectData.position,
          },
          style: {
            ...selectData.style,
            height: `${height}px`,
          },
          type: selectData.type,
        }
        result.style.height = `${height / scaleValue}px`;
        break;
      case 'top-left':
        width = parseInt(selectData.style.width.slice(0, -2), 10) - (e.clientX - this.dragObj.clientX);
        height = parseInt(selectData.style.height.slice(0, -2), 10) - (e.clientY - this.dragObj.clientY);
        this.dragObj.clientY = e.clientY;
        this.dragObj.clientX = e.clientX;
        newSelectData = {
          id: selectData.id,
          position: {
            ...selectData.position,
            left: `${left}px`,
            top: `${top}px`,
          },
          style: {
            ...selectData.style,
            height: `${height}px`,
            width: `${width}px`,
          },
          type: selectData.type,
        }
        result.position.left = `${left / scaleValue}px`;
        result.style.width = `${width / scaleValue}px`;
        result.position.top = `${top / scaleValue}px`;
        result.style.height = `${height / scaleValue}px`;
        break;
      case 'top-right':
        width = parseInt(selectData.style.width.slice(0, -2), 10) + (e.clientX - this.dragObj.clientX);
        height = parseInt(selectData.style.height.slice(0, -2), 10) - (e.clientY - this.dragObj.clientY);
        this.dragObj.clientY = e.clientY;
        this.dragObj.clientX = e.clientX;
        newSelectData = {
          id: selectData.id,
          position: {
            ...selectData.position,
            top: `${top}px`,
          },
          style: {
            ...selectData.style,
            height: `${height}px`,
            width: `${width}px`,
          },
          type: selectData.type,
        }
        result.style.width = `${width / scaleValue}px`;
        result.position.top = `${top / scaleValue}px`;
        result.style.height = `${height / scaleValue}px`;
        break;
      case 'bottom-left':
        width = parseInt(selectData.style.width.slice(0, -2), 10) - (e.clientX - this.dragObj.clientX);
        height = parseInt(selectData.style.height.slice(0, -2), 10) + (e.clientY - this.dragObj.clientY);
        this.dragObj.clientY = e.clientY;
        this.dragObj.clientX = e.clientX;
        newSelectData = {
          id: selectData.id,
          position: {
            ...selectData.position,
            left: `${left}px`,
          },
          style: {
            ...selectData.style,
            height: `${height}px`,
            width: `${width}px`,
          },
          type: selectData.type,
        }
        result.position.left = `${left / scaleValue}px`;
        result.style.width = `${width / scaleValue}px`;
        result.style.height = `${height / scaleValue}px`;
        break;
      case 'bottom-right':
        width = parseInt(selectData.style.width.slice(0, -2), 10) + (e.clientX - this.dragObj.clientX);
        height = parseInt(selectData.style.height.slice(0, -2), 10) + (e.clientY - this.dragObj.clientY);
        this.dragObj.clientY = e.clientY;
        this.dragObj.clientX = e.clientX;
        newSelectData = {
          id: selectData.id,
          position: {
            ...selectData.position,
          },
          style: {
            ...selectData.style,
            height: `${height}px`,
            width: `${width}px`,
          },
          type: selectData.type,
        }
        result.style.width = `${width / scaleValue}px`;
        result.style.height = `${height / scaleValue}px`;
        break;
      default:
        return;
    }
    this.actionChangeSelectAndData(newSelectData, info);

  }

  public actionChangeSelectAndData = (selectData: any, info: any) => {
    this.props.store.setSelectData(selectData);
    this.props.store.setDesignData(info);
  }

  public render() {
    const { selectData } = this.props.store;
    const {  } = this.state;

    return (
      <div className="resize-box-wrapper" style={selectData.id !== -1 ? { ...selectData.position, width: selectData.style.width, height: selectData.style.height, zIndex: parseInt(selectData.position.zIndex, 10)}: {display: 'none'}}>
        <div className="bar horizon-left" >
          <div className="circle" data-type='left' onMouseDown={this.handleMouseDown} />
        </div>
        <div className="bar horizon-right">
          <div className="circle" data-type='right' onMouseDown={this.handleMouseDown} />
        </div>
        <div className="bar horizon-down">
          <div className="circle" data-type='down' onMouseDown={this.handleMouseDown} />
        </div>
        <div className="bar horizon-top">
          <div className="circle" data-type='top' onMouseDown={this.handleMouseDown} />
        </div>
        <div className="bar horizon-top-left">
          <div className="circle" data-type='top-left' onMouseDown={this.handleMouseDown} />
        </div>
        <div className="bar horizon-top-right">
          <div className="circle" data-type='top-right' onMouseDown={this.handleMouseDown} />
        </div>
        <div className="bar horizon-bottom-left">
          <div className="circle" data-type='bottom-left' onMouseDown={this.handleMouseDown} />
        </div>
        <div className="bar horizon-bottom-right">
          <div className="circle" data-type='bottom-right' onMouseDown={this.handleMouseDown} />
        </div>
      </div>
    );
  }
}

export default ResizeBox;
