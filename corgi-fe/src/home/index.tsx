import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from './model';
import registerServiceWorker from '../registerServiceWorker';
import App from './view/App';
import './index.scss';

ReactDOM.render(
  <HashRouter>
    <Route exact={true} path="/">
      <React.StrictMode>
        <Provider store={store}>
          <App name="123" />
        </Provider>
      </React.StrictMode>
    </Route>
  </HashRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
