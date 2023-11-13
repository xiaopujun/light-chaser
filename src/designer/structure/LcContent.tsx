import {Component} from 'react';

class LcContent extends Component {
    render() {
        return (
            <div id={'structureContent'} className={'structure-body-content'}>{this.props.children}</div>
        );
    }
}

export default LcContent;