import * as Debug from 'debug';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Select from 'react-select';

const debug = Debug('FileSelector');
// const errors = Debug('FileSelector:errors');

function FileSelector(prompt: string, selectorDivId: string): (dirPath: string, entries: string[]) => Promise<string> {
	return (dirPath: string, entries: string[]) => {
		debug('selecting from', dirPath, entries);

		function getSelectorDiv() {
			return document.getElementById(selectorDivId) as HTMLElement;
		}

		return new Promise<string>((resolve, reject) => {
			const options = entries.map(e => {
				return { value: `${dirPath}/${e}`, label: e }
			});
			const selectedOption = [options[0]];

			function handleChange(selected: any) {
				debug('handleChange', selected);
				ReactDOM.render(
					<div />,
					getSelectorDiv());
				resolve(selected.value);
			}

			ReactDOM.render(
				<div>
					<h2>{prompt}</h2>
					<Select
						value={ selectedOption }
						onChange={ handleChange }
						options={ options } />
				</div>,
				getSelectorDiv());
		});
	};
}

export default FileSelector;
