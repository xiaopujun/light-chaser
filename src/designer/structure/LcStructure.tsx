import {Component} from 'react';
import './structure.less';

class LcStructure extends Component {
    render() {
        return (
            <div className={'lc-designer-structure'}>{this.props.children}</div>
        );
    }
}

export default LcStructure;