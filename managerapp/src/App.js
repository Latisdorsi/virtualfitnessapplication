import React, { Component } from 'react';
import { render } from 'react-dom';

import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Accounts from './components/Accounts';
import AccountCreatePage from './components/AccountCreatePage';
import AccountUpdateForm from './components/AccountUpdateForm';

import Exercises from './components/Exercises/Exercises';
import ExerciseCreateForm from './components/Exercises/ExerciseCreateForm';
import ExerciseUpdateForm from './components/Exercises/ExerciseUpdateForm';


class App extends Component {
  constructor(props) {
    super(props)

    this.state ={
      avatarURL: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: ''
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:3000/account/detail/5c9a0cfaa6eebe3c3474480c')
      .then(response => {
        console.log(response.data)
        this.setState({
          avatarURL: response.data.avatarURL,
          email: response.data.email,
          password: response.data.password,
          firstName: response.data.name.firstName,
          lastName: response.data.name.lastName,
          role: response.data.role
        });
      })
  }
  render() {
    const roles = ['manager', 'trainer', 'member']
    return (
      <Router>
        <div className="wrapper">
          <Sidebar />

          <Navbar
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            avatarURL={this.state.avatarURL}
          />
          <Route
            path="/account/manager"
            exact
            render={(props) => <Accounts {...props} role={roles[0]} />}
          />
          <Route
            path="/account/trainer"
            render={(props) => <Accounts {...props} role={roles[1]} />}
          />
          <Route path="/account/member"
            exact
            render={(props) => <Accounts {...props} role={roles[2]} />}
          />
          <Route path="/account/create" exact component={AccountCreatePage} />
          <Route path="/account/edit/:id" exact component={AccountUpdateForm} />
          <Route path="/exercise/" exact component={Exercises} />
          <Route path="/exercise/create" exact component={ExerciseCreateForm} />
          <Route path="/exercise/edit/:id" exact component={ExerciseUpdateForm} />

        </div>
      </Router>
    );
  }
}

export default App;
