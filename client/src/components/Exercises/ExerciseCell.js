import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ExerciseCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModal: false
        };
        this.delete = this.delete.bind(this);
    }

    delete = (event) => {
        axios.delete('/api/exercise/detail/' + this.props.exercise._id)
            .then(
                this.props.pushAlertMessage('Exercise Successfully Deleted', 'danger')
            )
            .catch(err => console.log(err))
    }

    toggleDeleteModalState = () => {
        this.setState(prevState => ({
            deleteModal: !prevState.deleteModal
        }));
    }


    render() {
        const { exercise } = this.props;

        const DeleteModal = () => {
            return (
                <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModalState} className={this.props.className}>
                    <ModalHeader toggle={this.toggleDeleteModalState}>Delete User</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this exercise?
    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.delete}>Yes, please</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDeleteModalState}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )
        }

        return (
            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.instruction}</td>
                <td>
                    <Link to={"/exercise/edit/" + exercise._id} className="btnCell"><i className="dripicons dripicons-pencil"></i></Link>&nbsp;
                    <DeleteModal />
                    <button onClick={this.toggleDeleteModalState} className="btnCell"><i className="dripicons dripicons-trash"></i></button>
                </td>
            </tr>
        )
    }
}

export default ExerciseCell
