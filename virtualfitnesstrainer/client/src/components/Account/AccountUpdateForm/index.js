import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import CredentialsForm from './AccountCredentialsForm';
import ContactForm from './AccountContactForm';
import EmergencyForm from './AccountEmergencyForm';
import { Alert } from 'reactstrap'


import { storage } from '../../../library/config/firebase-keys'
import FileUploader from 'react-firebase-file-uploader';

import avatar from '../../../library/res/avatar.png'

export default class AccountUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //Avatar
            avatar: '',
            isUploading: false,
            progress: 0,
            avatarURL: avatar,

            //Fields
            email: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            active: false,
            role: 'member',
            address: '',
            mobilePhone: '',
            homePhone: '',
            workPhone: '',
            emergencyFullName: '',
            emergencyNumber: '',
            emergencyRelationship: ''
        }
    }
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = (progress) => this.setState({ progress });

    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.error(error)
    }

    handleUploadSuccess = (filename) => {

        this.setState({ avatar: filename, progress: 100, isUploading: false });

        storage
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({ avatarURL: url })

                axios.put('http://localhost:3000/account/detail/' + this.props.match.params.id + '/avatar', { avatarURL: url })
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.error(error)
                    })

            });

    };
    deletePhoto = (event) => {
        axios.put('http://localhost:3000/account/detail/' + this.props.match.params.id + '/avatar', { avatarURL: '' })
            .then(response => {
                storage.refFromURL(this.state.avatarURL).delete()
                this.setState({
                    avatarURL: avatar
                })
            })
            .catch(err => {
                console.error(err)
            })



    };
    componentDidMount() {
        axios
            .get('http://localhost:3000/account/detail/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    email: response.data.email,
                    password: response.data.password,
                    firstName: response.data.name.firstName,
                    lastName: response.data.name.lastName,
                    role: response.data.role,
                    active: response.data.active
                });
                if (typeof response.data.avatarURL != "undefined" && !(response.data.avatarURL === "")) {
                    this.setState({
                        avatarURL: response.data.avatarURL
                    })
                }
                else {
                    this.setState({
                        avatarURL: avatar
                    })
                }
                if (typeof response.data.contactDetails != "undefined") {
                    this.setState({
                        address: response.data.contactDetails.address,
                        mobilePhone: response.data.contactDetails.phone.mobile,
                        homePhone: response.data.contactDetails.phone.home,
                        workPhone: response.data.contactDetails.phone.work
                    })
                }
                if (typeof response.data.emergencyContact != "undefined") {
                    this.setState({
                        emergencyFullName: response.data.emergencyContact.fullName,
                        emergencyNumber: response.data.emergencyContact.contactNumber,
                        emergencyRelationship: response.data.emergencyContact.relationship
                    })
                }

                console.log(this.state)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {

        const validationSchema = Yup
            .object()
            .shape({
                firstName: Yup
                    .string("Enter a name")
                    .min(3, "Minimum of 3 Characters required for exercise")
                    .max(50, "Maximums of 5 characters allowed for exercise")
                    .required("Name is required")
            });

        const updateAccountContact = (values, { setSubmitting }) => {
            const obj = {
                address: values.address,
                mobile: values.mobilePhone,
                home: values.homePhone,
                work: values.workPhone
            }
            console.log(obj)
            axios
                .put('/account/detail/' + this.props.match.params.id + '/contact', obj)
                .then(response => {
                    setSubmitting(false);
                    console.log(response)
                })
                .catch(err => {
                    console.error('Request failed', err.response)
                });
        }

        const updateAccountEmergency = (values, { setSubmitting }) => {
            const obj = {
                emergencyFullName: values.emergencyFullName,
                emergencyNumber: values.emergencyNumber,
                emergencyRelationship: values.emergencyRelationship
            }
            console.log(obj)
            axios
                .put('/account/detail/' + this.props.match.params.id + '/emergency', obj)
                .then(response => {
                    setSubmitting(false);
                    console.log(response)
                })
                .catch(err => {
                    console.error('Request failed', err.response)
                });
        }

        const updateAccount = (values, { setSubmitting }) => {
            const obj = {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                middleInitial: values.middleInitial,
                role: values.role.value,
                active: values.active,
            };
            console.log(obj)
            axios
                .put('/account/detail/' + this.props.match.params.id, obj)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.error('Request failed', err.response)
                });
        }
        return (
            <div className="content-wrapper">
                <div className="container-fluid mt-4 mb-4">
                    <div className="row mt-4 mb-2">
                        <div className="col-md-9">
                            <div className="page-title-wrapper">
                                <h4 className="page-title">Update User Account</h4>
                            </div>
                            <p className="text-muted">Enter the user credentials and details to create a new user</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h4>Profile Picture</h4>
                                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}

                                    {this.state.avatarURL && <img src={this.state.avatarURL} className="avatar-img rounded-corner" />}
                                    <label className="btn btn-primary mt-3 mr-2">

                                        Change Avatar
                                        <FileUploader
                                            hidden
                                            accept="image/*"
                                            filename={file => this.state.email + file
                                                .name
                                                .split('.')[1]}
                                            name="avatar"
                                            randomizeFilename
                                            storageRef={storage.ref('images')}
                                            onUploadStart={this.handleUploadStart}
                                            onUploadError={this.handleUploadError}
                                            onUploadSuccess={this.handleUploadSuccess}
                                            onProgress={this.handleProgress} />
                                    </label>
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={this.deletePhoto}
                                        filename={file => this.state.email + file
                                            .name
                                            .split('.')[1]}>Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <Alert color="success">
                                        Account credentials successfully updated
                                    </Alert>

                                    <Formik
                                        enableReinitialize="true"
                                        initialValues={{
                                            email: this.state.email,
                                            password: this.state.password,
                                            firstName: this.state.firstName,
                                            lastName: this.state.lastName,
                                            middleInitial: this.state.middleInitial,
                                            role: this.state.role,
                                            active: this.state.active
                                        }}
                                        render={props => <CredentialsForm {...props} />}
                                        validationSchema={validationSchema}
                                        onSubmit={updateAccount} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4 mb-4">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <Alert color="success">
                                        Account credentials successfully updated
                                    </Alert>
                                    <Formik
                                        enableReinitialize="true"
                                        initialValues={{
                                            address: this.state.address,
                                            mobilePhone: this.state.mobilePhone,
                                            homePhone: this.state.homePhone,
                                            workPhone: this.state.workPhone
                                        }}
                                        render={props => <ContactForm {...props} />}

                                        onSubmit={updateAccountContact} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <Alert color="success">
                                        Account credentials successfully updated
                                    </Alert>
                                    <Formik
                                        enableReinitialize="true"
                                        initialValues={{
                                            emergencyFullName: this.state.emergencyFullName,
                                            emergencyNumber: this.state.emergencyNumber,
                                            emergencyRelationship: this.state.emergencyRelationship
                                        }}
                                        render={props => <EmergencyForm {...props} />}
                                        onSubmit={updateAccountEmergency} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
