import React, { Component } from 'react'
import accountCell from './accountCell'
import axios from 'axios';

const tableCell = props => (
    <tr>
        {this.props}
    </tr>
)

export class ManagerAccounts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            managers: []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:3000/account/list/manager')
            .then(response => {
                this.setState({ managers: response.data })
            })
            .catch(err => {
                console.error(err)
            })
    }

    populateTable() {
        console.log(this.state.managers)
    }

    render() {
        return (
            <table>
                {this.populateTable()}
            </table>
        )
    }
}

export default ManagerAccounts
