import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

export class Logout extends Component {
    componentDidMount() {
        Cookies.remove('token')
        window.location.reload();
    }
    render() {
        return <Redirect to="/" />;
    }
}

export default Logout
