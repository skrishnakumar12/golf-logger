import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar/>
          <p>
            Work in progress!
        </p>
        </header>
      </div>
    );
  }
}

export default App;
