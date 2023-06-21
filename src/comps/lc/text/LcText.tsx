import React, {Component} from 'react';
import CompBgContainer from "../../../lib/lc-background-container/CompBgContainer";

class LcText extends Component<any> {
    render() {
        const {config} = this.props;
        if (!config) return null;
        let {style: {baseStyle, chartStyle}, data} = config;
        let _chartStyle = {
            ...{
                height: '100%', display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }, ...chartStyle
        }
        return (
            <CompBgContainer style={baseStyle}>
                <div style={_chartStyle}>{data?.content}</div>
            </CompBgContainer>
        );
    }
}

export default LcText;