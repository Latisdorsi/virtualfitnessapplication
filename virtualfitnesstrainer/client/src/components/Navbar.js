import React, { Component } from 'react'

export class Navbar extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
    }
    render() {
        return (
            <div className="content-wrapper">
                <div className="navbar">
                    <div className="container-fluid">
                        <div className="float-left"><i className="dripicons dripicons-menu"></i></div>
                        <ul className="float-right">
                            <li className="account">
                                <span className="account-avatar">
                                    <img src={this.props.avatarURL} className="rounded-corner" alt="" />
                                </span>
                                <span className="ml-2">{this.props.firstName} {this.props.lastName}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar
