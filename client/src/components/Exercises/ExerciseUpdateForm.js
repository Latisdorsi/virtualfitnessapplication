import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import ExerciseForm from './ExerciseForm';
import axios from 'axios'
import avatar from '../../no-img.jpg'


export class ExerciseUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Avatar
            avatar: '',
            isUploading: false,
            progress: 0,

            imageName: '',
            imageUrl: avatar,
            name: '',
            instruction: '',
        }
    }
    componentDidMount() {
        axios
            .get('/api/exercise/detail/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data)
                this.setState({ imageName: response.data.imageName, imageUrl: response.data.imageUrl, name: response.data.name, instruction: response.data.instruction });
                if (typeof response.data.imageUrl != "undefined" && !(response.data.imageUrl === "")) {
                    this.setState({
                        imageName: response.data.imageName,
                        imageUrl: response.data.imageUrl
                    })
                }
                else {
                    this.setState({
                        imageUrl: avatar
                    })
                }
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
            this.setState({
                imageName: values.imageName,
                imageUrl: values.imageUrl,
                name: values.name,
                instruction: values.instruction
            });
            let { imageName, imageUrl, name, instruction } = this.state

            const obj = {
                imageName,
                imageUrl,
                name, 
                instruction
            }

            axios
                .put('/api/exercise/detail/' + this.props.match.params.id, obj)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.error('Request failed', err.response)
                });

            setSubmitting(false)
        }
        return (
            <div className="content-wrapper">
                <div className="container-fluid mt-4">
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
        )
    }
}

export default ExerciseUpdateForm;