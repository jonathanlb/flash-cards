import * as Debug from 'debug';
import * as React from 'react';
import './Card.css';

const debug = Debug('App');
// const errors = Debug('App:errors');


export interface CardProps {
  front: string;
  back: string;
}

export interface CardState {
  showFront: boolean;
}

export class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      showFront: true
    };

    const methodNames = [
      'getCssClassName', 'flip', 'touchEnd', 'touchMove', 'touchStart'];
    methodNames.forEach(m => this[m] = this[m].bind(this)); 
  }

  public getCssClassName() {
    if (this.state.showFront) {
      return "flashcard front";
    } else {
      return "flashcard back";
    }
  }

  public flip() {
    debug('flip');
    this.setState(
      Object.assign(this.state, { showFront: !this.state.showFront } ));
  }

  public render() {

    return <div className={this.getCssClassName()}
			onClick={this.flip}
			onTouchEnd={this.touchEnd}
			onTouchMove={this.touchMove}
			onTouchStart={this.touchStart} >
			{ this.state.showFront ? this.props.front : this.props.back }
      </div>
  }

  public touchEnd(event: React.FormEvent<EventTarget>) {
    debug('touchEnd', event);
  }

  public touchMove(event: React.FormEvent<EventTarget>) {
    debug('touchMove', event);
  }

  public touchStart(event: React.FormEvent<EventTarget>) {
    debug('touchStart', event);
  }
}
