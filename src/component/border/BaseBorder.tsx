import React, {Component} from 'react';

export default class BaseBorder extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
