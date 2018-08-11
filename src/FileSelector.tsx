import * as Debug from 'debug';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Select from 'react-select';

const debug = Debug('FileSelector');
// const errors = Debug('FileSelector:errors');

/**
 * Default rendering function for use in the browser.  The cut point this fills
 * uses an alternate render function for unit tests since ReactDOM in the unit
 * tests doesn't update document.body.
 */
function defaultRender(elt: React.ReactElement<any>, containerDivId: string) {
	const containerElt = document.getElementById(containerDivId) as HTMLElement;
  return ReactDOM.render(elt, containerElt);
}

/**
 * A factory to create a discrete choice selector for files.
 * @param prompt The title string used to prompt selection.
 * @param selectorDivId The id of the div into to render the selector.
 *  The div contents will be overwritten when the selector is in use and
 *  cleared after.
 * @return A factory method to be called with the dirctory path and the
 *  entries within the directory from which to choose.
 */
function FileSelector(prompt: string, selectorDivId: string, render = defaultRender): (dirPath: string, entries: string[]) => Promise<string> {
	return (dirPath: string, entries: string[]) => {
		debug('selecting from', dirPath, entries);

		return new Promise<string>((resolve, reject) => {
			const options = entries.map(e => {
				return { value: `${dirPath}/${e}`, label: e }
			});
			const selectedOption = [options[0]];

			function handleChange(selected: any) {
				debug('handleChange', selected);
        render(<div />, selectorDivId);
				resolve(selected.value);
			}

      render(
        <div>
					<h2>{prompt}</h2>
					<Select
						value={ selectedOption }
						onChange={ handleChange }
						options={ options } />
				</div>,
        selectorDivId);
		});
	};
}

export default FileSelector;
