import React, { Component } from 'react'

export class AccountForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            credentials:{
                email: '',
                password: '',
            },
            contactDetails:{
                firstName: '',
                middleInitial: '',
                lastName: '',
                address: '',
                mobilePhone: '',
                homePhone: '',
                workPhone: '',
            },
            contactEmergency:{
                fullName: '',
                number: '',
                relationship: ''
            }

        }
    }
    render() {
        const roles = ['admin', 'manager', 'trainer', 'member'];
        const selectRoles =
            roles.map(role => {
                return (
                    <option value="">{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                )
            });

        return (
            <div className="content-wrapper">
                <div class="container-fluid mt-4">
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
                            <button type="submit" className="btn btn-primary float-lg-right btn-custom mt-3">
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
                                        <label for="email">Email</label>
                                        <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email"
                                            value="" />
                                    </div>
                                    <div className="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" id="password" name="password" className="form-control"
                                            placeholder="Create Password" value="" />
                                    </div>
                                    <div className="form-group">
                                        <label for="password2">Confirm Password</label>
                                        <input type="password" id="password2" name="password2" className="form-control"
                                            placeholder="Confirm Password" value="" />
                                    </div>
                                    <div className="form-group">
                                        <label for="role">Select User Role</label>
                                        <select id="role" name="role">
                                            <option value="">Select Role</option>
                                            {selectRoles}
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
                                        <label for="firstName">First Name</label>
                                        <input type="name" id="firstName" name="firstName" className="form-control" placeholder="Enter First Name"
                                            value="" />
                                    </div>
                                    <div className="form-group">
                                        <label for="middleName">Middle Initial</label>
                                        <input type="name" id="middleName" name="middleName" className="form-control"
                                            placeholder="Enter Middle Initial"
                                            value="" />
                                    </div>
                                    <div className="form-group">
                                        <label for="lastName">Last Name</label>
                                        <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Last Name"
                                            value="" />
                                    </div>

                                    <div className="form-group">
                                        <label for="lastName">Address</label>
                                        <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Address"
                                            value="" />
                                    </div>

                                    <div className="form-group">
                                        <label for="lastName">Mobile Phone</label>
                                        <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Last Name"
                                            value="" />
                                    </div>

                                    <div className="form-group">
                                        <label for="lastName">Home Phone</label>
                                        <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Last Name"
                                            value="" />
                                    </div>

                                    <div className="form-group">
                                        <label for="lastName">Work Phone</label>
                                        <input type="name" id="lastName" name="lastName" className="form-control" placeholder="Enter Last Name"
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
                                        <label for="firstName">Full Name</label>
                                        <input type="name" id="firstName" name="firstName" className="form-control" placeholder="Enter First Name"
                                            value="" />
                                    </div>


                                    <div className="form-group">
                                        <label for="firstName">Contact Number</label>
                                        <input type="name" id="firstName" name="firstName" className="form-control" placeholder="Enter First Name"
                                            value="" />
                                    </div>

                                    <div className="form-group">
                                        <label for="firstName">Relationship</label>
                                        <input type="name" id="firstName" name="firstName" className="form-control" placeholder="Enter First Name"
                                            value="" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </div>
        )
    }
}

export default AccountForm
