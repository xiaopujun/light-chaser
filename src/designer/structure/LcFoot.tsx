import {Component, ReactNode} from 'react';

export interface LcFootProps {
    children?: ReactNode;
}

class LcFoot extends Component<LcFootProps> {
    render() {
        return (
            <div className={'structure-foot'}>{this.props.children}</div>
        );
    }
}

export default LcFoot;