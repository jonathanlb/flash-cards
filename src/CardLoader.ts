import { CardProps } from './Card';

import * as Debug from 'debug';

const debug = Debug('CardLoader');
const errors = Debug('CardLoader:errors');

class CardLoader {
	private path: string;

	constructor(path: string) {
		this.path = path;
	}	

	public async loadDirectory(dirPath: string) : Promise<CardProps[]> {
		return fetch(dirPath).
			then(response => response.text()).
			then(content => this.scrapeDirectoryText(content)).
			then(entries => this.selectEntry(dirPath, entries)).
			then(entry => this.loadFile(entry));
	}

	public async loadFile(filePath: string) : Promise<CardProps[]> {
		return fetch(filePath).
			then(response => response.json()).
			then(json => {
				if (typeof json === 'undefined') {
					return [];
				} else {
					return json;
				}
			}).
			catch(error => errors('fetch file', error));
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

	public scrapeDirectoryText(htmlContent: string): string[] {
		const tokens = htmlContent.match(/href="[^"]*"/g);
		if (!tokens) {
			return [];
		} else {
			return tokens.map(href => 
				href.replace(/^href="/, '').replace(/"$/, ''));
		}
	}

	public selectEntry(dirPath: string, entries: string[]): string {
		return `${dirPath}/${entries[0]}`;
	}

}

export default CardLoader;
