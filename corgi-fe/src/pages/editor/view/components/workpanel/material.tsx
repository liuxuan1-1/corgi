import * as React from 'react';
import { Form, InputNumber } from 'antd';
import ColorCom from '../../../../../components/tools/background/index';

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
  callbackChangeStore: () => void
}

class MaterialPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  private serialize = {
    color: '#1890ff',
    size: 100,
  };

  public computedData = () => {
    const { data } = this.props;
    const regScale = /\((\d*\.*\d*)\)$/;
    if (data.extends.childStyle.transform) {
      const result: number = parseFloat(data.extends.childStyle.transform.match(regScale)[1]);
      this.serialize.size = Math.ceil(result * 100);
    }
    switch (data.extends.eleId) {
      case 'triangle-up':
        if (data.extends.childStyle.borderBottom) {
          this.serialize.color = data.extends.childStyle.borderBottom.split(' ')[2];
        }
        break;
      default:
        this.serialize.color = data.extends.childStyle.background;
        break;
    }

  }

  public handleLargeChange = (e: number) => {
    const { data, callbackChangeStore } = this.props;
    data.extends.childStyle.transform = `translate(-50%, -50%) scale(${e / 100})`;
    callbackChangeStore();
  }

  public handleColorChange = (e: string) => {
    const { data, callbackChangeStore } = this.props;
    switch (data.extends.eleId) {
      case 'triangle-up':
        data.extends.childStyle.borderBottom = `100px solid ${e}`;
        break;
    
      default:
        data.extends.childStyle.background = e;
        break;
    }
    callbackChangeStore();
  }


  public render() {
    this.computedData()
    return (
      <div className="font-panel-wrapper">
        <Form>
          <Form.Item
            label="大小"
          >
            <InputNumber min={1} style={{ width: '100%' }} value={this.serialize.size} onChange={this.handleLargeChange} />
          </Form.Item>
          <Form.Item
            label="颜色"
          >
            <ColorCom color={this.serialize.color} callbackChange={this.handleColorChange} noCircle={true} />
          </Form.Item>

        </Form>
      </div>
    );
  }
}

export default MaterialPanel;
