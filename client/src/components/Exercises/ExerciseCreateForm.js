import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import ExerciseForm from './ExerciseForm';
import axios from 'axios'
import avatar from '../../no-img.jpg'
import {Alert, Fade} from 'reactstrap'
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
            alertMssg: []
        }
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

    pushAlertMessage = (mssg, type) => {
        this.setState({
            alertMssg: [
                ...this.state.alertMssg,
                { mssg, type }
            ]
        });
    }

    render() {
        const validationSchema = Yup.object().shape({
            name: Yup.string("Enter a name")
                .min(3, "Minimum of 3 Characters required for exercise")
                .max(50, "Maximums of 5 characters allowed for exercise")
                .required("Name is required"),
            videoURL: Yup.string().url("Enter a valid URL"),

        });

        const createExercise = (values, { setSubmitting, resetForm }) => {
            let { imageName, imageUrl, name, instruction } = values

            const obj = {
                imageName,
                imageUrl,
                name,
                instruction
            };

            axios.post('/api/exercise/create', obj)
                .then(response => {
                    resetForm();
                    this.pushAlertMessage('Exercise Successfully Created', 'success');
                    setSubmitting(false);
                })
                .catch(err => {
                    console.error('Request failed', err.response)
                });
        }

        return (
            <div className="content-wrapper">
                {this.displayAlertMessage()}
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