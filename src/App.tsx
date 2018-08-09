// import * as Debug from 'debug';
import * as React from 'react';
import './App.css';
import { Card, CardProps } from './Card';

// const debug = Debug('App');
// const errors = Debug('App:errors');


export interface AppProps {
	cardsPromise: Promise<CardProps[]>;
};

export interface AppState {
  cards: CardProps[];
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

		// Dummy sample cards.
    const cards = [
        { front: 'hello', back: 'ciao' },
        { front: 'I have', back: 'Io ho' }
      ];
    this.state = { cards };

		props.cardsPromise.then(loadedCards => this.setCards(loadedCards));
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

	public componentDidMount() {
		this._ismounted = true;
	}

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
    const topCard = this.state.cards[0];
    return (
      <div>
        <h1>Hello</h1>
      	<Card front={topCard.front} back={topCard.back} />
				<button onClick={this.advanceCard} >Advance</button>
				<button onClick={this.discard} >Discard</button>
      </div>
    );
  }

	public setCards(cards: CardProps[]) {
		const newState = Object.assign(this.state, { cards });

		// avoid errors in unit tests with undef errors checking mount, or setting unmounted state.
		if (this._ismounted) {
			this.setState(newState);
		} else {
			this.state = newState;
		}
	}

}

export default App;
