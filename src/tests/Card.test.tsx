import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Card } from '../Card';

it('flips the card', () => {
  const div = document.createElement('div');
  const card = ReactDOM.render(<Card front="hi" back="ciao" />, div) as any;
  card.flip();
  expect(div.innerHTML).not.toContain('hi');
  expect(div.innerHTML).toContain('ciao');
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the front of the card by default', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Card front="hi" back="ciao" />, div);
  expect(div.innerHTML).toContain('hi');
  expect(div.innerHTML).not.toContain('ciao');
  ReactDOM.unmountComponentAtNode(div);
});
