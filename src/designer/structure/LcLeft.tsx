import {Component, ReactNode} from 'react';

export interface LcLeftProps {
    children?: ReactNode;
}

class LcLeft extends Component<LcLeftProps> {
    render() {
        return (
            <div className={'structure-body-left'}>{this.props.children}</div>
        );
    }
}

export default LcLeft;