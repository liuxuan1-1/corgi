import * as React from 'react';
// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';

import './index.scss';

interface Istates {
  data: {
    [propsName: string]: any
  }
}

interface Iprops {
  info: {
    [propsName: string]: any
  }
}

class Workspace extends React.Component<Iprops, Istates> {
  public state: Istates = {
    data: {
      a: 1,
    }
  }


  public render() {
    // const { data } = this.state;
    const { info } = this.props;
    // console.log(info);
    return (
      <div className="workspace-wrapper">
        <div className="workspace" style={{...info.root.css}}>
          123
        </div>
      </div>
    );
  }
}

export default Workspace;
