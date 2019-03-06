import * as React from 'react';
import { inject, observer } from 'mobx-react';

// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';
import Workspace from './workspace';
import WorkPanel from './workpanel';
import './index.scss';

interface Istates {
}

interface Iprops {
  store?: any,
}

@inject('store')
@observer
class EditorRight extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public render() {
    const { info } = this.props.store.data;
    return (
      <div className="editor-right">
        <div className="editor-workspace">
          <Workspace info={info} />
        </div>
        <div className="editor-workspace-panel">
          <WorkPanel />
        </div>
      </div>
    );
  }
}

export default EditorRight;
