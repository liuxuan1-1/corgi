import * as React from 'react';
import { ChromePicker, CirclePicker } from 'react-color';
import './index.scss';
// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';


interface Istates {
  color: string,
}

interface Iprops {
  callbackChange: (e: any) => void
}

class BackgroundPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
    color: '#ffffff',
  }

  /**
   * 颜色改变事件
   */
  public handleColorChange = (e: any):void => {
    this.setState({
      color: e.hex,
    }, ():void => {
      this.props.callbackChange(e.hex);
    })
  }

  public render() {
    const { } = this.props;
    const { color } = this.state;
    return (
      <div className="panel-background-wrapper">
        <ChromePicker color={color} disableAlpha={true} onChangeComplete={this.handleColorChange} />
        <CirclePicker color={color} onChangeComplete={this.handleColorChange} />
      </div>
    );
  }
}

export default BackgroundPanel;
