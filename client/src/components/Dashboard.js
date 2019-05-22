import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ExerciseCell from './Exercises/ExerciseCell'
import AccountCell from './Account/AccountCell'
import { Alert } from 'reactstrap'

export class Exercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            managers: [],
            members: [],
            alert: [],
            exercises: [],
            documentsPerPage: 15,
        };

        this.handleClick = this.handleClick.bind(this);
    }



    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }


    onDismiss = (index) => {
        this.setState({
            alert: this.state.alert.slice(index)
        })
    }

    showMessage = () => {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '0x',
                    right: '20px',
                    width: '30%',
                    zIndex: '9999',
                    borderRadius: '0px'
                }}>
                <Alert
                    color="success"
                    isOpen={true}
                    toggle={this.onDismiss}
                >
                    Account Successfully Activated
                            </Alert>
                <Alert
                    color="danger"
                    style={{
                        position: 'fixed',
                        top: '0x',
                        right: '20px',
                        width: '30%',
                        zIndex: '9999',
                        borderRadius: '0px'
                    }}
                    isOpen={true}
                    toggle={this.onDismiss}
                >
                    Account Successfully Deleted
                            </Alert>
            </div>
        )
    }

    componentDidMount() {

        // Get Members from Server
        axios.get('/api/account/list/member/inactive')
            .then(response => {
                this.setState({ members: response.data })
            })
            .catch(err => {
                console.error(err)
            })

    }

    render() {
        const { documentsPerPage, exercises, managers, members } = this.state

        const currentMembers = members.slice(0, documentsPerPage)

        const populateMembers = currentMembers.map(function (user, i) {
            return <AccountCell user={user} key={i} />
        })


        return (
            <div className="content-wrapper">

                <div className="container-fluid mt-4 mb-4">
                    <div className="page-title-wrapper">
                        <h4>Dashboard</h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12 mt-4 mb-4">
                            <div className="card ">
                                <div className="card-body">
                                    <div className="row">
                                    <div className="col-md-6">
                                            <div className="page-title-wrapper">
                                                <h4>Inactive Member Accounts</h4>
                                                <p className="text-muted">Activate or Deactivate Members</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <Link to={"/account/create"} className="btn btn-primary">Create New Account</Link>
                                        </div>
                                    </div>


                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Registered</th>
                                                <th>Action</th>
                                                <th>Activate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {populateMembers}
                                        </tbody>
                    
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Exercises
