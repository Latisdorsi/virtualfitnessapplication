import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import AccountCreateForm from './AccountCreateForm';
import axios from 'axios'
import { Alert } from 'reactstrap'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export class AccountCreatePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            middleInitial: '',
            active: false,
            role: 'member',
            address: '',
            mobilePhone: '',
            homePhone: '',
            workPhone: '',
            emergencyFullName: '',
            emergencyNumber: '',
            emergencyRelationship: '',
            isSuccessful: false
        }
    }


    onSuccess = () => (
        this.state.isSuccessful ?
            <Alert color="success">
                User successfully created
             </Alert>
            :
            null
    )


    render() {

        const validationSchema = Yup
            .object()
            .shape({
                email: Yup
                    .string("Enter an email")
                    .email("Value is not a proper email")
                    .required('Email is required'),
                firstName: Yup
                    .string("Enter a name")
                    .min(3, "Minimum of 3 Characters required for first name")
                    .max(50, "Maximums of 5 characters allowed for first name")
                    .required("First name is required"),
                lastName: Yup
                    .string("Enter a name")
                    .min(3, "Minimum of 3 Characters required for last name")
                    .max(50, "Maximums of 5 characters allowed for last name")
                    .required("Last name is required"),
                middleInitial: Yup
                    .string("Enter a name")
                    .max(1, "Maximum of 1 character allowed for middle initial"),
                homePhone: Yup
                    .string()
                    .matches(phoneRegExp, 'Phone number is not valid'),
                emergencyFullName: Yup
                    .string("Enter a name")
                    .min(3, "Minimum of 3 Characters required for emergency name")
                    .max(50, "Maximums of 5 characters allowed for emergency name"),
                emergencyFullName: Yup
                    .string("Enter a emergency realtionship")
                    .min(3, "Minimum of 3 Characters required for emergency relationship")
                    .max(50, "Maximums of 5 characters allowed for emergency relationship")

            });




        const createAccount = (values, { setSubmitting }) => {
            const obj = {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                middleInitial: values.middleInitial,
                role: values.role.value,
                active: values.active,
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
                .post('/account/create', obj)
                .then(response => {
                    this.setState({
                        email: '',
                        password: '',
                        password2: '',
                        firstName: '',
                        lastName: '',
                        middleInitial: '',
                        active: false,
                        role: 'member',
                        isSuccessful: true
                    })
                })
                .catch(err => {
                    console.error('Request failed', err.response)
                });

            setSubmitting(false)
        }

        return (
            <div className="content-wrapper">
                <div className="container-fluid mt-4 mb-4">
                    {this.onSuccess()}
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
                                            ...this.state
                                        }}
                                        render={props => <AccountCreateForm {...props} />}
                                        validationSchema={validationSchema}
                                        onSubmit={createAccount} />
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
