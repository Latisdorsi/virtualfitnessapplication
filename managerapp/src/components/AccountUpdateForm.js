import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import CredentialsForm from './AccountUpdateForms/AccountCredentialsForm';
import ContactForm from './AccountUpdateForms/AccountContactForm';
import EmergencyForm from './AccountUpdateForms/AccountEmergencyForm';
import axios from 'axios'
import avatar from '../avatar.png'

import { storage } from '../config/firebase-keys'
import FileUploader from 'react-firebase-file-uploader';

export class AccountUpdateForm extends Component {

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
                    role: response.data.role
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
                        emergencyRelationship: response.data.emergencyContact.relationship })
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
                .put('http://localhost:3000/account/detail/' + this.props.match.params.id + '/contact', obj)
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
                .put('http://localhost:3000/account/detail/' + this.props.match.params.id + '/emergency', obj)
                .then(response => {
                    setSubmitting(false);
                    console.log(response)
                })
                .catch(err => {
                    console.error('Request failed', err.response)
                });
        }

        const createAccount = (values, { setSubmitting }) => {
            const obj = {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                middleInitial: values.middleInitial,
                role: values.role.value,
                address: values.address,
                mobile: values.mobilePhone,
                home: values.homePhone,
                work: values.workPhone,
                emergencyFullName: values.emergencyFullName,
                emergencyNumber: values.emergencyNumber,
                emergencyRelationship: values.emergencyRelationship
            };
            console.log(obj)
            axios
                .post('http://localhost:3000/account/create', obj)
                .then(response => {
                    console.log(response)
                    this.setState({
                        email: '',
                        password: '',
                        password2: '',
                        firstName: '',
                        lastName: '',
                        middleInitial: '',
                        role: 'member'
                    })
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
                                    {this.state.avatarURL && <img src={this.state.avatarURL} className="avatar-img" />}
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
                                    <Formik
                                        enableReinitialize="true"
                                        initialValues={{
                                            email: this.state.email,
                                            password: this.state.password,
                                            firstName: this.state.firstName,
                                            lastName: this.state.lastName,
                                            middleInitial: this.state.middleInitial,
                                            role: this.state.role
                                        }}
                                        render={props => <CredentialsForm {...props} />}
                                        validationSchema={validationSchema}
                                        onSubmit={createAccount} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4 mb-4">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
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

export default AccountUpdateForm

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
            email: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            role: 'member'
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    componentDidMount() {

        axios.get('http://localhost:3000/account/detail/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    email: response.data.email,
                    password: response.data.password,
                    firstName: response.data.name.firstName,
                    lastName: response.data.name.lastName,
                    role: response.data.role
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
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            role: this.state.role
        };
        axios.put('http://localhost:3000/account/detail/' + this.props.match.params.id, obj)
            .then(response => {
                this.setState({
                    email: response.data.email,
                    password: response.data.password,
                    firstName: response.data.name.firstName,
                    lastName: response.data.name.lastName,
                    role: response.data.role
                })
            })
            .catch(function (error) {
                console.log(error);
            })


    }
    delete() {
        axios.delete('http://localhost:3000/account/detail/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    email: '',
                    password: '',
                    password2: '',
                    firstName: '',
                    lastName: '',
                    role: 'member'

                })
            })
            .catch(err => console.log(err))

    }

    render() {
        const { email, password, password2, firstName, lastName, role } = this.state

        return (
            <div className="content-wrapper">
                <div className="container-fluid mt-4">
                    <form onSubmit={this.onSubmit} method="post">
                        <div className="row mt-4 mb-2">
                            <div className="col-md-9">
                                <div className="page-title-wrapper">
                                    <h4 className="page-title">Account Details</h4>
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

                                        <h4 className="header-title">User Credentials</h4>
                                        <p className="text-muted">Enter your user credentials</p>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email"
                                                value={email} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" name="password" className="form-control"
                                                placeholder="Create Password" value={password} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password2">Confirm Password</label>
                                            <input type="password" id="password2" name="password2" className="form-control"
                                                placeholder="Confirm Password" value={password2} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="role">Select User Role</label>
                                            <select id="role" name="role" onChange={this.handleChange} value={role}>
                                                <option value="manager">Manager</option>
                                                <option value="trainer">Trainer</option>
                                                <option value="member">Member</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row mt-4 mb-4">

                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="header-title">Contact Details</h4>
                                        <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="name" id="firstName" name="firstName" className="form-control" placeholder="Enter First Name"
                                                value={firstName} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="middleName">Middle Initial</label>
                                            <input type="name" id="middleName" name="middleName" className="form-control"
                                                placeholder="Enter Middle Initial"
                                                value="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Last Name"
                                                value={lastName} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastName">Address</label>
                                            <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Address"
                                                value="" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastName">Mobile Phone</label>
                                            <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Mobile Phone"
                                                value="" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastName">Home Phone</label>
                                            <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Home Phone"
                                                value="" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastName">Work Phone</label>
                                            <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Work Phone"
                                                value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="header-title">Emergency Contact</h4>
                                        <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                        <div className="form-group">
                                            <label htmlFor="firstName">Full Name</label>
                                            <input type="name" id="firstName" name="firstName" className="form-control" placeholder="Enter Full Name"
                                                value="" />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="firstName">Contact Number</label>
                                            <input type="name" id="firstName" name="firstName" className="form-control" placeholder="Enter Contact Number"
                                                value="" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="firstName">Relationship</label>
                                            <input type="name" id="firstName" name="firstName" className="form-control" placeholder="Enter Relationship"
                                                value="" />
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