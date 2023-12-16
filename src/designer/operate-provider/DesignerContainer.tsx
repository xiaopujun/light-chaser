import {Component, ReactNode} from 'react';

export interface DesignerContainerProps {
    children?: ReactNode;
}

class DesignerContainer extends Component<DesignerContainerProps> {

    render() {
        return (
            <div style={{outline: 'none'}} className={'lc-event-container'}>
                {this.props.children}
            </div>
        );
    }
}

export default DesignerContainer;