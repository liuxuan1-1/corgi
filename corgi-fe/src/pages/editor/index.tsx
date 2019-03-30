import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from './model';
import registerServiceWorker from '../registerServiceWorker';
import App from './view/App';
import './index.scss';

document.title = '平面编辑';

ReactDOM.render(
  <HashRouter>
    <Route exact={true} path="/">
        <Provider store={store}>
          <App />
        </Provider>
    </Route>
  </HashRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
