import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import CardLoader from './CardLoader';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const cardLoader = new CardLoader('/cards/Basic_Italian.json');
ReactDOM.render(
  <App cardsPromise={ cardLoader.run() } />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
