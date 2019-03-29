import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ExerciseCell from './ExerciseCell'

export class Exercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: [],
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
        axios.get('http://127.0.0.1:3000/exercise/list')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        const { currentPage, documentsPerPage, exercises } = this.state

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * documentsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - documentsPerPage;
        const currentExercises = exercises.slice(indexOfFirstTodo, indexOfLastTodo);

        const populateTable = currentExercises.map(function (exercise, i) {
            return <ExerciseCell exercise={exercise} key={i} />
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
                                    <h4 className="header-title">Manage Exercises</h4>
                                    <p className="text-muted mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category Name</th>
                                                <th>Category Rate</th>
                                                <th>Goal</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {populateTable}
                                        </tbody>
                                    </table>
                                    <ul id="page-numbers" className="pagination">
                                        <li
                                            className="page-item">
                                            <Link
                                                className="page-link"
                                                key={firstPage}
                                                id={firstPage}
                                                onClick={this.handleClick}>
                                                First Page
                                                </Link>
                                        </li>
                                        {renderPageNumbers}
                                        <li
                                            className="page-item">
                                            <Link
                                                className="page-link"
                                                key={lastPage}
                                                id={lastPage}
                                                onClick={this.handleClick}>
                                                Last Page
                                                </Link>
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
