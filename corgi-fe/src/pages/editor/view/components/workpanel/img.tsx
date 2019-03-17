import * as React from 'react';
import { action } from 'mobx';
import { Form, InputNumber } from 'antd';

interface Istates {
}

interface Iprops {
  data: {
    extends: {
      [propsName: string]: any,
    },
    id: number,
    position: {
      [propsName: string]: any,
    },
    style: {
      [propsName: string]: any,
    },
    type: string,
  },
  callbackChangeStore: () => void,
  selectData: any,
}

class ImgPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  private serialize = {
    height: 1,
    scaleHeight: 1,
    scaleWidth: 1,
    width: 1,
  };

  public computedData = () => {
    const { data, selectData } = this.props;
    this.serialize = {
      height: parseInt(data.style.height.slice(0, -2), 10),
      scaleHeight: parseInt(data.style.height.slice(0, -2), 10) / parseInt(selectData.style.height.slice(0, -2), 10),
      scaleWidth: parseInt(data.style.width.slice(0, -2), 10) / parseInt(selectData.style.width.slice(0, -2), 10),
      width: parseInt(data.style.width.slice(0, -2), 10),
    }
  }

  @action
  public handleWidthChange = (e: number) => {
    const { data, callbackChangeStore, selectData } = this.props;
    const scale = this.serialize.scaleHeight
    data.style.width = `${e}px`;
    selectData.style.width = `${e / scale}px`;
    callbackChangeStore();
  }

  @action
  public handleHeightChange = (e: number) => {
    const { data, callbackChangeStore, selectData } = this.props;
    const scale = this.serialize.scaleWidth
    data.style.height = `${e}px`;
    selectData.style.height = `${e / scale}px`;
    callbackChangeStore();
  }



  public render() {
    this.computedData()
    return (
      <div className="font-panel-wrapper">
        <Form>
          <Form.Item
            label="宽度"
          >
            <InputNumber min={1} style={{ width: '100%' }} value={this.serialize.width} onChange={this.handleWidthChange} />
          </Form.Item>
          <Form.Item
            label="高度"
          >
            <InputNumber min={1} style={{ width: '100%' }} value={this.serialize.height} onChange={this.handleHeightChange} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ImgPanel;
