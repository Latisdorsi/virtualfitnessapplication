import React, { Component } from 'react';
import { Field } from 'formik';
import Select from 'react-select'

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

            <h4 className="header-title">Emergency Contact Details</h4>
            <p className="text-muted">Who do we contact during emergencies?</p>
            <div className="form-group">
                <label htmlFor="emergencyFullName">Full Name</label>
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
                <label htmlFor="mergencyNumbere">Contact Number</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emergencyNumber}
                    name="emergencyNumber"
                    placeholder="Enter their contact number" /> {errors.emergencyNumber && touched.emergencyNumber && <div id="feedback">{errors.emergencyNumber}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="emergencyRelationship">Relationship</label>
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
                <div className="col-md-6 offset-md-6 text-right">
                    <button
                        type="submit"
                        className="btn btn-primary btn-custom mt-3"
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

export default AccountCredentialsForm