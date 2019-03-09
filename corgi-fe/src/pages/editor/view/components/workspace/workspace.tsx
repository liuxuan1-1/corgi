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
  },
  scale: {
    workspaceBoxCssFix: {
      width?: string,
      height?: string,
    },
    workspaceCssFix: {
      transform?: string,
    },
  },
}

class Workspace extends React.Component<Iprops, Istates> {
  public state: Istates = {
    data: {
      a: 1,
    }
  }

  constructor(props: Iprops) {
    super(props);
  }


  public render() {
    // const { data } = this.state;
    const { info, scale } = this.props;
    // console.log(info);
    return (
      <div className="workspace-wrapper" style={{...scale.workspaceBoxCssFix}}>
        <div className="workspace" style={{...info.root.css, ...scale.workspaceCssFix}}>
          123
        </div>
      </div>
    );
  }
}

export default Workspace;
