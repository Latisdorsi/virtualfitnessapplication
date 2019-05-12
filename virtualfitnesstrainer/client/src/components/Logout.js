import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

export class Logout extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        console.log(Cookies.get())
    }


    render() {
        return <Redirect to="/" />;

    }
}
export default Logout
