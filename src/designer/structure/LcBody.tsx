import {Component, ReactNode} from 'react';

export interface LcBodyProps {
    children?: ReactNode;
}

class LcBody extends Component<LcBodyProps> {
    render() {
        return (
            <div className={'structure-body'}>{this.props.children}</div>
        );
    }
}

export default LcBody;