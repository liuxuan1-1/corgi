import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from './model';
import registerServiceWorker from '../registerServiceWorker';

import App from './view/router/home/app';
import './index.scss';

document.title = '平面设计系统';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <>
        <Route exact={true} path="/" component={App} />
        <Route exact={true} path="/account" component={App} />
        <Route exact={true} path="/template" component={App} />
        <Route exact={true} path="/mine" component={App} />
        <Route exact={true} path="/about" component={App} />
      </>
    </Provider>
  </HashRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
