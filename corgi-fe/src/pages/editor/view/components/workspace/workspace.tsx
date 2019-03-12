import * as React from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import ResizeBox from '../resizeBox/index';

// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';

import './index.scss';

interface Istates {
  data: {
    [propsName: string]: any
  }
}

interface Iprops {
  info: {
    [propsName: string]: any
  },
  scale: {
    workspaceBoxCssFix: {
      width?: string,
      height?: string,
    },
    workspaceCssFix: {
      transform?: string,
    },
    scaleValue: number,
  },
  selectData: {
    id: number,
    position: {
      [propName: string]: any,
    },
    style: {
      [propName: string]: any,
    },
    type: string,
  },
  callbackChangeStore: (e: any) => void,
  callbackChangeSelectStore: (e: any) => void,
}

class Workspace extends React.Component<Iprops, Istates> {
  public state: Istates = {
    data: {
      a: 1,
    }
  }

  constructor(props: Iprops) {
    super(props);
  }

  /**
   * 拖动停止修正组件top, left位置
   */
  public handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const { info, callbackChangeStore } = this.props;

    if (e.target) {
      const targetEle: HTMLDivElement = e.target as HTMLDivElement;
      const id = targetEle.dataset.id;
      const result = info.element.find((e: any) => {
        if (id) {
          return e.id === parseInt(id, 10);
        }
        return false;
      })
      result.position.left = `${parseInt(result.position.left.slice(0, -2), 10) + data.x}px`
      result.position.top = `${parseInt(result.position.top.slice(0, -2), 10) + data.y}px`
      callbackChangeStore(info);
    }
  }

  /**
   * 组件点击事件
   */
  public handleComClick = (e: React.MouseEvent): void => {
    const { info, callbackChangeSelectStore } = this.props;
    const target: HTMLDivElement = e.target as HTMLDivElement;
    const result = info.element.find((e: any): boolean => {
      if (target.dataset.id) {
        return e.id === parseInt(target.dataset.id, 10)
      }
      return false;
    })
    callbackChangeSelectStore({
      id: result.id,
      position: {
        ...result.position,
      },
      style: {
        height: result.style.height,
        width: result.style.width,
      },
      type: result.type,
    });
  }

  /**
   * 拖动事件
   */
  public handleDraging = (e: DraggableEvent, data: DraggableData ): void => {
    const { selectData, callbackChangeSelectStore } = this.props;
    const result = JSON.parse(JSON.stringify(selectData));
    if (result.position.left) {
      result.position.transform = `translate(${data.x}px, ${data.y}px)`
      callbackChangeSelectStore(result);
    }
  }

  /**
   * 根据数据生成组件
   */
  public renderElements = (): React.ReactNodeArray => {
    const { info, scale } = this.props;
    const result: React.ReactNodeArray = [];
    info.element.forEach((e: any): void => {
      let child: React.ReactNode | React.ReactNodeArray | null = null;
      switch (e.type) {
        case 'font':
          child = (
            <div key={`${e.id}child`} data-id={e.id} style={{...e.style}} onMouseDown={this.handleComClick}>
              双击编辑文字
            </div>
          )
          break;
      
        default:
          break;
      }
      const box = (
        <Draggable
          position={{
            x: 0,
            y: 0,
          }}
          key={`${e.id}drag`}
          scale={scale.scaleValue}
          onStop={this.handleDragStop}
          onDrag={this.handleDraging}
        >
          <div key={`${e.id}box`} style={{ ...e.position }}>
            {child}
          </div>
        </Draggable>
      )
      result.push(box);
      return;
    })
    return result;
  }


  public render() {
    // const { data } = this.state;
    const { info, scale } = this.props;
    // console.log(info);
    return (
      <div className="workspace-wrapper" style={{...scale.workspaceBoxCssFix}}>
        <div className="workspace" style={{ ...info.root.css, ...scale.workspaceCssFix }}>
          {this.renderElements()}
          <ResizeBox />
        </div>
      </div>
    );
  }
}

export default Workspace;
