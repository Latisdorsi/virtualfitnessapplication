import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import ExerciseForm from './ExerciseForm';
import axios from 'axios'
import avatar from '../../no-img.jpg'

export class ExerciseCreateForm extends Component {
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
    render() {
        const validationSchema = Yup.object().shape({
            name: Yup.string("Enter a name")
                .min(3, "Minimum of 3 Characters required for exercise")
                .max(50, "Maximums of 5 characters allowed for exercise")
                .required("Name is required"),
            videoURL: Yup.string().url("Enter a valid URL"),

        });

        const createExercise = (values, { setSubmitting }) => {
            let {imageName, imageUrl, name, instruction} = values

            const obj = {
                imageName,
                imageUrl,
                name,
                instruction
            };
            console.log(obj)
     
            axios.post('/api/exercise/create', obj)
                .then(response => {
                    console.log(response)
                    this.setState({
                        imageName: '',
                        imageUrl: avatar,
                        name: '',
                        instruction: '',
                    })
                })
                .catch(err => {
                    console.error('Request failed', err.response)
                });
            setSubmitting(false)
        }

        return (
            <div className="content-wrapper">

                <div className="card-body">
                    <Formik
                        initialValues={{
                            ...this.state
                        }}
                        render={props => <ExerciseForm {...props} />}
                        validationSchema={validationSchema}
                        onSubmit={createExercise}
                    />
                </div>
            </div>

        )
    }
}

export default ExerciseCreateForm