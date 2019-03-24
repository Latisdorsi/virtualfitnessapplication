import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Accounts from './components/Accounts';
import AccountForm from './components/AccountForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Sidebar />

            <Navbar />
            <Route path="/account" exact component={Accounts} />
            <Route path="/account/create" exact component={AccountForm} />
            <Route path="/exercise/" exact component={AccountForm} />
            <Route path="/exercise/create" exact component={AccountForm} />
        </div>
      </Router>
    );
  }
}

export default App;
