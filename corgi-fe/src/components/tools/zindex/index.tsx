import * as React from 'react';
// import { Icon } from 'antd';
import { action } from 'mobx';

import './index.scss';
// import { ClickParam } from 'antd/lib/menu';


interface Istates {
}

interface Iprops {
  data: {
    element: any[],
  },
  callbackChangeSelectData: (e: any) => void,
  callbackChangeStore: (e: any) => void,
  scaleValue: number,
  selectData: {
    [propName: string]: any,
  },
}

class ZindexPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public drogId: string = '';
  public drogOverId: string = '';

  public handleDrog = (e: React.DragEvent): void => {
    const target: HTMLDivElement = e.currentTarget as HTMLDivElement;
    if (target.dataset.id) {
      this.drogId = target.dataset.id;
    }
  }

  public handleDrogOver = (e: React.DragEvent): void => {
    const target: HTMLDivElement = e.currentTarget as HTMLDivElement;
    if (target.dataset.id) {
      this.drogOverId = target.dataset.id;
    }
  }

  @action
  public handleDrogEnd = (e: React.DragEvent): void => {
    e.preventDefault();
    const { data, callbackChangeStore } = this.props;
    // const target: HTMLDivElement = e.currentTarget as HTMLDivElement;
    let start: any = {};
    let startIndex: number = 0;
    let end: any = {};
    let endIndex: number = 0;
    data.element.forEach((item, index): void => {
      if (item.id === this.drogId) {
        start = item;
        startIndex = index;
      }
      if (item.id === this.drogOverId) {
        end = item;
        endIndex = index;
      }
    })
    if (startIndex === endIndex) { return }

    start.position.zIndex = end.position.zIndex;
    if (startIndex > endIndex) {
      for (let i = endIndex; i < startIndex; i++) {
        data.element[i].position.zIndex += 1;
      }
    } else {
      for (let i = endIndex; i > startIndex; i--) {
        data.element[i].position.zIndex -= 1;
      }
    }

    data.element.splice(endIndex, 0, data.element.splice(startIndex, 1)[0]);
    callbackChangeStore(data);
  }

  public handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    const { callbackChangeSelectData, data, scaleValue } = this.props;
    const target: HTMLDivElement = e.currentTarget as HTMLDivElement;
    const result = data.element.find((item: any): boolean => {
      return item.id === target.dataset.id
    })
    callbackChangeSelectData({
      id: result.id,
      position: {
        ...result.position,
        left: `${parseInt(result.position.left.slice(0, -2), 10) * scaleValue}px`,
        top: `${parseInt(result.position.top.slice(0, -2), 10) * scaleValue}px`,
      },
      style: {
        height: `${parseInt(result.style.height.slice(0, -2), 10) * scaleValue}px`,
        width: `${parseInt(result.style.width.slice(0, -2), 10) * scaleValue}px`,
      },
      type: result.type,
    });

  }

  public render() {
    const { data, selectData } = this.props;
    return (
      <div className="panel-zindex-wrapper">
        {
          data.element.map((e) => {
            return (
              <div
                className={`zindex-item ${selectData.id === e.id ? 'zindex-item-select' : ''}`}
                key={e.id}
                data-id={e.id}
                draggable={true}
                onDrag={this.handleDrog}
                onDragOver={this.handleDrogOver}
                onDragEnd={this.handleDrogEnd}
                onClick={this.handleClick}
              >
                <span className="item-left">{e.id}</span>
                <div className="item-right" />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default ZindexPanel;
