import React, { Component } from 'react';
import { Field } from 'formik';
import Select from 'react-select'


const options = [
    {
        value: "manager",
        label: "Manager"
    }, {
        value: "member",
        label: "Member"
    }
];

const AccountCredentialsForm = props => {
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
            <p className="text-muted">Update your user information</p>
            <div className="form-group">
                <label htmlFor="name">Email</label>
                <Field
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    placeholder="Enter Email Address" /> {errors.email && touched.email && <div id="feedback">{errors.email}</div>}
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
                    placeholder="Enter Password" /> {errors.password && touched.password && <div id="feedback">{errors.password}</div>}
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
                    placeholder="Enter First Name" /> {errors.firstName && touched.firstName && <div id="feedback">{errors.firstName}</div>}
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
                    placeholder="Enter Your Last Name" /> {errors.categoryRate && touched.categoryRate && <div id="feedback">{errors.categoryRate}</div>}
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
                    placeholder="Enter Your Last Name" /> {errors.middleInitial && touched.middleInitial && <div id="feedback">{errors.middleInitial}</div>}
            </div>
            <MySelect
                value={values.role}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.role}
                touched={touched.role} />
            <div className="row">
                <div className="col-md-8">
                    <div className="form-check">
                        <Field
                            type="checkbox"
                            class="form-check-input"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.active}
                            value={values.active}
                            name="active" />
                        <label class="form-check-label" for="active">Active</label>
                    </div>
                </div>
                <div className="col-md-4 text-right">
                    <button
                        type="submit"
                        className="btn btn-primary btn-custom"
                        disabled={isSubmitting}>
                        {!isSubmitting
                            ? 'Update'
                            : 'Saving...'}
                    </button>
                </div>
            </div>
        </form >
    );
};


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

export default AccountCredentialsForm