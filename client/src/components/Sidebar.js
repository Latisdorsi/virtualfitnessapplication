import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import logo from '../af_logo_white.png'
import { AuthConsumer } from '../AuthContext';

export class Sidebar extends Component {
    render() {
        return (
            <AuthConsumer>
                {({ isAuth }) => (
                    isAuth &&
                    <div className="sidebar-wrapper">
                        <div className="sidebar-logo">
                            <img src={logo} />
                        </div>
                        <ul className="sidebar">
                            <li className="nav-title nav-item">Manager Controls</li>
                            <li className="nav-item"><Link to="/dashboard"><i className="dripicons dripicons-meter"></i><span>Dashboard</span></Link></li>
                            <li className="nav-item" >
                                <a href="#accountMenu" data-toggle="collapse" aria-expanded="false">
                                    <i className="dripicons dripicons-user-id"></i>Accounts</a>
                                <ul className="collapse subMenu" id="accountMenu">
                                    <li><Link to="/account/create">Create New</Link></li>
                                    <li><Link to="/account">Accounts</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item" >
                                <a href="#exerciseMenu" data-toggle="collapse" aria-expanded="false">
                                    <i className="dripicons dripicons-document"></i>Exercises
                        </a>
                                <ul className="collapse subMenu" id="exerciseMenu">
                                    <li><Link to="/exercise/create">Create New</Link></li>
                                    <li><Link to="/exercise">All Exercises</Link></li>
                                </ul>
                            </li>
                            <li className="nav-title nav-item">Other</li>
                            <li className="nav-item"><Link to="/admin"><i className="dripicons dripicons-information"></i>Help</Link></li>
                            <li className="nav-item"><Link to="/logout"><i className="dripicons dripicons-exit"></i>Logout</Link></li>
                        </ul>
                    </div>
                )}
            </AuthConsumer>
        )
    }
}

export default Sidebar
