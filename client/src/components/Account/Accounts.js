import React, { Component } from 'react'
import AccountCell from './AccountCell'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Alert, Fade } from 'reactstrap'
export class Accounts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            managers: [],

            currentMembers: [],
            pageMembers: [],

            currentManagers: [],
            pageManagers: [],

            isLoading: false,
            alert: [],
            currentPage: 1,
            documentsPerPage: 15,

            alertMssg: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.pushAlertMessage = this.pushAlertMessage.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }


    onDismiss = (index) => {
        if (this.state.alertMssg) {
            const newAlertArray = this.state.alertMssg.slice(index)
            this.setState({
                alertMssg: newAlertArray
            });
            this.forceUpdate();
        }
    }


    displayAlertMessage = (index) => {

        return (
            <>
                <div
                    style={{
                        position: 'fixed',
                        top: '0x',
                        right: '20px',
                        width: '30%',
                        zIndex: '9999',
                        borderRadius: '0px'
                    }}
                >
                    {this.state.alertMssg.map((alert, index) => {
                        return <Fade in={true}>
                            <Alert
                                color={alert.type}
                                isOpen={true}
                                toggle={
                                    () => {
                                        this.setState({
                                            alertMssg: this.state.alertMssg.slice(index + 1)
                                        });
                                        return false;
                                    }
                                }
                            >
                                {alert.mssg}
                            </Alert>
                        </Fade>
                    })
                    }
                </div>

            </>
        );
    }

    pushAlertMessage = (mssg, type) => {
        this.setState({
            alertMssg: [
                ...this.state.alertMssg,
                { mssg, type }
            ]
        });
        this.fetchUserData();
    }


    componentDidMount = () => {
        this.fetchUserData();
    }

    fetchUserData = () => {
        axios.all([axios.get(`/api/account/list/manager`), axios.get('/api/account/list/member')])
            .then(axios.spread((manager, member) => {
                this.setState({
                    managers: manager.data,
                    members: member.data
                });
                this.generateTableData();
            }));
    }

    generateTableData = () => {
        const { currentPage, documentsPerPage, members, managers } = this.state

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * documentsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - documentsPerPage;
        // Logic for displaying page numbers
        const pageMembers = [];
        const pageManagers = [];

        for (let i = 1; i <= Math.ceil(members.length / documentsPerPage); i++) {
            pageMembers.push(i);
        }
        for (let i = 1; i <= Math.ceil(managers.length / documentsPerPage); i++) {
            pageManagers.push(i);
        }

        //Set UI Page Numbers
        this.setState({
            currentMembers: members.slice(0, indexOfLastTodo),
            currentManagers: managers.slice(0, indexOfLastTodo),
            pageMembers,
            pageManagers
        })
    }

    render() {

        const { pageMembers, pageManagers, currentManagers, currentMembers } = this.state;
        const firstPage = 1;
        const membersLastPage = pageMembers;
        const managersLastPage = pageManagers;

        return (
            <div className="content-wrapper">
                {this.displayAlertMessage()}
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
                                    <h4 className="header-title">Manager Accounts</h4>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Details</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                !this.state.isLoading ?
                                                    currentManagers.map((user, i) => {
                                                        return <AccountCell pushAlertMessage={this.pushAlertMessage} user={user} key={i} />
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
                                        {
                                            pageManagers.map((number, key) => {
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
                                            })

                                        }
                                        <li
                                            className="page-item">
                                            <a
                                                href="#"
                                                className="page-link"
                                                key={membersLastPage}
                                                id={membersLastPage}
                                                onClick={this.handleClick}>
                                                Last Page
                                                </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Member Accounts</h4>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Details</th>
                                                <th>Action</th>
                                                <th>Activate</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                !this.state.isLoading ?
                                                    currentMembers.map((user, i) => {
                                                        return <AccountCell user={user} pushAlertMessage={this.pushAlertMessage} key={i} />
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
                                        {pageMembers.map((number, key) => {
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
                                        })
                                        }
                                        <li
                                            className="page-item">
                                            <a
                                                href="#"
                                                className="page-link"
                                                key={managersLastPage}
                                                id={managersLastPage}
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
