import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from './model';
import registerServiceWorker from '../registerServiceWorker';

import App from './view/router/home/app';
import Account from './view/router/account/index'
import './index.scss';


ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <>
        <Route exact={true} path="/" component={App} />
        <Route exact={true} path="/account" component={Account} />
      </>
    </Provider>
  </HashRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
