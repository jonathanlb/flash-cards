import * as React from 'react';
import './App.css';
import { Card, CardProps } from './Card';

export interface AppProps {
  path: string;
};

export interface AppState {
  cards: CardProps[];
};

/**
 * Flash card application.
 */
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    ['advanceCard', 'discard'].
      forEach(m => this[m] = this[m].bind(this));

    const cards = [
        { front: 'hello', back: 'ciao' },
        { front: 'I have', back: 'Io ho' }
      ];
    this.state = { cards };
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
}

export default App;
