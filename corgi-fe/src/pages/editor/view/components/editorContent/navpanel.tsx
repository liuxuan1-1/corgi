import * as React from 'react';
// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
import BackgroundPanel from '../../../../../components/tools/background';

// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';


interface Istates {
}

interface Iprops {
  menuCurrent: string,
  callbackChangeStore: (e: any) => void,
  data: any,
}

class NavPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public callbackChangeBackground = (e: any): void => {
    const { data, callbackChangeStore } = this.props;
    if (data.root && data.root.css) {
      data.root.css.background = e;
      callbackChangeStore(data);
    }
  }

  public renderNavPanel = (): React.ReactNode => {
    const { menuCurrent } = this.props;
    switch (menuCurrent) {
      case 'background':
        return <BackgroundPanel callbackChange={this.callbackChangeBackground} />
      case 'font':
      case 'material':
      default:
        return null;
    }

  }

  public render() {
    return (
      <div className="nav-panel-wrapper">
        {this.renderNavPanel()}
      </div>
    );
  }
}

export default NavPanel;
