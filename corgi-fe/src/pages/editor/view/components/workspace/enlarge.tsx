import * as React from 'react';
import { Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';


interface Istates {

}

interface Iprops {
  callbackAutoScale: () => void,
  callbackComputedScale: (value: number) => void,
  scaleValue: number,
}

class Enlarge extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  /**
   * 自动适应画布
   */
  public handleClickAutoArea = () => {
    this.props.callbackAutoScale();
  }

  public handleClickAreaPlus = ():void => {
    this.props.callbackComputedScale(0.1);
  }

  public handleClickAreaMinus = (): void => {
    this.props.callbackComputedScale(-0.1);
  }

  public render() {
    const { scaleValue } = this.props;
    return (
      <div className="enlarge-wrapper">
        <div className="scale-area">
          <Icon type="plus" onClick={this.handleClickAreaPlus} />
          <span className="scale-value">{(scaleValue*100).toFixed(0)}%</span>
          <Icon type="minus" onClick={this.handleClickAreaMinus} />
        </div>
        <div className="auto-area">
          <Icon type="gateway" onClick={this.handleClickAutoArea} />
        </div>
      </div>
    );
  }
}

export default Enlarge;
