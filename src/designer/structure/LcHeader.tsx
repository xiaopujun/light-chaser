import {Component, ReactNode} from 'react';

export interface LcHeaderProps {
    children?: ReactNode;
}

class LcHeader extends Component<LcHeaderProps> {
    render() {
        return (
            <div className={'structure-header'}>{this.props.children}</div>
        );
    }
}

export default LcHeader;