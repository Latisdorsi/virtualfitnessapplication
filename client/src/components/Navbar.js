import React, { Component } from 'react'
import { AuthConsumer } from '../AuthContext';
import { Link } from 'react-router-dom';
import avatar from '../library/res/img/avatar.png'

export class Navbar extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return (
            <AuthConsumer>
                {({ isAuth }) => (
                    isAuth &&
                    <div className="content-wrapper">
                        <div className="navbar">
                            <div className="container-fluid">
                                <div className="float-left"><i className="dripicons dripicons-menu"></i></div>
                                <ul className="float-right">
                                    <li className="account">
                                        <span className="account-avatar">   
                                            <img src={this.props.avatarURL || avatar} className="rounded-corner" alt="" />
                                        </span>
                                        <Link to={"/account/edit/" + this.props.id}><span className="ml-2">{this.props.firstName} {this.props.lastName}</span></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </AuthConsumer>
        )
    }
}

export default Navbar
