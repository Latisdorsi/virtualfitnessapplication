import React, { Component } from 'react';
import { Field } from 'formik';
import Select from 'react-select'

const AccountCreateForm = props => {
    const {
        values,
        touched,
        dirty,
        errors,
        handleChange,
        handleBlur,
        handleReset,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting
    } = props;
    return (
        <form onSubmit={handleSubmit}>
            <h4 className="header-title">Account Credentials</h4>
            <p className="text-muted">Enter the User's unique information
            </p>
            <div className="form-group">
                <label htmlFor="name">Email</label>
                <Field
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    placeholder="Enter Email Address" /> {errors.email && touched.email && <div id="feedback" className="errorMessage">{errors.email}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    name="password"
                    placeholder="Enter Password" /> {errors.password && touched.password && <div id="feedback" className="errorMessage">{errors.password}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <Field
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password2}
                    name="password2"
                    placeholder="Repeat Password" /> {errors.password2 && touched.password2 && <div id="feedback" className="errorMessage">{errors.password2}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    name="firstName"
                    placeholder="Enter First Name" /> {errors.firstName && touched.firstName && <div id="feedback" className="errorMessage">{errors.firstName}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    name="lastName"
                    placeholder="Enter Your Last Name" /> {errors.lastName && touched.lastName && <div id="feedback" className="errorMessage">{errors.lastName}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="middleInitial">Middle Initial</label>

                <Field
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.middleInitial}
                    name="middleInitial"
                    maxLength="1"

                    placeholder="Enter Your Last Initial" /> {errors.middleInitial && touched.middleInitial && <div id="feedback" className="errorMessage">{errors.middleInitial}</div>}
            </div>
            <MySelect
                value={values.role}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.role}
                touched={touched.role} />

            <div className="form-check mt-4 mb-4">
                <Field
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.active}
                    value={values.active}
                    name="active" />
                <label className="form-check-label" htmlFor="active">Active</label>
            </div>

            <h4 className="header-title">Contact Details</h4>
            <p className="text-muted">How can we contact this user?</p>

            <div className="form-group">
                <label htmlFor="address">Address
                    <span className="optionalSpan"> optional</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    name="address"
                    placeholder="Enter Your Adress" /> {errors.address && touched.address && <div id="feedback">{errors.address}</div>}
                <input type="text" value="NCR, Philippines" className="form-control" disabled="true" />
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="mobilePhone">Mobile Phone
                    <span className="optionalSpan"> optional</span>
                        </label>
                        <div>
                            <input
                                type="tel"
                                className="form-control"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mobilePhone}
                                name="mobilePhone"
                                placeholder="Enter Mobile Phone Number" /> {errors.mobilePhone && touched.mobilePhone && <div id="feedback">{errors.mobilePhone}</div>}
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="homePhone">Home Phone
                    <span className="optionalSpan"> optional</span>
                        </label>
                        <div>
                            <input
                                type="tel"
                                className="form-control"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.homePhone}
                                name="homePhone"
                                placeholder="Enter Your Home Phone Number" /> {errors.homePhone && touched.homePhone && <div id="feedback">{errors.homePhone}</div>}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="workPhone">Work Phone
                    <span className="optionalSpan"> optional</span>
                        </label>
                        <div>
                            <input
                                type="tel"
                                className="form-control"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.workPhone}
                                name="workPhone"
                                placeholder="Enter Your Work Phone Number" /> {errors.workPhone && touched.workPhone && <div id="feedback">{errors.workPhone}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <h4 className="header-title">Emergency Contact Details</h4>
            <p className="text-muted">Who do we look for in case of emergency?</p>
            <div className="form-group">
                <label htmlFor="emergencyFullName">Full Name
                    <span className="optionalSpan"> optional</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emergencyFullName}
                    name="emergencyFullName"
                    placeholder="Enter Your Last Name" /> {errors.emergencyFullName && touched.emergencyFullName && <div id="feedback">{errors.emergencyFullName}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="emergencyNumber">Contact Number
                    <span className="optionalSpan">optional</span>
                </label>
                <input
                    type="tel"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emergencyNumber}
                    name="emergencyNumber"
                    placeholder="Enter their contact number" /> {errors.emergencyNumber && touched.emergencyNumber && <div id="feedback">{errors.emergencyNumber}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="emergencyRelationship">Relationship
                    <span className="optionalSpan"> optional</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emergencyRelationship}
                    name="emergencyRelationship"
                    placeholder="Enter Your Last Name" /> {errors.emergencyRelationship && touched.emergencyRelationship && <div id="feedback">{errors.emergencyRelationship}</div>}
            </div>
            <div className="row">
                <div className="col-md-5 offset-md-7 text-right">
                    <button
                        type="button"
                        className="btn btn-primary  btn-custom mt-3 mr-1"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}>
                        Reset
                </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-custom mt-3"
                        disabled={isSubmitting}>
                        {!isSubmitting
                            ? 'Save'
                            : 'Saving...'}
                    </button>
                </div>
            </div>
        </form >
    );
};

const options = [
    {
        value: "manager",
        label: "Manager"
    }, {
        value: "member",
        label: "Member"
    }
];

class MySelect extends Component {
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this
            .props
            .onChange("role", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this
            .props
            .onBlur("role", true);
    };

    render() {
        return (
            <div style={{
                margin: "1rem 0"
            }}>
                <label htmlFor="color">Role</label>
                <Select
                    id="color"
                    options={options}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value} /> {!!this.props.error && this.props.touched && (
                        <div
                            style={{
                                color: "red",
                                marginTop: ".5rem"
                            }}>
                            {this.props.error}
                        </div>
                    )}
            </div>
        );
    }
}

export default AccountCreateForm