import React, { Component } from 'react';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Registration />
        <Login />
      </div>
    );
  }
}

export default App;