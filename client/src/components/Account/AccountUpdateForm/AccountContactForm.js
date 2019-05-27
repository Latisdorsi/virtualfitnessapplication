import React, { Component } from 'react';
import { Field } from 'formik';
import Select from 'react-select'

const AccountContactForm = props => {
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
            <h4 className="header-title">Contact Details</h4>
            <p className="text-muted">Let us know how to contact this person.</p>

            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    name="address"
                    placeholder="Enter Your Adress" /> {errors.address && touched.address && <div id="feedback">{errors.address}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="mobilePhone">Mobile Phone</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobilePhone}
                    name="mobilePhone"
                    placeholder="Enter Mobile Phone Number" /> {errors.mobilePhone && touched.mobilePhone && <div id="feedback">{errors.mobilePhone}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="homePhone">Home Phone</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.homePhone}
                    name="homePhone"
                    placeholder="Enter Your Home Phone Number" /> {errors.homePhone && touched.homePhone && <div id="feedback">{errors.homePhone}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="workPhone">Work Phone</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.workPhone}
                    name="workPhone"
                    placeholder="Enter Your Last Name" /> {errors.workPhone && touched.workPhone && <div id="feedback">{errors.workPhone}</div>}
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

export default AccountContactForm