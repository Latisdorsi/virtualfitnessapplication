import React, { Component } from 'react'
import AccountCell from './AccountCell'
import { Link } from 'react-router-dom'
import axios from 'axios';

export class Accounts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            currentPage: 1,
            documentsPerPage: 15,

        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:3000/account/list/member')
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch(err => {
                console.error(err)
            })
    }

    populateTable() {
        return this.state.users.map(function (user, i) {
            return <AccountCell user={user} key={i} />
        })
    }

    render() {
        const { currentPage, documentsPerPage, users } = this.state

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * users;
        const indexOfFirstTodo = indexOfLastTodo - users;
        const currentTodos = users.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(users.length / documentsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row mt-4 mb-4">
                        <div className="col-md-12">
                            <div className="page-title-wrapper">
                                <h4>Account Management</h4>
                            </div>
                            <Link to={"/user/create"} className="btn btn-primary">Create New Account</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Member Title</h4>
                                    <p className="text-muted mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Registered</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.populateTable()}
                                        </tbody>
                                    </table>

                                    <ul id="page-numbers">
                                        {renderPageNumbers}
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
