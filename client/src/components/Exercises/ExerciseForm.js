import React, { Component } from 'react';
import { Field } from 'formik';
import Select from 'react-select'
import axios from 'axios'
import avatar from '../../no-img.jpg'

import { storage } from '../../library/config/firebase-keys'
import FileUploader from 'react-firebase-file-uploader';


class ExerciseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageName: '',
            imageUrl: '',
            progress: 0,
            isUploading: false
        }

    }


    handleUploadStart = () => {
        this.setState({ progress: 0, isUploading: true })
        this.props.setSubmitting(true)
    }

    handleProgress = (progress) => this.setState({ progress, isUploading: true });

    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.error(error)
    }

    handleUploadSuccess = (filename) => {
        this.setState({ isUploading: false })
        storage
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.props.setValues({ ...this.props.values, imageName: filename, imageUrl: url })
                this.props.setSubmitting(false)
            });

    };

    deletePhoto = (event) => {
            this.props.setValues({
                ...this.props.values,
                imageName: '',
                imageUrl: avatar
            })
    };

    render() {
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
        } = this.props;


        return (
            <form onSubmit={handleSubmit}>

                <div className="row mt-2 mb-2">
                    <div className="col-md-7">
                        <h2 className="header-title">Exercise Detail Form</h2>
                        <p className="text-muted">Create or Update Exercises</p>
                    </div>
                    <div className="col-md-5 text-right">
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
                <div className="row">
                    <div className="col-md-3 text-center">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h4>Exercise Image</h4>
                                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                                    <br />

                                    {values.imageUrl ? <img src={values.imageUrl} className="avatar-img" /> : <img src={avatar} className="avatar-img" />}

                                    <br />
                                    <label className="btn btn-primary mt-3 mr-2">
                                        Upload Thumbnail
                                    <FileUploader
                                            hidden
                                            accept="image/*"
             
                                            name="imageName"
                                            randomizeFilename
                                            storageRef={storage.ref('images')}
                                            onUploadStart={this.handleUploadStart}
                                            onUploadError={this.handleUploadError}
                                            onUploadSuccess={this.handleUploadSuccess}
                                            onProgress={this.handleProgress}
                                        />
                                    </label>
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={this.deletePhoto}
                                        type="button"
                                        >
                                        Delete
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title">Exercise Details</h4>
                                <p className="text-muted">Enter exercise name and how to perform the exercise</p>


                                <div className="form-group">
                                    <label htmlFor="instruction">Instructions</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        name="name"
                                        placeholder="Enter Instructions on How to Perform the Exercise Here"
                                    />
                                    {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="instruction">Instructions</label>
                                    <Field
                                        type="text"
                                        rows="7"
                                        component="textarea"
                                        className="form-control"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.instruction}
                                        name="instruction"
                                        placeholder="Enter Instructions on How to Perform the Exercise Here"
                                    />
                                    {errors.instruction && touched.instruction && <div id="feedback">{errors.instruction}</div>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </form >
        );
    }
};




export default ExerciseForm