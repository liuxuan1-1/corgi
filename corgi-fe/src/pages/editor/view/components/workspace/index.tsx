import * as React from 'react';
import { inject, observer } from 'mobx-react';
import _throttle from 'lodash.throttle';

// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';
import Workspace from './workspace';
import WorkPanel from './workpanel';
import Enlarge from './enlarge';
import './index.scss';


interface Istates {
  scale: {
    workspaceBoxCssFix: {
      width?: string,
      height?: string,
      transform?: string,
    },
    workspaceCssFix: {
      transform?: string,
    },
  },
  scaleValue: number,
  translateY: number,
}

interface Iprops {
  store?: any,
}

let firstLoad = true;

@inject('store')
@observer
class EditorRight extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
    scale: {
      workspaceBoxCssFix: {},
      workspaceCssFix: {},
    },
    scaleValue: 1,
    translateY: 0,
  }
  public editorBox: React.RefObject<HTMLDivElement> = React.createRef();
  public editorClientHeight: number = 0;
  public needScroll: boolean = false;

  public componentDidMount () {
    if (this.editorBox.current) {
      this.editorClientHeight = this.editorBox.current.clientHeight;
    }
  }

  public componentDidUpdate() {
    if (firstLoad) {
      firstLoad = false;
      this.computedAutoScale();
    }
  }

  /**
   * 自动适应屏幕大小
   */
  public computedAutoScale = ():void => {
    const { info } = this.props.store.data;
    const { scale } = this.state;
    // width * height
    const workspaceSize: string[] = info.root.size.split('*');
    const scaleValue = (this.editorClientHeight - 100) / parseInt(workspaceSize[1], 10)

    scale.workspaceCssFix.transform = `scale(${scaleValue})`;
    scale.workspaceBoxCssFix = {
      height: `${parseInt(workspaceSize[1], 10) * scaleValue}px`
    }
    this.setState({
      scale,
      scaleValue
    })
  }

  /**
   * 手动更改缩放大小
   * @param value 更改大小
   */
  public computedScale = (value: number): void => {
    const { scale } = this.state;
    const { info } = this.props.store.data;
    const scaleValue = this.state.scaleValue + value;
    scale.workspaceCssFix.transform = `scale(${scaleValue})`;

    const workspaceSize: string[] = info.root.size.split('*');
    const workBoxHeight: number = parseInt(workspaceSize[1], 10) * scaleValue;
    scale.workspaceBoxCssFix = {
      height: `${workBoxHeight}px`
    }

    workBoxHeight > (this.editorClientHeight - 100) ? this.needScroll = true : this.needScroll = false

    this.setState({
      scale,
      scaleValue
    })
  }

  /**
   * workspace的虚拟滚动, 隐藏滚动条
   */
  public handleWorkspaceScroll = (e: React.WheelEvent): void => {
    e.stopPropagation();
    if (this.needScroll) {
      const { scale, translateY } = this.state;
      if (e.deltaY > 0) {
        // 向下滑
        if (translateY === 0) { return; }
        scale.workspaceBoxCssFix.transform = `translateY(${translateY + 100}px)`
        this.setState({
          scale,
          translateY: translateY + 100,
        })
      } else if (e.deltaY < 0) {
        // 向上滑
        if (scale.workspaceBoxCssFix.height) {
          const workspaceHeight = scale.workspaceBoxCssFix.height.slice(0, -2);
          if (parseInt(workspaceHeight, 10) + translateY < this.editorClientHeight) {
            return;
          }
        }
        scale.workspaceBoxCssFix.transform = `translateY(${translateY - 100}px)`
        this.setState({
          scale,
          translateY: translateY - 100,
        })
      }
    }
  }

  /**
   * 更改store数据的回调函数
   */
  public callbackChangeStore = (e: any): void => {
    this.props.store.setDesignData({
      info: e
    });
  }

  public render() {
    const { info } = this.props.store.data;
    const { scale, scaleValue } = this.state;
    return (
      <div className="editor-right">
        <div className="editor-workspace" ref={this.editorBox} onWheel={this.handleWorkspaceScroll}>
          <Workspace info={{ ...info }} scale={{ ...scale, scaleValue }} callbackChangeStore={this.callbackChangeStore} />
          <Enlarge callbackAutoScale={this.computedAutoScale} scaleValue={scaleValue} callbackComputedScale={this.computedScale} />
        </div>
        <div className="editor-workspace-panel">
          <WorkPanel />
        </div>
      </div>
    );
  }
}

export default EditorRight;
