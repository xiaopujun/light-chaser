import {Component, ReactNode} from 'react';
import './structure.less';

export interface LcStructureProps {
    children?: ReactNode;
}

class LcStructure extends Component<LcStructureProps> {
    render() {
        return (
            <div className={'lc-designer-structure'}>{this.props.children}</div>
        );
    }
}

export default LcStructure;