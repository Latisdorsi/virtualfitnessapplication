import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar-wrapper">
                <div className="sidebar-logo">
                    <img src="/img/af_logo_white.png" alt="" />
                </div>
                <ul className="sidebar">
                    <li className="nav-title nav-item">Manager Controls</li>
                    <li className="nav-item"><Link to="/admin"><i className="dripicons-meter"></i><span>Dashboard</span></Link></li>
                    <li className="nav-item" >
                        <a href="#accountMenu" data-toggle="collapse" aria-expanded="false">
                            <i className="dripicons-user-id"></i>Accounts</a>
                        <ul className="collapse subMenu" id="accountMenu">
                            <li><Link to="/account/create">Create New</Link></li>
                            <li><Link to="/account/list/manager">Manager</Link></li>
                            <li><Link to="/account/list/trainer">Trainer</Link></li>
                            <li><Link to="/account/list/member">Member</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item" >
                        <a href="#exerciseMenu" data-toggle="collapse" aria-expanded="false">
                            <i className="dripicons-document"></i>Exercises
                        </a>
                        <ul className="collapse subMenu" id="exerciseMenu">
                            <li><Link to="/exercise/create">Create New</Link></li>
                            <li><Link to="/exercise">All Exercises</Link></li>
                        </ul>
                    </li>
                    <li className="nav-title nav-item">Member Records</li>
                    <li className="nav-item"><Link to="/admin"><i className="dripicons-user-group"></i>Members</Link></li>
                    <li className="nav-item"><Link to="/admin"><i className="dripicons-browser-upload"></i>API Logs</Link></li>
                    <li className="nav-title nav-item">Other</li>
                    <li className="nav-item"><Link to="/admin"><i class="dripicons-information"></i>Help</Link></li>
                </ul>
            </div>
        )
    }
}

export default Sidebar
