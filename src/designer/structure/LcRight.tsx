import {Component} from 'react';

class LcRight extends Component {
    render() {
        return (
            <div className={'structure-body-right'}>{this.props.children}</div>
        );
    }
}

export default LcRight;