import React, { Component } from 'react'
import axios from 'axios';

import LoginBackground from '../library/res/img/home_bg.jpg'
import AnytimeLogoBlack from '../library/res/img/anytime_fitness_logo_scaled.png'
import { Formik } from 'formik'
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthConsumer } from '../AuthContext';


export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit = (values) => {
        axios
            .post('/account/authenticate', {
                email: values.email,
                password: values.password
            })
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                } else {
                    console.log('nope')
                    const error = new Error(response.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });


    }

    render() {
        return (
            <AuthConsumer>
                {({ isAuth, isLoading }) => (
                    isLoading
                        ?
                        null
                        :
                        isAuth
                            ?
                            <Redirect to="/dashboard" />

                            :
                            < section className="login-section">
                                <div className="container">
                                    <div className="row login-body">
                                        <div className="col-md-5 m-auto">
                                            <div className="card card-body">
                                                <img src={AnytimeLogoBlack} className="mb-4" alt="" />
                                                <h1 className="mb-3 card-title text-center">Howdy Manager!</h1>
                                                <h6 className="mb-3 text-center">Please enter your login credentials.</h6>
                                                <Formik
                                                    initialValues={{
                                                        ...this.state
                                                    }}
                                                    onSubmit={(values, { setSubmitting }) => {
                                                        this.onSubmit(values)
                                                        setSubmitting(false);
                                                    }}
                                                    render={props => (
                                                        <form onSubmit={props.handleSubmit}>
                                                            <div className="form-group mb-4">
                                                                <label htmlFor="email">Email</label>
                                                                <input
                                                                    type="email"
                                                                    id="email"
                                                                    name="email"
                                                                    onChange={props.handleChange}
                                                                    onBlur={props.handleBlur}
                                                                    value={props.values.email}
                                                                    className="form-control"
                                                                    placeholder="Enter Email" />
                                                                {props.errors.email && <div id="feedback">{props.errors.email}</div>}
                                                            </div>
                                                            <div className="form-group mb-4">
                                                                <label htmlFor="password">Password</label>
                                                                <input
                                                                    type="password"
                                                                    id="password"
                                                                    name="password"
                                                                    onChange={props.handleChange}
                                                                    onBlur={props.handleBlur}
                                                                    value={props.values.password}
                                                                    className="form-control"
                                                                    placeholder="Enter Password" />
                                                                {props.errors.password && <div id="feedback">{props.errors.password}</div>}
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-12">
                                                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    )} />

                                                <hr />

                                                <div className="row text-center">
                                                    <div className="col-md-12">
                                                        <a href="">Forgot Password?</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                )}
            </AuthConsumer>
        )
    }
}

export default Login
