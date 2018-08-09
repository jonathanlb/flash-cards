import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../App';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<App cardsPromise={ Promise.resolve([]) } />, div);
  ReactDOM.unmountComponentAtNode(div);
});
