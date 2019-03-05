import * as React from 'react';
// import { Layout, Button, Input, message } from 'antd';
import { inject, observer } from 'mobx-react';
// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';
import './index.scss';


interface Istates {
}

interface Iprops {
  store?: any,
}

@inject('store')
@observer
class EditorContent extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public render() {
    return (
      <div className="editor-content-wrapper">
        <div className="editor-nav">
          123
        </div>
        <div className="editor-nav-panel">
          456
        </div>
        <div className="editor-right">
          <div className="editor-workspace">
            789
          </div>
          <div className="editor-workspace-panel">
            /*-
          </div>
        </div>
      </div>
    );
  }
}

export default EditorContent;
