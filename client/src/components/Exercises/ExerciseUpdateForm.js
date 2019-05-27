import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import ExerciseForm from './ExerciseForm';
import axios from 'axios'
import avatar from '../../no-img.jpg'
import {Fade, Alert} from 'reactstrap'

export class ExerciseUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Exercise Image Details
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

    componentDidMount() {
        axios
            .get('/api/exercise/detail/' + this.props.match.params.id)
            .then(response => {
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
                    this.pushAlertMessage('Exercise Successfully Updated', 'success');
                })
                .catch(err => {
                    this.pushAlertMessage('Update Error: Please Check Your Fields')
                });

            setSubmitting(false)
        }
        return (
            <div className="content-wrapper">
                {this.displayAlertMessage()}
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