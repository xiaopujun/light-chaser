import {Component} from 'react';

class LcFoot extends Component {
    render() {
        return (
            <div className={'structure-foot'}>{this.props.children}</div>
        );
    }
}

export default LcFoot;