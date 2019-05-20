import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

export default function withAuth(ComponentToProtect) {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            Axios.get('/checkToken')
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false, redirect: false });
                    } else {
                        this.setState({ loading: false, redirect: true });
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                console.log('test')
                return <Redirect to="/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect />
                </React.Fragment>
            );
        }
    }

}