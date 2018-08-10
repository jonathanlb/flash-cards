import { CardProps } from './Card';

import * as Debug from 'debug';

const debug = Debug('CardLoader');
const errors = Debug('CardLoader:errors');

const dummyCard: CardProps = {
	back: 'back',
	front: 'front'
};

/**
 * Stub for selecting a file within a directory -- just return the first.
 */
function selectFirst(dirPath: string, entries: string[]): Promise<string> {
	return Promise.resolve(`${dirPath}/${entries[0]}`);
}

class CardLoader {
	private path: string;
	private selectEntry: (dirPath: string, entries: string[]) => Promise<string>;

	constructor(path: string, selectEntry = selectFirst) {
		this.path = path;
		this.selectEntry = selectEntry;
	}	

	/**
	 * Promise to return a title and the cards selected from the directory.
	 */
	public async loadDirectory(dirPath: string) : Promise<[string, CardProps[]]> {
		debug('loadDirectory', dirPath);
		return fetch(dirPath).
			then(response => response.text()).
			then(content => this.scrapeDirectoryText(content)).
			then(entries => this.selectEntry(dirPath, entries)).
			then(entry => this.loadFile(entry));
	}

	/**
	 * Promise to return a title and the cards selected from a file.
	 */
	public async loadFile(filePath: string) : Promise<[string, CardProps[]]> {
		const title = this.titleFromFileName(filePath);
		return fetch(filePath).
			then(response => response.json()).
			catch(error => {
				errors('fetch file', error)
				return [];
			}).
			then(json => {
				if (typeof json === 'undefined') {
					return [`${title} (empty)`, [dummyCard]];
				} else {
					return [title, json];
				}
			}) as Promise<[string, CardProps[]]>;
	}

	/**
	 * Load the cards, returing a promise to the array of loaded cards.
	 */
	public async run(path = this.path) {
		debug('loading from', path);
		if (this.path.endsWith('.json')) {
			return this.loadFile(path);
		} else {
			return this.loadDirectory(path);
		}
	}

	/**
	 * Return the files from an HTML directory listing.
	 */
	public scrapeDirectoryText(htmlContent: string): string[] {
		// Sometimes quotes are backslashed....
		const tokens = htmlContent.match(/href=\\?"[^"]*"/g);
		if (!tokens) {
			return [];
		} else {
			return tokens.map(href => 
				href.replace(/[^"]*"/, '').replace(/\\?"$/, ''));
		}
	}

	private titleFromFileName(fileName: string): string {
		return fileName.replace(/.*\//, '').
			replace(/\.json$/, '').
			replace(/_/g, ' ');
	}
}

export default CardLoader;
