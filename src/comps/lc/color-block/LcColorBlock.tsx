import React, {Component} from 'react';
import CompBgContainer from "../../../lib/lc-background-container/CompBgContainer";

class LcColorBlock extends Component<any> {
    render() {
        const {config} = this.props;
        if (!config) return null;
        let {style} = config;
        return (
            <CompBgContainer style={style?.baseStyle}>
               
            </CompBgContainer>
        );
    }
}

export default LcColorBlock;