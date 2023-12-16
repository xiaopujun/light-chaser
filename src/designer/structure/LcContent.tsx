import {Component, ReactNode} from 'react';

export interface LcContentProps {
    children?: ReactNode;
}

class LcContent extends Component<LcContentProps> {
    render() {
        return (
            <div id={'structureContent'} className={'structure-body-content'}>{this.props.children}</div>
        );
    }
}

export default LcContent;