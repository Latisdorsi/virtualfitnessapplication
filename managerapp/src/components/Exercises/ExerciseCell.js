import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export class ExerciseCell extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete = (event) => {

        axios.delete('http://localhost:3000/exercise/detail/' + this.props.exercise._id)
            .then(
                this.props.renderExercises(event)
            )
            .catch(err => console.log(err))

    }
    render() {
        const { exercise } = this.props;
        return (
            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.instruction}</td>
                <td>
                    <Link to={"/exercise/edit/" + exercise._id}><i className="dripicons dripicons-pencil"></i></Link>&nbsp;
                    <Link onClick={this.delete}><i className="dripicons dripicons-trash"></i></Link>
                </td>
            </tr>
        )
    }
}

export default ExerciseCell
