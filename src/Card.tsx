import * as Debug from 'debug';
import * as React from 'react';
import './Card.css';

const debug = Debug('Card');
// const errors = Debug('Card:errors');

export interface CardProps {
  back: string;
  front: string;
  initFlipped: boolean;
}

export interface CardState {
  flipped: boolean;
}

export class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      flipped: props.initFlipped
    };
    debug('constructor', props, this.state);

    const methodNames = [
      'getCssClassName', 'flip', 'shouldShowFront',
      'touchEnd', 'touchMove', 'touchStart'];
    methodNames.forEach(m => this[m] = this[m].bind(this)); 
  }

  /**
   * Reset state flipped to match the initial property value.
   */
  public componentWillReceiveProps(nextProps: CardProps) {
    debug('receiving props', this.props, nextProps, this.state);
    if (this.state.flipped !== nextProps.initFlipped) {
      this.flip();
    }
  }

  public getCssClassName() {
    if (this.shouldShowFront()) {
      return "flashcard front";
    } else {
      return "flashcard back";
    }
  }

  public flip() {
    debug('flip');
    this.setState(
      Object.assign(this.state, { flipped: !this.state.flipped } ));
  }

  public render() {
    const content = this.shouldShowFront() ?
      this.props.front :
      this.props.back;

    return <div className={this.getCssClassName()}
			onClick={this.flip}
			onTouchEnd={this.touchEnd}
			onTouchMove={this.touchMove}
			onTouchStart={this.touchStart} 
      dangerouslySetInnerHTML={{ __html: content }} />
  }

  public shouldShowFront() {
    return !this.state.flipped;
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
