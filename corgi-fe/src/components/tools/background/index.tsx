import * as React from 'react';
import { ChromePicker, CirclePicker } from 'react-color';
import './index.scss';
// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';


interface Istates {
}

interface Iprops {
  callbackChange: (e: any) => void,
  color: string,
  noCircle?: boolean,
}

class BackgroundPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  /**
   * 颜色改变事件
   */
  public handleColorChange = (e: any):void => {
    this.props.callbackChange(e.hex);
  }

  public render() {
    const { color, noCircle } = this.props;
    return (
      <div className="panel-background-wrapper">
        <ChromePicker color={color} disableAlpha={true} onChangeComplete={this.handleColorChange} />
        {
          !noCircle ? <CirclePicker color={color} onChangeComplete={this.handleColorChange} /> : null
        }
      </div>
    );
  }
}

export default BackgroundPanel;
