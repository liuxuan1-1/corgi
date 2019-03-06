import * as React from 'react';
// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';


interface Istates {
}

interface Iprops {
  menuCurrent: string,
}

class NavPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public render() {
    const { menuCurrent } = this.props;
    return (
      <div className="nav-panel-wrapper">
        {menuCurrent}
      </div>
    );
  }
}

export default NavPanel;
