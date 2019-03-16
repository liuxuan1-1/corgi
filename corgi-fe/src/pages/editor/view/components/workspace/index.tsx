import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Workspace from './workspace';
import WorkPanel from '../workpanel/index';
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

  constructor(props: Iprops) {
    super(props);
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.keyCode === 46) {
        props.store.setDeleteSelectData()
      }
    })
  }

  public componentDidMount () {
    if (this.editorBox.current) {
      this.editorClientHeight = this.editorBox.current.clientHeight;
    }
  }

  public componentDidUpdate() {
    const { changeFilepx } = this.props.store;
    if (firstLoad) {
      firstLoad = false;
      this.computedAutoScale();
    }

    if (changeFilepx) {
      this.computedScale(0);
      this.props.store.setChangeFilepx(false);
    }
  }

  /**
   * 拖动框适应屏幕的放大与缩小
   */
  public computedReszieBox = (scaleValue: number): void => {
    const { info } = this.props.store.data;
    const { selectData } = this.props.store;
    if (selectData.id !== -1) {
      const result = info.element.find((e: any): boolean => {
        return e.id === selectData.id
      })
      this.callbackChangeSelectStore({
        id: selectData.id,
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
      height: `${parseInt(workspaceSize[1], 10) * scaleValue}px`,
      width: `${parseInt(workspaceSize[0], 10) * scaleValue}px`,
    }

    this.computedReszieBox(scaleValue);
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
      height: `${workBoxHeight}px`,
      width: `${parseInt(workspaceSize[0], 10) * scaleValue}px`,
    }

    workBoxHeight > (this.editorClientHeight - 100) ? this.needScroll = true : this.needScroll = false

    this.computedReszieBox(scaleValue);

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
        if (scale.workspaceBoxCssFix.height) {
          const workspaceHeight = scale.workspaceBoxCssFix.height.slice(0, -2);
          if (this.editorClientHeight + translateY > parseInt(workspaceHeight, 10)) {
            return;
          }
        }
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
   * 其他区域点击, 取消resizebox
   */
  public handleClickEditorSpace = (e: any): void => {
    const target: HTMLDivElement = e.target as HTMLDivElement;
    if (target.dataset.id === "null") {
      this.callbackChangeSelectStore({
        id: -1,
        position: {
          zIndex: 1,
        },
        style: {},
        type: '',
      });
    }
  }

  /**
   * 更改store design数据的回调函数
   */
  public callbackChangeStore = (e: any): void => {
    this.props.store.setDesignData({
      info: e
    });
  }
  

  /**
   * 点击了哪个组件
   */
  public callbackChangeSelectStore = (e: any): void => {
    this.props.store.setSelectData(e);
  }

  public render() {
    const { info } = this.props.store.data;
    const { selectData } = this.props.store;
    const { scale, scaleValue } = this.state;

    return (
      <div className="editor-right">
        <div className="editor-workspace" data-id="null" ref={this.editorBox} onWheel={this.handleWorkspaceScroll} onMouseDown={this.handleClickEditorSpace}>
          <Workspace
            info={{ ...info }}
            scale={{ ...scale, scaleValue }}
            selectData={{ ...selectData}}
            callbackChangeStore={this.callbackChangeStore}
            callbackChangeSelectStore={this.callbackChangeSelectStore}
          />
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
