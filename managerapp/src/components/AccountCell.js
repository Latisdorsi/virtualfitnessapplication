import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class AccountCell extends Component {
    render() {
        const { user } = this.props;
        return (
            <tr>
                <td>{user.email}</td>
                <td>{user.name.firstName}</td>
                <td>{user.name.lastName}</td>
                <td>{user.createdDate}</td>
                <td>
                    <Link to={"/edit/" + user._id}><i className="dripicons-pencil"></i></Link>&nbsp;
                    <Link to={"/edit/" + user._id}><i className="dripicons-trash"></i></Link>
                </td>

            </tr>
        )
    }
}

export default AccountCell
