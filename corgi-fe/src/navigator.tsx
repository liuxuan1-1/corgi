import * as React from 'react';
import * as ReactDOM from 'react-dom';
import navigatorJson from './navigator.json';

class App extends React.PureComponent {
  public render () {
    return (
      <ul>
        {
          navigatorJson.map((value, key) => (
            <li key={key}>
              <a href={`./${value}.html`}>{value}</a>
            </li>
          ))
        }
      </ul>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
