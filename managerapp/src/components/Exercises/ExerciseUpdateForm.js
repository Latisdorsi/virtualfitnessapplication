import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import ExerciseForm from './ExerciseForm';
import axios from 'axios'

export class ExerciseUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            videoURL: '',
            categoryName: '',
            categoryRate: '',
            goal: 'Goal 1'
        }
    }
    componentDidMount() {
        axios
            .get('http://localhost:3000/exercise/detail/' + this.props.match.params.id)
            .then(response => {
                this.setState({ name: response.data.name, videoURL: response.data.videoURL, categoryName: response.data.category.name, categoryRate: response.data.category.rate, goal: response.data.goal });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const validationSchema = Yup
            .object()
            .shape({
                name: Yup
                    .string("Enter a name")
                    .min(3, "Minimum of 3 Characters required for exercise")
                    .max(50, "Maximums of 5 characters allowed for exercise")
                    .required("Name is required"),
                videoURL: Yup
                    .string()
                    .url("Enter a valid URL")
            });

        const updateExercise = (values, { setSubmitting }) => {
            const obj = {
                name: values.name,
                videoURL: values.videoURL,
                category: {
                    name: values.categoryName,
                    rate: values.categoryRate
                },
                goal: values.goal.value
            };
            console.log(obj)

            axios
                .put('http://localhost:3000/exercise/detail/' + this.props.match.params.id , obj)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.error('Request failed', err.response)
                });

        }
        return (
            <div className="content-wrapper">
                <div className="container-fluid mt-4">
                    <div className="row mt-4 mb-2">
                        <div className="col-md-9">
                            <div className="page-title-wrapper">
                                <h4 className="page-title">Exercise Details</h4>
                            </div>
                            <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <Formik
                                    enableReinitialize="true"
                                        initialValues={{
                                            ...this.state
                                        }}
                                        render={props => <ExerciseForm {...props} />}
                                        validationSchema={validationSchema}
                                        onSubmit={updateExercise} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExerciseUpdateForm;

/*
import React, { Component } from 'react'
import axios from 'axios';

export class AccountUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.delete = this.delete.bind(this);


        this.state = {
            name: '',
            videoURL: '',
            categoryName: '',
            categoryRate: '',
            goal: 'Goal 1'
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    componentDidMount() {
        axios.get('http://localhost:3000/exercise/detail/' + this.props.match.params.id)
            .then(response => {

                this.setState({
                    name: response.data.name,
                    videoURL: response.data.videoURL,
                    categoryName: response.data.category.name,
                    categoryRate: response.data.category.rate,
                    goal: response.data.goal
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.props.match.params.id)
        const obj = {
            name: this.state.name,
            videoURL: this.state.videoURL,
            category: {
                name: this.state.categoryName,
                rate: this.state.categoryRate,
            },
            goal: this.state.goal
        };
        axios.put('http://localhost:3000/exercise/detail/' + this.props.match.params.id, obj)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    videoURL: response.data.videoURL,
                    categoryName: response.data.category.name,
                    categoryRate: response.data.category.rate,
                    goal: response.data.goal
                })
            })
            .catch(function (error) {
                console.log(error);
            })


    }
    delete() {
        axios.delete('http://localhost:3000/exercise/detail/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: '',
                    videoURL: '',
                    categoryName: '',
                    categoryRate: '',
                    goal: 'Goal 1'

                })
            })
            .catch(err => console.log(err))

    }

    render() {

        const { name, videoURL, categoryName, categoryRate, goal } = this.state

        return (
            <div className="content-wrapper">
                <div className="container-fluid mt-4">
                    <form onSubmit={this.onSubmit} method="Post">
                        <div className="row mt-4 mb-2">
                            <div className="col-md-9">
                                <div className="page-title-wrapper">
                                    <h4 className="page-title">Exercise Details</h4>
                                </div>
                                <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-primary btn-custom mt-3" stlye="margin-right:10px">
                                    Save
                         </button>
                         <button type="submit" className="btn btn-primary float-lg-right btn-custom mt-3" stlye="margin-right:10px" onClick={this.delete}>
                                    Delete
                             </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">

                                        <h4 className="header-title">Exercise</h4>
                                        <p className="text-muted">Enter your user credentials</p>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="name" id="name" name="name" className="form-control" placeholder="Enter name"
                                                value={name} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="videoURL">Video URL</label>
                                            <input type="url" id="videoURL" name="videoURL" className="form-control"
                                                placeholder="Create videoURL" value={videoURL} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="categoryName">Category Name</label>
                                            <input type="text" id="categoryName" name="categoryName" className="form-control"
                                                placeholder="Confirm videoURL" value={categoryName} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label
                                                htmlFor="categoryRate">Category Rate</label>
                                            <input type="number" id="categoryRate" name="categoryRate" className="form-control"
                                                placeholder="Enter the category Rate" value={categoryRate} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="role">Select Exercise Goal</label>
                                            <select id="goal" name="goal" onChange={this.handleChange} value={goal}>
                                                <option value="manager">Goal 1</option>
                                                <option value="trainer">Goal 2</option>
                                                <option value="member">Goal 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        )
    }
}

export default AccountUpdateForm
*/