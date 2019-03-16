import * as React from 'react';
import { inject, observer } from 'mobx-react';

// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';

import FontPanel from './font';
import MaterialPanel from './material';
import './index.scss';

interface Istates {
}

interface Iprops {
  store?: any,
}

@inject('store')
@observer
class WorkPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  /**
   * 更改store design数据的回调函数
   */
  public callbackChangeStore = (): void => {
    const { info } = this.props.store.data;
    this.props.store.setDesignData({
      info,
    });
  }

  public renderBody = () => {
    const { info } = this.props.store.data;
    const { selectData } = this.props.store;
    const result = info.element.find((e: any) => {
      return selectData.id === e.id;
    })
    switch (selectData.type) {
      case 'font':
        return (
          <FontPanel
            data={result}
            callbackChangeStore={this.callbackChangeStore}
          />
        );
      case 'material':
        return (
          <MaterialPanel
            data={result}
            callbackChangeStore={this.callbackChangeStore}
          />
        );
      default:
        return null;
    }
  }

  public render() {

    return (
      <div className="workspace-panel-wrapper">
        {this.renderBody()}
      </div>
    );
  }
}

export default WorkPanel;
