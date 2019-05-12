import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ExerciseCell from './Exercises/ExerciseCell'
import AccountCell from './Account/AccountCell'

export class Exercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            managers: [],
            members: [],
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


    componentDidMount() {

        // Get Exercises from Server
        axios.get('/api/exercise/list')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch(err => {
                console.error(err)
            })


        // Get Managers from Server
        axios.get('http://127.0.0.1:3000/account/list/manager')
            .then(response => {
                this.setState({ managers: response.data })
            })
            .catch(err => {
                console.error(err)
            })


        // Get Members from Server
        axios.get('http://127.0.0.1:3000/account/list/member')
            .then(response => {
                this.setState({ members: response.data })
            })
            .catch(err => {
                console.error(err)
            })

    }

    render() {
        const { documentsPerPage, exercises, managers, members } = this.state

        const currentManagers = managers.slice(0, documentsPerPage)
        const currentMembers = members.slice(0, documentsPerPage)
        const currentExercises = exercises.slice(0, documentsPerPage);

        const renderExercises = (event) => {
            axios.get('/api/exercise/list')
                .then(response => {
                    this.setState({ exercises: response.data })
                })
                .catch(err => {
                    console.error(err)
                })
        }

        const populateExercises = currentExercises.map(function (exercise, i) {
            return <ExerciseCell exercise={exercise} key={i} renderExercises={renderExercises} />
        })

        const populateManagers = currentManagers.map(function (user, i) {
            return <AccountCell user={user} key={i} />
        })

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
                                    <div className="page-title-wrapper">
                                        <h4>Manager Accounts</h4>
                                        <p className="text-muted">List of all Managers Registered</p>
                                    </div>
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
                                            {populateManagers}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="pl-4  col-md-7 mt-4 mb-4">
                            <div className="card ">
                                <div className="card-body">

                                    <div className="page-title-wrapper">
                                        <h4>Latest Member Accounts</h4>
                                        <p className="text-muted">List of all Members Recently Registered</p>
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
                        <div className="pr-4 col-md-5 mt-4 mb-4">
                            <div className="card ">
                                <div className="card-body">
                                    <div className="page-title-wrapper">
                                        <h4>Exercise Management</h4>
                                        <p className="text-muted">Latest Added Exercises in the System</p>
                                    </div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Instructions</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {populateExercises}
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
