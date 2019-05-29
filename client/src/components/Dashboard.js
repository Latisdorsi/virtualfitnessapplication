import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ExerciseCell from './Exercises/ExerciseCell'
import AccountCell from './Account/AccountCell'
import { Alert, Fade } from 'reactstrap'

export class Exercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            alert: [],
            exercises: [],
            documentsPerPage: 15,
            alertMssg: []
        };

        this.handleClick = this.handleClick.bind(this);
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


    displayAlertMessage = () => {

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

    fetchUserData = () => {
        // Get Members from Server
        axios.get('/api/account/list/member/inactive')
            .then(response => {
                this.setState({ members: response.data })
            })
            .catch(err => {
                console.error(err)
            })

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

    componentDidMount() {
        this.fetchUserData();
    }

    render() {
        const { documentsPerPage, exercises, managers, members } = this.state

        const currentMembers = members.slice(0, documentsPerPage)

        const populateMembers = currentMembers.map((user, i) => {
            return <AccountCell user={user} pushAlertMessage={this.pushAlertMessage} key={i} />
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
                                        {this.state.members.length == 0 && <p className="text-center">No Inactive Members</p>}

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
