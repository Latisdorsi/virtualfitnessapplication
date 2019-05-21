import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class AccountCell extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);

        this.toggleDelete = this.toggleDelete.bind(this);
        this.startToolTip = this.startToolTip.bind(this);
        this.state = {
            active: false,
            modal: false,
            tooltipOpen: false,
            deleteModal: false
        }

        //this.ConfirmationModal = this.ConfirmationModal.bind(this);
    }

    componentDidMount = () => {
        if (this.props.user.active) {
            this.setState({ active: true })
        }
    };


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    startToolTip() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        })
    }

    toggleDelete() {
        this.setState(prevState => ({
            deleteModal: !prevState.deleteModal
        }))
    }

    delete() {
        axios.delete('/api/account/detail/' + this.props.user._id)
            .then(
                this.setState({
                    deleteModal: false
                })
            )
            .catch(err => console.log(err))
    }

    activate() {
        axios.put('/api/account/activate/' + this.props.user._id)
            .then(response => {
                this.setState({
                    active: true,
                    modal: false
                })
            })

    }

    deactivate() {
        axios.put('/api/account/deactivate/' + this.props.user._id)
            .then(response => {
                this.setState({
                    active: false,
                    modal: false
                })
            })

    }


    render() {
        const { user } = this.props;
        const ActivateUser = () => {
            return (
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Activate User</ModalHeader>
                    <ModalFooter>
                        <Button color="success" onClick={this.activate}>Activate</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )
        }
        const DeactivateUser = () => {
            return (
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Deactivate User</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deactivate}>Deactivate</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )
        }

        const DeleteModal = () => {
            return (
                <Modal isOpen={this.state.deleteModal} toggle={this.toggleDelete} className={this.props.className}>
                    <ModalHeader toggle={this.toggleDelete}>Delete User</ModalHeader>
                    <ModalBody>
                        This will completely delete the user from the system. Are you sure you want to delete user?
    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.delete}>Yes, please</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )
        }


        return (
            <tr>
                <td>{user.email}</td>
                <td>{user.name.firstName}</td>
                <td>{user.name.lastName}</td>
                <td>Registered: {user.createdDate} <br /> <strong>Active</strong>: {String(user.active)}</td>
                <td>
                    <Link to={"/account/edit/" + user._id}><i className="dripicons dripicons-pencil"></i></Link>&nbsp;
                    <DeleteModal />
                    <a onClick={this.toggleDelete}><i className="dripicons dripicons-trash"></i></a>
                </td>
                {user.role === 'member' &&
                    <td>
                        {
                            this.state.active ?
                                <div>
                                    <DeactivateUser />
                                    <button className="btn btn-success btn-active-custom" id={`activate-${user._id}`} onClick={this.toggle}>
                                        <i className="dripicons dripicons-checkmark"></i>
                                    </button>
                                    <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={`activate-${user._id}`} toggle={this.startToolTip}>
                                        Deactivate</Tooltip>
                                </div>
                                :
                                <div>
                                    <ActivateUser />
                                    <button className="btn btn-secondary btn-inactive-custom" id={`activate-${user._id}`} onClick={this.toggle}>
                                        <i className="dripicons dripicons-checkmark"></i>
                                    </button>
                                    <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={`activate-${user._id}`} toggle={this.startToolTip}>
                                        Activate</Tooltip>
                                </div>
                        }
                    </td>

                }

            </tr>
        )
    }
}

export default AccountCell
