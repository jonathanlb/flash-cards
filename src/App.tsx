import * as React from 'react';
import './App.css';
import { Card } from './Card';

class App extends React.Component {
  public render() {
    return (
      <div>
        <h1>Hello</h1>
	<Card front="hello" back="ciao" />
      </div>
    );
  }
}

export default App;
