import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
class App extends Component {
  state = {};
  render() {
    return (
      <div className='App'>
        <Navbar title='Efd-Risit' />
      </div>
    );
  }
}

export default App;
