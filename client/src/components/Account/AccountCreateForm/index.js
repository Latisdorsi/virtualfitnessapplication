import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import AccountCreateForm from './AccountCreateForm';
import axios from 'axios'
import { Alert, Fade } from 'reactstrap'

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
            isSuccessful: false,
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


    displayAlertMessage = (index) => {

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

        const validationSchema = Yup
            .object()
            .shape({
                email: Yup
                    .string("Enter an email")
                    .email("Email is not a valid Email")
                    .required('Email is required'),
                firstName: Yup
                    .string("Enter a name")
                    .min(3, "Minimum of 3 Characters required for First Name")
                    .max(50, "Maximum of 5 characters allowed for First Name")
                    .required("First name is required"),
                lastName: Yup
                    .string("Enter a name")
                    .min(3, "Minimum of 3 Characters required for Last Name")
                    .max(50, "Maximums of 5 characters allowed for Last Name")
                    .required("Last name is required"),
                middleInitial: Yup
                    .string("Enter a name")
                    .max(1, "Maximum of 1 character allowed for Middle Initial"),
                homePhone: Yup
                    .string()
                    .matches(phoneRegExp, 'Phone number is not valid'),
                emergencyFullName: Yup
                    .string("Enter a name")
                    .min(3, "Minimum of 3 Characters required for Emergency Name")
                    .max(50, "Maximum of 5 characters allowed for Emergency Name"),
                emergencyFullName: Yup
                    .string("Enter a emergency realtionship")
                    .min(3, "Minimum of 3 Characters required for Emergency Relationship")
                    .max(50, "Maximum of 5 characters allowed for Emergency Relationship")

            });




        const createAccount = (values, { setSubmitting, resetForm }) => {
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


            axios
                .post('/api/account/create', obj)
                .then(response => {
                    resetForm();
                    this.pushAlertMessage('Account Successfully Created', 'success');
                })
                .catch(err => {
                    this.pushAlertMessage(err.response.data.error, 'danger');
                });
            setSubmitting(false);
        }


        return (
            <div className="content-wrapper">

                {this.displayAlertMessage()}

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
