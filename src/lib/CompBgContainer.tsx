import React, {Component, CSSProperties} from 'react';

interface CompBgContainerProps {
    style?: CSSProperties;
}

class CompBgContainer extends Component<CompBgContainerProps> {
    render() {
        let _style: CSSProperties = {
            ...{
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                position: 'absolute'
            }, ...this.props.style
        };
        return (
            <div style={{..._style}}>
                {this.props.children}
            </div>
        );
    }
}

export default CompBgContainer;