import React from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = {
        isLoading: true,
        isAuth: false,
    }

    componentDidMount = () => {
        axios
            .get('/account/checkToken')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isAuth: true,
                        isLoading: false
                    })

                }
                else {
                    this.setState({
                        isAuth: false,
                        isLoading: false
                    })
                }
            })
            .catch(err => {
                console.error(err)
                this.setState({
                    isAuth: false,
                    isLoading: false
                })

            })
    };

    render() {
        return (
            <AuthContext.Provider
                value={{ isAuth: this.state.isAuth, isLoading: this.state.isLoading }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }