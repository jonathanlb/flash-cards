// import * as Debug from 'debug';
import * as React from 'react';
import './App.css';
import { Card, CardProps } from './Card';

// const debug = Debug('App');
// const errors = Debug('App:errors');

export interface AppProps {
	cardsPromise: Promise<[string, CardProps[]]>;
};

export interface AppState {
  cards: CardProps[];
	title: string;
};


/**
 * Flash card application.
 */
class App extends React.Component<AppProps, AppState> {
	private _ismounted: boolean;

  constructor(props: AppProps) {
    super(props);
    ['advanceCard', 'discard', 'setCards'].
      forEach(m => this[m] = this[m].bind(this));
		this.state = { cards: [], title: '' };

		// Dummy sample cards.
		this.setCards('Sample Cards', 
			[{ front: 'hello', back: 'ciao' }, { front: 'I have', back: 'Io ho' }]);
		props.cardsPromise.then(loadedCards => this.setCards(loadedCards[0], loadedCards[1]));
  }

	/**
	 * Put the top card on the bottom and redraw.
	 */
  public advanceCard() {
		const cards = this.state.cards;
		if (cards.length > 1) {
			cards.push(cards.shift() as CardProps);
		}
		this.setState(this.state);
  }

	/**
	 * Track that we mounted for setState() testing.
	 */
	public componentDidMount() {
		this._ismounted = true;
	}

	/**
	 * Track that we mounted for setState() testing.
	 */
	public componentWillUnmount() {
		this._ismounted = false;
	}

	/**
	 * Remove a card from the deck and redraw, alerting with completion message
	 * if we attempt to discard our last card.
	 */
  public discard() {
		const cards = this.state.cards;
		if (cards.length > 1) {
			cards.shift();
			this.setState(this.state);
		} else {
			alert('All done!');
		}
  }  

  public render() {
    const topCard = this.state.cards[0] || { front: '???', back: '!!!' };
    return (
      <div>
        <h1>Flash Cards: { this.state.title }</h1>
      	<Card front={ topCard.front } back={ topCard.back } />
				<button onClick={ this.advanceCard } >Advance</button>
				<button onClick={ this.discard } >Discard</button>
      </div>
    );
  }

	public setCards(title: string, cards: CardProps[]) {
		const newState = Object.assign(this.state, { cards, title });

		// avoid errors in unit tests with undef errors checking mount, or setting unmounted state.
		if (this._ismounted) {
			this.setState(newState);
		} else {
			this.state = newState;
		}
	}

}

export default App;
