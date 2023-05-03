import React, {Component, CSSProperties} from 'react';

interface CompBgContainerProps {
    style?: CSSProperties;
}

class CompBgContainer extends Component<CompBgContainerProps> {
    render() {
        const {style = {width: '100%', height: '100%', pointerEvents: 'none', position: 'absolute'}} = this.props;
        return (
            <div style={{...style}}>
                {this.props.children}
            </div>
        );
    }
}

export default CompBgContainer;