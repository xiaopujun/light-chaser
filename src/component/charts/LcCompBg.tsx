import React, {Component} from 'react';

interface LcContainerProps {
    style?: React.CSSProperties;
}

class LcCompBg extends Component<LcContainerProps> {
    render() {
        const {style} = this.props;
        return (
            <div style={{width: '100%', height: '100%', pointerEvents: 'none', position: 'absolute', ...style}}>
                {this.props.children}
            </div>
        );
    }
}

export default LcCompBg;