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

import LoginForm from './components/Login'
import LogoutForm from './components/Logout'

import { getAuthState } from './library/config/Auth'

import AuthComponent from './components/Auth/withAuth'

import Cookies from 'js-cookie'


function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      avatarURL: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: ''
    }
  }

  componentWillMount() {
    axios.get('http://localhost:3000/account/checkToken', { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          this.setState({ isLoggedIn: true });

        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  }

  componentDidMount() {

    const userData = parseJwt(Cookies.get('token'))

    console.log(userData)

    axios
      .get('http://localhost:3000/account/detail/' + userData._id)
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
        {this.state.isLoggedIn ?
          <div>
            <Sidebar />
            <Navbar
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              avatarURL={this.state.avatarURL}
            />
            <Route path="/" exact component={Exercises} />
          </div>
          :
          <Route path="/" exact component={LoginForm} />
        }

        <div className="wrapper">
          <Switch>
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
            <Route path="/logout" exact component={LogoutForm} />
          </Switch>
        </div>

      </Router>
    )

  }


}

export default App;
