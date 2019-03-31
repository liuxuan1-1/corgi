import * as React from 'react';
import { Form, Select, InputNumber, Icon } from 'antd';
import ColorCom from '../../../../../components/tools/background/index';

// import { ClickParam } from 'antd/lib/menu';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';

const Option = Select.Option;

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

class FontPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  private serialize = {
    bold: false,
    center: false,
    color: '#000000',
    family: '',
    italic: false,
    left: false,
    right: false,
    size: 70,
    underline: false,
  };

  public computedData = () => {
    const { data } = this.props;
    // bold => 400 normal  => 700 bold
    // italic => italic , normal
    // underline => underline, none
    this.serialize = {
      bold: data.style.fontWeight === 700,
      center: data.style.textAlign === 'center',
      color: data.style.color,
      family: data.style.fontFamily,
      italic: data.style.fontStyle === 'italic',
      left: data.style.textAlign === 'left',
      right: data.style.textAlign === 'right',
      size: parseInt(data.style.fontSize.slice(0, -2), 10),
      underline: data.style.textDecoration === 'underline',
    }
  }

  public handleTypeChange = (e: string) => {
    const { data, callbackChangeStore } = this.props;
    data.style.fontFamily = e;
    callbackChangeStore();
  }

  public handleLargeChange = (e: number) => {
    const { data, callbackChangeStore } = this.props;
    if (e >= 1 && e <= 200) {
      data.style.fontSize = `${e}px`;
      callbackChangeStore();
    }
  }

  public handleColorChange = (e: string) => {
    const { data, callbackChangeStore } = this.props;
    data.style.color = e;
    callbackChangeStore();
  }

  public handleTypeClick = (e: React.MouseEvent): void => {
    const { data, callbackChangeStore } = this.props;
    const target: HTMLDivElement = e.currentTarget as HTMLDivElement;
    switch (target.dataset.type) {
      case 'bold':
        this.serialize.bold ? data.style.fontWeight = 400 : data.style.fontWeight = 700
        break;
      case 'italic':
        this.serialize.italic ? data.style.fontStyle = 'normal' : data.style.fontStyle = 'italic'
        break;
      case 'underline':
        this.serialize.underline ? data.style.textDecoration = 'none' : data.style.textDecoration = 'underline'
        break;
      case 'left':
        if(!this.serialize.left) { data.style.textAlign = 'left'; }
        break;
      case 'center':
        if (!this.serialize.center) { data.style.textAlign = 'center'; }
        break;
      case 'right':
        if (!this.serialize.right) { data.style.textAlign = 'right'; }
        break;
      default:
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
            label="字体"
          >
            <Select value={this.serialize.family} style={{ fontFamily: this.serialize.family }} onChange={this.handleTypeChange}>
              <Option value="font1" style={{ fontFamily: 'font1' }}>可可喵公主</Option>
              <Option value="font2" style={{ fontFamily: 'font2' }}>方正楷体</Option>
              <Option value="font3" style={{ fontFamily: 'font3' }}>名列前茅</Option>
              <Option value="font4" style={{ fontFamily: 'font4' }}>百变马丁</Option>
              <Option value="font5" style={{ fontFamily: 'font5' }}>小白</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="大小"
          >
            <InputNumber min={1} max={200} style={{ width: '100%' }} value={this.serialize.size} onChange={this.handleLargeChange} />
          </Form.Item>
          <Form.Item
            label="颜色"
          >
            <ColorCom color={this.serialize.color} callbackChange={this.handleColorChange} noCircle={true}  />
          </Form.Item>
          <Form.Item>
              <div className="font-type-row">
                <div className={`type-btn ${this.serialize.bold ? 'type-select' : ''}`} data-type="bold" onClick={this.handleTypeClick} >
                  <Icon type="bold" />
                </div>
                <div className={`type-btn ${this.serialize.italic ? 'type-select' : ''}`} data-type="italic" onClick={this.handleTypeClick} >
                  <Icon type="italic" />
                </div>
                <div className={`type-btn ${this.serialize.underline ? 'type-select' : ''}`} data-type="underline" onClick={this.handleTypeClick} >
                  <Icon type="underline" />
                </div>
              </div>
              <div className="font-type-row">
                <div className={`type-btn ${this.serialize.left ? 'type-select' : ''}`} data-type="left" onClick={this.handleTypeClick} >
                  <Icon type="align-left" />
                </div>
                <div className={`type-btn ${this.serialize.center ? 'type-select' : ''}`} data-type="center" onClick={this.handleTypeClick} >
                  <Icon type="align-center" />
                </div>
                <div className={`type-btn ${this.serialize.right ? 'type-select' : ''}`} data-type="right" onClick={this.handleTypeClick} >
                  <Icon type="align-right" />
                </div>
              </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default FontPanel;
