import React, { Component } from 'react'


export class accountCell extends Component {
    render() {
        return (
            <div>
                <tr>
                    {this.props}
                </tr>
            </div>
        )
    }
}

export default accountCell
