import React, { Component } from 'react'
import AccountCell from './AccountCell'
import { Link } from 'react-router-dom'
import axios from 'axios';

export class Accounts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoading: true,
            currentPage: 1,
            documentsPerPage: 15,
            role: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentDidMount = () => {
        const { role } = this.props.match.params
        if (role) {
            axios.get('http://127.0.0.1:3000/account/list/' + role)
                .then(response => {
                    this.setState({
                        users: response.data,
                        isLoading: false,
                        role: role
                    })
                })
                .catch(err => {
                    console.error(err)
                })
        }

    }



    render() {
        const { role } = this.props.match.params

        const { currentPage, documentsPerPage, users } = this.state

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * documentsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - documentsPerPage;

        const currentUsers = users.slice(0, indexOfLastTodo);


        // Logic for displaying page numbers
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(users.length / documentsPerPage); i++) {
            pageNumbers.push(i);
        }

        const firstPage = 1;
        const lastPage = pageNumbers.length;

        const renderPageNumbers = pageNumbers.map((number, key) => {
            return (
                <li
                    className="page-item"
                    key={key}
                >
                    <a
                        href="#"
                        className="page-link"
                        key={number}
                        id={number}
                        onClick={this.handleClick}>

                        {number}
                    </a>
                </li>
            );
        });

        return (
            <div className="content-wrapper">
                <div className="container-fluid mt-4 mb-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-wrapper">
                                <h4>Account Management</h4>
                                <p className="text-muted">Modify account details for all registered users</p>
                            </div>
                            <Link to={"/account/create"} className="btn btn-primary">Create New Account</Link>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Manage {role.charAt(0).toUpperCase() + role.slice(1)} Accounts</h4>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Details</th>
                                                <th>Action</th>
                                                {role === 'member' && <th>Activate</th>}
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                !this.state.isLoading ?
                                                    currentUsers.map(function (user, i) {
                                                        return <AccountCell user={user} key={i} />
                                                    })
                                                    :
                                                    null
                                            }

                                        </tbody>
                                    </table>
                                    <ul id="page-numbers" className="pagination">
                                        <li
                                            className="page-item">
                                            <a
                                                href="#"
                                                className="page-link"
                                                key={firstPage}
                                                id={firstPage}
                                                onClick={this.handleClick}>
                                                First Page
                                                </a>
                                        </li>
                                        {renderPageNumbers}
                                        <li
                                            className="page-item">
                                            <a
                                                href="#"
                                                className="page-link"
                                                key={lastPage}
                                                id={lastPage}
                                                onClick={this.handleClick}>
                                                Last Page
                                                </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Accounts
