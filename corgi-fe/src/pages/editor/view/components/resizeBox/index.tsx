import * as React from 'react';
import { inject, observer } from 'mobx-react';

// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';
import './index.scss';


interface Istates {
}

interface Iprops {
  store?: any,
}

/**
 * 文字组件两个点, 左右
 * 图片组件四个角
 */

@inject('store')
@observer
class ResizeBox extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public render() {
    const { selectData } = this.props.store;
    const {  } = this.state;
    return (
      <div className="resize-box-wrapper" style={{ ...selectData.position, width: selectData.style.width, height: selectData.style.height, zIndex: parseInt(selectData.position.zIndex, 10) - 1}}>
        <>
        </>
      </div>
    );
  }
}

export default ResizeBox;
