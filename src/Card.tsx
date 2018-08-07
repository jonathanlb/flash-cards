import * as React from 'react';
import './Card.css';

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

    const methodNames = ['flip', 'touchEnd', 'touchMove', 'touchStart'];
    methodNames.forEach(m => this[m] = this[m].bind(this)); 
  }

  public flip(event: React.FormEvent<EventTarget>) {
    console.log('click', event);
    this.setState(
      Object.assign(this.state, { showFront: !this.state.showFront } ));
  }

  public render() {

    return <div className="flashcard"
    	onClick={this.flip}
	onTouchEnd={this.touchEnd}
	onTouchMove={this.touchMove}
	onTouchStart={this.touchStart} >
        { this.state.showFront ? this.props.front : this.props.back }
      </div>
  }

  public touchEnd(event: React.FormEvent<EventTarget>) {
    console.log('touchEnd', event);
  }

  public touchMove(event: React.FormEvent<EventTarget>) {
    console.log('touchMove', event);
  }

  public touchStart(event: React.FormEvent<EventTarget>) {
    console.log('touchStart', event);
  }
}
