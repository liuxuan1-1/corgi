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
    }
  }

  constructor(props: Iprops) {
    super(props);
  }

  /**
   * 拖动停止修正组件top, left位置
   */
  public handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const { info, callbackChangeStore, callbackChangeSelectStore, scale } = this.props;
    if (e.target) {
      const targetEle: HTMLDivElement = e.target as HTMLDivElement;
      const id = targetEle.dataset.id;
      const result = info.element.find((e: any) => {
        if (id) {
          return e.id === parseInt(id, 10);
        }
        return false;
      })
      const leftNumber: number = parseInt(result.position.left.slice(0, -2), 10);
      const topNumber: number = parseInt(result.position.top.slice(0, -2), 10);
      result.position.left = `${leftNumber + data.x}px`
      result.position.top = `${topNumber + data.y}px`
      callbackChangeStore(info);
      callbackChangeSelectStore({
        id: result.id,
        position: {
          ...result.position,
          left: `${(leftNumber + data.x) * scale.scaleValue}px`,
          top: `${(topNumber + data.y) * scale.scaleValue}px`,
        },
        style: {
          height: `${parseInt(result.style.height.slice(0, -2), 10) * scale.scaleValue}px`,
          width: `${parseInt(result.style.width.slice(0, -2), 10) * scale.scaleValue}px`,
        },
        type: result.type,
      });
    }
  }

  /**
   * 组件点击事件
   */
  public handleComClick = (e: React.MouseEvent): void => {    
    const { info, callbackChangeSelectStore, scale } = this.props;
    const target: HTMLDivElement = e.currentTarget as HTMLDivElement;
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
        left: `${parseInt(result.position.left.slice(0, -2), 10) * scale.scaleValue}px`,
        top: `${parseInt(result.position.top.slice(0, -2), 10) * scale.scaleValue}px`,
      },
      style: {
        height: `${parseInt(result.style.height.slice(0, -2), 10) * scale.scaleValue}px`, 
        width: `${parseInt(result.style.width.slice(0, -2), 10) * scale.scaleValue}px`,
      },
      type: result.type,
    });
  }

  /**
   * 拖动事件
   */
  public handleDraging = (e: DraggableEvent, data: DraggableData ): void => {
    const { selectData, callbackChangeSelectStore, scale } = this.props;
    const result = JSON.parse(JSON.stringify(selectData));
    if (result.position.left) {
      result.position.transform = `translate(${data.x * scale.scaleValue}px, ${data.y * scale.scaleValue}px)`
      callbackChangeSelectStore(result);
    }
  }

  public handleFontdbClick = (e: React.MouseEvent): void => {
    const target: HTMLDivElement = e.currentTarget as HTMLDivElement;
    console.log(target);
  }

  public handleasd = (e: React.FocusEvent) => {
    console.log(e)
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
            <div key={`${e.id}child`} data-id={e.id} style={{ ...e.style }} onMouseDown={this.handleComClick} onDoubleClick={this.handleFontdbClick} contentEditable={true} onBlur={this.handleasd} suppressContentEditableWarning={true}>
              {e.extends.content}
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
          // tslint:disable-next-line: jsx-no-lambda 刘翾
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
        </div>
        <ResizeBox scaleValue={scale.scaleValue} />
      </div>
    );
  }
}

export default Workspace;
