import CardLoader from '../CardLoader';

// https://github.com/jefflau/jest-fetch-mock/issues/82
const fetchAny = fetch as any;

const directory = '\
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">\
<html>\
<head>\
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\
<title>Directory listing for /cards/</title>\
</head>\
<body>\
<h1>Directory listing for /cards/</h1>\
<hr>\
<ul>\
<li><a href="Basic_Italian.json">Basic_Italian.json</a></li>\
<li><a href="Fancy_Italian.json">Fancy_Italian.json</a></li>\
</ul>\
<hr>\
</body>\
</html>\
';

const twoCards = [
	{ front: 'hi', back: 'ciao' },
	{ front: 'not', back: 'non' }
];

describe('CardLoader tests', () => {
	beforeEach(() => {
		fetchAny.resetMocks();
	});

	it('can instantiate without triggering IO', () => {
		const loader = new CardLoader('XXX not a file name XXX');
		expect(loader).toBeDefined();
	});

	it('can load from a file', async () => {
		fetchAny.mockResponseOnce(JSON.stringify(twoCards));
		const loader = new CardLoader('cards/mock_test.json');
		const loaded = await loader.run();
		expect(loaded).toEqual(['mock test', twoCards]);
	});

	it('can load from a directory', async () => {
		fetchAny.mockResponseOnce(JSON.stringify(directory)).
			mockResponseOnce(JSON.stringify(twoCards));

		const loader = new CardLoader('/cards/');
		const loaded = await loader.run();
		expect(loaded).toEqual(['Basic Italian', twoCards]);
	});

	it('can return from empty directory', () => {
		const loader = new CardLoader('XXX not a file name XXX');
		const entries = loader.scrapeDirectoryText(
			directory.replace(/<li>.*<\/li>/g, ''));
		expect(entries).toEqual([]);
	});

	it('can scrape directory contents', () => {
		const loader = new CardLoader('XXX not a file name XXX');
		const entries = loader.scrapeDirectoryText(directory);
		expect(entries).toEqual(['Basic_Italian.json', 'Fancy_Italian.json']);
	});
});
