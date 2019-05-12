import React, { Component, useState, useEffect } from 'react'
import { Redirect, BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Axios from 'axios';

export default function PrivateRoute({ component: Component, ...rest }) {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        Axios.get('/account/checkToken')
            .then(response => {
                console.log('reached')
                setLoggedIn(true)
            })
            .catch(err => {
                setLoggedIn(false)
            })
    }, [])

    return (
        <Route {...rest} render={(props) => (
            loggedIn
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
        )} />
    )
}
