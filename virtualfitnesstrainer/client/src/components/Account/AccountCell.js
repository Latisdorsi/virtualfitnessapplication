import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export class AccountCell extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.delete('http://localhost:3000/account/detail/' + this.props.user._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
    render() {
        const { user } = this.props;
        console.log(user)
        return (
            <tr>
                <td>{user.email}</td>
                <td>{user.name.firstName}</td>
                <td>{user.name.lastName}</td>
                <td>Registed: {user.createdDate} <br /> <strong>Active</strong>: {String(user.active)}</td>
                <td>
                    <Link to={"/account/edit/" + user._id}><i className="dripicons dripicons-pencil"></i></Link>&nbsp;
                    <Link onClick={this.delete}><i className="dripicons dripicons-trash"></i></Link>
                </td>
                {user.role === 'member' &&
                    <td>
                        {
                            user.active ?
                                <button className="btn btn-success btn-activate-custom"><i className="dripicons dripicons-checkmark"></i></button>
                                :
                                <button className="btn btn-danger btn-activate-custom"> <i className="dripicons dripicons-checkmark"></i></button>
                        }
                    </td>

                }

            </tr>
        )
    }
}

export default AccountCell
