import React, { Component } from 'react';
import { render } from 'react-dom';

import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Accounts from './components/Account/Accounts';
import AccountCreatePage from './components/Account/AccountCreateForm/';
import AccountUpdateForm from './components/Account/AccountUpdateForm/';

import Exercises from './components/Exercises';
import ExerciseCreateForm from './components/Exercises/ExerciseCreateForm';
import ExerciseUpdateForm from './components/Exercises/ExerciseUpdateForm';

import Dashboard from './components/Dashboard'

import LoginForm from './components/Login'
import LogoutForm from './components/Logout'

//import { getAuthState } from './library/config/Auth'

//import AuthComponent from './components/Auth/withAuth'

import Cookies from 'js-cookie'
import withAuth from './components/Auth/withAuth'
import ProtectedRoute from './components/Auth/ProtectedRoute'

function parseJwt(token) {
  if (token != '') {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
};


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      avatarURL: '',
      email: '',
      firstName: '',
      lastName: '',
      role: '',
    }
  }

  componentDidMount() {
    axios
      .get('/account/checkToken')
      .then(response => {
        axios.get('/account/detail/' + response.data._id)
          .then(response => {
            if (response.status === 200) {
              this.setState({ isLoggedIn: true });
              this.setState({
                avatarURL: response.data.avatarURL,
                email: response.data.email,
                firstName: response.data.name.firstName,
                lastName: response.data.name.lastName,
                role: response.data.role
              })
            } else {
              this.setState({ isLoggedIn: false });
            }
          })
          .catch(err => {
            this.setState({ isLoggedIn: false });
            console.error(err);
          })
      })
  }


  render() {
    const roles = ['manager', 'member']
    return (
      <Router>
        {this.state.isLoggedIn ?
          <div>
            <Sidebar />
            <Navbar
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              avatarURL={this.state.avatarURL}
            />
            <Route
              path="/"
              exact
              component={Dashboard}
            />
          </div>
          :
          <Route path="/" exact component={LoginForm} />
        }

        <div className="wrapper">
          <Switch>

            <Route
              path="/account/manager"
              exact
              component={(props) => <Accounts {...props} role={roles[0]} />}
            />
            <Route path="/account/member"
              exact
              render={(props) => <Accounts {...props} role={roles[1]} />}
            />
            <Route path="/account/create" exact component={AccountCreatePage} />
            <Route path="/account/edit/:id" exact component={AccountUpdateForm} />
            <Route path="/exercise/" exact component={Exercises} />
            <Route path="/exercise/create" exact component={ExerciseCreateForm} />
            <Route path="/exercise/edit/:id" exact component={ExerciseUpdateForm} />
            <Route path="/logout" exact component={LogoutForm} />
          </Switch>
        </div>

      </Router>
    )

  }


}

export default App;
