import React, {Component} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup'
import AccountCreateForm from './AccountCreateForm';
import axios from 'axios'

export class AccountCreatePage extends Component {

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

        const createAccount = (values, {setSubmitting}) => {
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
                                <h4 className="page-title">Create User Account</h4>
                            </div>
                            <p className="text-muted">Enter the user credentials and details to create a new user</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <Formik
                                        initialValues={{
                                        email: '',
                                        password: '',
                                        password2: '',
                                        firstName: '',
                                        lastName: '',
                                        middleInitial: '',
                                        address: '',
                                        mobilePhone: '',
                                        homePhone: '',
                                        workPhone: '',
                                        emergencyFullName: '',
                                        emergencyNumber: '',
                                        emergencyRelationship: ''
                                    }}
                                        render={props => <AccountCreateForm {...props}/>}
                                        validationSchema={validationSchema}
                                        onSubmit={createAccount}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountCreatePage
