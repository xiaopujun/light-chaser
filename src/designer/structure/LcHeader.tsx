import {Component} from 'react';

class LcHeader extends Component {
    render() {
        return (
            <div className={'structure-header'}>{this.props.children}</div>
        );
    }
}

export default LcHeader;