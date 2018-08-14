import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Card } from '../Card';

it('flips the card', () => {
  const div = document.createElement('div');
  const card = ReactDOM.render(
    <Card front="hi" back="ciao" initFlipped={ false } />,
    div) as any;
  card.flip();
  expect(div.innerHTML).not.toContain('hi');
  expect(div.innerHTML).toContain('ciao');
  ReactDOM.unmountComponentAtNode(div);
});

it('flips the card when initFlipped property change', () => {
  const div = document.createElement('div');
  const card = ReactDOM.render(
    <Card front="hi" back="ciao" initFlipped={ false } />,
    div) as any;
  card.componentWillReceiveProps({
    back: 'ciao', front: 'hi', initFlipped :true 
  });
  expect(div.innerHTML).not.toContain('hi');
  expect(div.innerHTML).toContain('ciao');

  card.flip();
  expect(div.innerHTML).toContain('hi');
  expect(div.innerHTML).not.toContain('ciao');

  ReactDOM.unmountComponentAtNode(div);
});

it('renders the front of the card', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Card front="hi" back="ciao" initFlipped={ false } />,
    div);
  expect(div.innerHTML).toContain('hi');
  expect(div.innerHTML).not.toContain('ciao');
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the back of the card', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Card front="hi" back="ciao" initFlipped={ true } />,
    div);
  expect(div.innerHTML).not.toContain('hi');
  expect(div.innerHTML).toContain('ciao');
  ReactDOM.unmountComponentAtNode(div);
});
