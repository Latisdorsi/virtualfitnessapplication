import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import ExerciseForm from './ExerciseForm';
import axios from 'axios'

export class ExerciseCreateForm extends Component {

    render() {
        const validationSchema = Yup.object().shape({
            name: Yup.string("Enter a name")
                .min(3, "Minimum of 3 Characters required for exercise")
                .max(50, "Maximums of 5 characters allowed for exercise")
                .required("Name is required"),
            videoURL: Yup.string().url("Enter a valid URL"),

        });

        const createExercise = (values, { setSubmitting }) => {
            const obj = {
                name: values.name,
                videoURL: values.videoURL,
                category: {
                    name: values.categoryName,
                    rate: values.categoryRate,
                },
                goal: values.goal.value
            };
            console.log(obj)

            axios.post('http://localhost:3000/exercise/create', obj)
                .then(response => {
                    console.log(response)
                    this.setState({
                        name: '',
                        videoURL: '',
                        categoryName: '',
                        categoryRate: '',
                        goal: 'Goal 1'
                    })
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
                                        initialValues={{ name: '' }}
                                        render={props => <ExerciseForm {...props} />}
                                        validationSchema={validationSchema}
                                        onSubmit={createExercise}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExerciseCreateForm;


/*
constructor(props) {
                    super(props);
                this.handleChange = this.handleChange.bind(this);
                this.onSubmit = this.onSubmit.bind(this);

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

onSubmit(e) {
                    e.preventDefault();
                const obj = {
                    name: this.state.name,
                videoURL: this.state.videoURL,
category: {
                    name: this.state.categoryName,
                rate: this.state.categoryRate,
            },
            goal: this.state.goal
        };
        axios.post('http://localhost:3000/exercise/create', obj)
.then(response => {
                    console.log(response)
this.setState({
                    name: '',
                videoURL: '',
                categoryName: '',
                categoryRate: '',
                goal: 'Goal 1'
            })
        })
.catch(err => {
                    console.error('Request failed', err.response)
                });


        }

render() {
const {name, videoURL, categoryName, categoryRate, goal } = this.state

                return (


                                        </div>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>

                )
            }
              */
