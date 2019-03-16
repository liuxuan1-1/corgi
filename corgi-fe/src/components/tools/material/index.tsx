import * as React from 'react';
import { Menu, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';

import Material from './material';
import Mine from './mine';
import './index.scss';



interface Istates {
  menuCurrent: string,
}

interface Iprops {
  materialSpecial: {
    [propName: string]: any,
  },
  callbackChangeMaterial: (e: {
    type: string,
    target: string,
  }) => void
}

class MaterialPanel extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
    menuCurrent: 'material'
  }

  public handleMenuClick = (e: ClickParam): void => {
    this.setState({
      menuCurrent: e.key,
    });
  }

  public render() {
    const { materialSpecial, callbackChangeMaterial } = this.props;
    const { menuCurrent } = this.state;

    return (
      <div className="panel-material-wrapper">
        <Menu
          onClick={this.handleMenuClick}
          selectedKeys={[menuCurrent]}
          mode="horizontal"
        >
          <Menu.Item key="material">
            <Icon type="appstore" />素材
          </Menu.Item>
          <Menu.Item key="mine">
            <Icon type="file" />我的文件
          </Menu.Item>
        </Menu>

        {
          menuCurrent === 'material' ? (
            <Material materialSpecial={materialSpecial} callbackChangeMaterial={callbackChangeMaterial} />
          ) : null
        }
        {
          menuCurrent === 'mine' ? (
            <Mine />
          ) : null
        }
      </div>
    );
  }
}

export default MaterialPanel;
