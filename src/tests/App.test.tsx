import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../App';
import { AppProps, AppState } from '../App';
import { CardProps } from '../Card';

function testCards() {
	return [
		{ front: 'a mouse', back: 'un topo' },
		{ front: 'an elephant', back: 'un elefante' },
		{ front: 'a lion', back: 'un leone' }
	];
}

it('advances cards', async () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(
		<App cardsPromise={ Promise.resolve(['Test Cards', testCards()] as [string, CardProps[]]) } />, 
		div) as React.Component<AppProps, AppState>;
	await component.props.cardsPromise;

	const topCard = component.state.cards[0];
	expect(topCard).toBeDefined();
	expect(component.state.cards.length).toEqual(testCards().length);

	component.advanceCard();
	const newTopCard = component.state.cards[0];
	expect(newTopCard).toBeDefined();
	expect(topCard).not.toEqual(newTopCard);

  ReactDOM.unmountComponentAtNode(div);
});

it('removes cards', async () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(
		<App cardsPromise={ Promise.resolve(['Test Cards', testCards()] as [string, CardProps[]]) } />, 
		div) as React.Component<AppProps, AppState>;
	await component.props.cardsPromise;

	const topCard = component.state.cards[0];
	expect(topCard).toBeDefined();
	expect(component.state.cards.length).toEqual(testCards().length);

	component.discard();
	expect(component.state.cards.length).toEqual(testCards().length - 1);
	const newTopCard = component.state.cards[0];
	expect(newTopCard).toBeDefined();
	expect(topCard).not.toEqual(newTopCard);

  ReactDOM.unmountComponentAtNode(div);
});


it('renders empty deck', async () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(
		<App cardsPromise={ Promise.resolve(['Test Card', []] as [string, CardProps[]]) } />, 
		div) as React.Component<AppProps, AppState>;
	expect(div.innerHTML).toContain('Sample Cards');

	await component.props.cardsPromise;

	expect(div.innerHTML).toContain('Test Card');
  ReactDOM.unmountComponentAtNode(div);
});

it('renders example', async () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(
		<App cardsPromise={ Promise.resolve(['Test Cards', testCards()] as [string, CardProps[]]) } />, 
		div) as React.Component<AppProps, AppState>;
	expect(div.innerHTML).toContain('Sample Cards');

	await component.props.cardsPromise;

	expect(div.innerHTML).toContain('Test Cards');
  ReactDOM.unmountComponentAtNode(div);
});
