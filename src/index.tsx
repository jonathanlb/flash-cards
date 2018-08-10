import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Select from 'react-select';
import App from './App';
import CardLoader from './CardLoader';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

function selectEntry(dirPath: string, entries: string[]): Promise<string> {
	return new Promise((resolve, reject) => {
		const options = entries.map(e => {
			return { value: `${dirPath}/${e}`, label: e }
		});
		const selectedOption = [options[0]];

		function handleChange(selected: any) {
			ReactDOM.render(
				<div />,
				document.getElementById('fileSelector') as HTMLElement
			);
			resolve(selected.value);
		}

		ReactDOM.render(
			<div>
				<h2>Select a Card Deck</h2>
				<Select
					value={ selectedOption }
					onChange={ handleChange }
					options={ options } />
			</div>,
  		document.getElementById('fileSelector') as HTMLElement);
	});
}

const cardLoader = new CardLoader('/cards/', selectEntry);
ReactDOM.render(
	<div>
		<div id="fileSelector" />
  	<App cardsPromise={ cardLoader.run() } />
	</div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
