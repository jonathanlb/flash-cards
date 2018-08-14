import * as Debug from 'debug';
import * as React from 'react';
import './App.css';
import { Card, CardProps } from './Card';
import flashImage from './flash.png';

// import * as Switch from 'react-switch'; // test OK, build fails, no constructor
import Switch from 'react-switch'; // build OK, test fails, Element type is invalid, exp string or class/function, got undefined.
// import { default as Switch } from 'react-switch'; // build OK, test fails

const debug = Debug('App');
// const errors = Debug('App:errors');

export interface AppProps {
	cardsPromise: Promise<[string, CardProps[]]>;
};

export interface AppState {
  cards: CardProps[];
  showFlipped: boolean;
	title: string;
};


/**
 * Flash card application.
 */
class App extends React.Component<AppProps, AppState> {
	private _ismounted: boolean;

  constructor(props: AppProps) {
    super(props);
    ['advanceCard', 'discard', 'handleSideSwitch', 'setCards'].
      forEach(m => this[m] = this[m].bind(this));
		this.state = { cards: [], showFlipped: false, title: '' };

		// Dummy sample cards.
		this.setCards('Sample Cards', 
			[ { front: 'hello', back: 'ciao', initFlipped: this.state.showFlipped },
        { front: 'I have', back: 'Io ho', initFlipped: this.state.showFlipped }
      ]);
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

  public handleSideSwitch(checked: boolean) {
    debug('handleSideSwitch', checked);
    this.setState(
		  Object.assign(this.state, { showFlipped: checked }));
  }

  public render() {
    const topCard = this.state.cards[0] || { front: '???', back: '!!!' };
    debug('render', this.state);
    return (
      <div>
        <header className="header" >
          <img src={ flashImage } className="headerImage" />
          <h1>Flash Cards: { this.state.title }</h1>
        </header>
      	<Card front={ topCard.front } back={ topCard.back } initFlipped={ this.state.showFlipped } />
        <table className="controlsTable" ><tbody>
          <tr>
				    <td><button className="button" onClick={ this.advanceCard } >Advance</button>
            </td>
            <td><label htmlFor="side-switch">
              <Switch
                onChange={ this.handleSideSwitch } 
                checked={ this.state.showFlipped } 
                offColor="#87cefa"
                onColor="#c7cefa"
                height={15}
                width={40}
                id="side-switch" />
              </label>
            </td>
				    <td><button className="button" onClick={ this.discard } >Discard</button>
            </td>
          </tr>
        </tbody></table>
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
