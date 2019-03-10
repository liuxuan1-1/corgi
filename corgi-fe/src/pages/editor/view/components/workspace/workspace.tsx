import * as React from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

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
  callbackChangeStore: (e: any) => void
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

  public renderElements = (): React.ReactNodeArray => {
    const { info, scale } = this.props;
    const result: React.ReactNodeArray = [];
    info.element.forEach((e: any): void => {
      let child: React.ReactNode | React.ReactNodeArray | null = null;
      switch (e.type) {
        case 'font':
          child = (
            <div key={`${e.id}child`} data-id={e.id} style={{...e.style}}>
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
        <div className="workspace" style={{...info.root.css, ...scale.workspaceCssFix}}>
          {this.renderElements()}
        </div>
      </div>
    );
  }
}

export default Workspace;
