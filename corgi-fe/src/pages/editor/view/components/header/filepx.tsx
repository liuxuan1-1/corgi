import * as React from 'react';
import { InputNumber } from 'antd';


interface Istates {
}

interface Iprops {
  disabled: boolean,
  data: any,
  callbackFilePXChange: (e: {
    x?: number,
    y?: number
  }) => void
}


class FilePX extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public handleChangeX = (value: number):void => {
    this.props.callbackFilePXChange({
      x: value,
    })
  }

  public handleChangeY = (value: number): void => {
    this.props.callbackFilePXChange({
      y: value,
    })
  }

  public render() {
    const { disabled, data } = this.props;
    // const { x, y } = this.state;
    let x = 640;
    let y = 1008;
    if (data.size) {
      const result = data.size.split('*');
      x = result[0];
      y = result[1];
    }

    return (
      <div className="file-px-wrapper">
        <InputNumber min={0} value={x} onChange={this.handleChangeX} size="small" disabled={disabled} />
        x
        <InputNumber min={0} value={y} onChange={this.handleChangeY} size="small" disabled={disabled} />
        像素
      </div>
    );
  }
}

export default FilePX;
