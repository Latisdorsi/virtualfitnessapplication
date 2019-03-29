import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <div className="navbar">
                    <div className="container-fluid">
                        <div className="float-left"><i className="dripicons dripicons-menu"></i></div>
                        <ul className="float-right">
                            <li><i className="dripicons dripicons-bell"></i></li>
                            <li className="account">
                                <span className="account-avatar">
                                    <img src="/img/cjc-soft-copy.jpg" className="rounded-corner" alt="" />
                                </span>
                                <span>John Doe</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar
