import React, {Component} from 'react';
import CompBgContainer from "../../../lib/lc-background-container/CompBgContainer";

class LcText extends Component<any> {
    render() {
        const {config} = this.props;
        if (!config) return null;
        let {style} = config;
        return (
            <CompBgContainer style={style?.baseStyle}>
                <div style={{
                    color: "white",
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    fontSize: 80
                }}>
                    文本
                </div>
            </CompBgContainer>
        );
    }
}

export default LcText;