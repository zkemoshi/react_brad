import './App.css';
import React, { Component } from 'react';

class App extends Component {
  state = {};
  render() {
    const name = 'John Doe';
    const loading = true;
    const showName = true;

    return (
      <div className='App'>
        <h1>My App</h1>
        {loading ? <h1>Hello {showName && name}</h1> : <h4>Loading</h4>}
      </div>
    );
  }
}

export default App;
