import React, {Component} from 'react';
import BaseStyleSet from "../../common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdGraphics, AntdLegend} from "../../common-fragment/AntdFragment";

class AntdBaseBarStyleConfig extends Component<ConfigType> {

    render() {
        const {updateConfig, config} = this.props;
        return (
            <>
                {/*<BaseStyleSet config={config.baseStyle} updateConfig={updateConfig}/>*/}
                <AntdGraphics config={config} updateConfig={updateConfig}/>
                <AntdLegend config={config} updateConfig={updateConfig}/>
                <AntdCartesianCoordinateSys config={config} updateConfig={updateConfig}/>
            </>
        );
    }
}

export {AntdBaseBarStyleConfig};