import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import CardLoader from './CardLoader';
import FileSelector from './FileSelector';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const selectorId = 'fileSelector';
const cardLoader = new CardLoader(
	'/cards/',
	FileSelector('Select a card deck', selectorId));

ReactDOM.render(
	<div>
		<div id={ selectorId } />
  	<App cardsPromise={ cardLoader.run() } />
	</div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
