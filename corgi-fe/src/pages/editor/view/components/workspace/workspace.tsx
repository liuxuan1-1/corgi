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

  constructor(props: Iprops) {
    super(props);
    this.conputedInfoCss('constructor');
  }

  public conputedInfoCss = (mount: string): void => {
    const { info = {} } = this.props;
    const result: {
      [propName: string]: any
    } = {};
    if (info.root && info.root.css) {
      result.root = {
        ...info.root.css
      };
    }

    if (mount === 'constructor') {
      this.state.data = result;
    }
    // this.setState((preState) => {
    //   return {
    //     data: {
    //       ...preState.data,
    //       ...result,
    //     }
    //   }
    // });
  }

  public render() {
    const { data } = this.state;
    // const { info } = this.props;
    console.log(data);
    return (
      <div className="workspace-wrapper">
        <div className="workspace" style={data.root}>
          123
        </div>
      </div>
    );
  }
}

export default Workspace;
