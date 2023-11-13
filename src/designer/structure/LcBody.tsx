import {Component} from 'react';

class LcBody extends Component {
    render() {
        return (
            <div className={'structure-body'}>{this.props.children}</div>
        );
    }
}

export default LcBody;