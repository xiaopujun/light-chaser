import {Component} from 'react';

class LcLeft extends Component {
    render() {
        return (
            <div className={'structure-body-left'}>{this.props.children}</div>
        );
    }
}

export default LcLeft;