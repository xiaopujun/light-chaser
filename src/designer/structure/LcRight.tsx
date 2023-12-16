import {Component, ReactNode} from 'react';

export interface LcRightProps {
    children?: ReactNode;
}

class LcRight extends Component<LcRightProps> {
    render() {
        return (
            <div className={'structure-body-right'}>{this.props.children}</div>
        );
    }
}

export default LcRight;