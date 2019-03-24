import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ManagerAccounts from './components/ManagerAccounts';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h2>MERN-Stack Todo App</h2>
          <Route path="/" exact component={ManagerAccounts} />
        </div>
      </Router>
    );
  }
}

export default App;
