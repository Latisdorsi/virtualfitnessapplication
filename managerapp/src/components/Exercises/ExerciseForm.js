import React, { Component } from 'react';
import { Field } from 'formik';
import  Select from 'react-select'

const ExerciseForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        isSubmitting, 
        dirty,
        handleReset,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
    } = props;
    return (
        <form onSubmit={handleSubmit}>
            <h4 className="header-title">Exercise</h4>
            <p className="text-muted">Enter your user credentials</p>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    name="name"
                    placeholder="Enter Exercise Name"
                />
                {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="videoURL">Video URL</label>
                <Field
                    type="url"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.videoURL}
                    name="videoURL"
                    placeholder="Enter Video URL"
                />
                {errors.videoURL && touched.videoURL && <div id="feedback">{errors.videoURL}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="categoryName">Category Name</label>
                <Field
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.categoryName}
                    name="categoryName"
                    placeholder="Enter Category Name"
                />
                {errors.categoryName && touched.categoryName && <div id="feedback">{errors.categoryName}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="name">Category Rate</label>
                <Field
                    type="number"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.categoryRate}
                    name="categoryRate"
                    placeholder="Enter Category Rate"
                />
                {errors.categoryRate && touched.categoryRate && <div id="feedback">{errors.categoryRate}</div>}
            </div>
            <MySelect
                value={values.goal}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.goal}
                touched={touched.goal}
            />
                   <div className="col-md-4 offset-md-9">
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
        </form>
    );
};

const options = [
    { value: "Food", label: "Food" },
    { value: "Being Fabulous", label: "Being Fabulous" },
    { value: "Ken Wheeler", label: "Ken Wheeler" },
    { value: "ReasonML", label: "ReasonML" },
    { value: "Unicorns", label: "Unicorns" },
    { value: "Kittens", label: "Kittens" }
];


class MySelect extends Component {
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange("goal", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("goal", true);
    };

    render() {
        return (
            <div style={{ margin: "1rem 0" }}>
                <label htmlFor="color">Goal</label>
                <Select
                    id="color"
                    isMulti
                    options={options}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                />
                {!!this.props.error && this.props.touched && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                        {this.props.error}
                    </div>
                )}
            </div>
        );
    }
}

export default ExerciseForm