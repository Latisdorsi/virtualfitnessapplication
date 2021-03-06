import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Fade } from 'reactstrap'
import axios from 'axios';
import ExerciseCell from './ExerciseCell'
export class Exercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: [],
            currentPage: 1,
            documentsPerPage: 15,
            alertMssg: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.pushAlertMessage = this.pushAlertMessage.bind(this);
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

    renderExercises = () => {
        axios.get('/api/exercise/list')
            .then(response => {
                this.setState({ exercises: response.data })
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
        this.renderExercises();
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }


    componentDidMount() {
        this.renderExercises();
    }

    render() {
        const { currentPage, documentsPerPage, exercises } = this.state

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * documentsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - documentsPerPage;
        const currentExercises = exercises.slice(indexOfFirstTodo, indexOfLastTodo);

        const populateTable = currentExercises.map((exercise, i) => {
            return <ExerciseCell exercise={exercise} pushAlertMessage={this.pushAlertMessage} key={i} />
        })

        // Logic for displaying page numbers
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(exercises.length / documentsPerPage); i++) {
            pageNumbers.push(i);
        }

        const firstPage = 1;
        const lastPage = pageNumbers.length;


        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    className="page-item"
                    key={number}
                >
                    <a
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
                {this.displayAlertMessage()}
                <div className="container-fluid mt-4 mb-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-wrapper">
                                <h4>Exercise Management</h4>
                                <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                            </div>
                            <Link to={"/exercise/create"} className="btn btn-primary">Create New Exercise</Link>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Instructions</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {populateTable}
                                        </tbody>
                                    </table>
                                    {this.state.exercises.length == 0 && <p className="text-center">No Existing Exercises</p>}
                                    <ul id="page-numbers" className="pagination">
                                        <li
                                            className="page-item">
                                            <a
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

export default Exercises