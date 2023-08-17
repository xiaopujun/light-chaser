import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {Line, LineOptions} from "@antv/g2plot";
import AntdCommonLine, {AntdLineProps} from "../../antd-common/line/AntdCommonLine";
import {AntdCartesianCoordinateSys} from "../../antd-common/config/AntdFragment";
import {AntdLineGraphics} from "../../antd-common/line/AntdLineCommonConfig";
import AbstractComponent from "../../../framework/core/AbstractComponent";

class AntdBaseLineConfig extends Component<ConfigType> {

    lineCoordinateSysChange = (config: LineOptions) => {
        const instance = this.props.instance as AntdCommonLine;
        instance.update({style: config});
    }

    lineGraphicsChange = (config: LineOptions) => {
        const instance: AbstractComponent<Line, AntdLineProps> = this.props.instance as AntdCommonLine;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: LineOptions = instance.getConfig().style;
        return (
            <>
                <AntdLineGraphics onChange={this.lineGraphicsChange} config={config}/>
                <AntdCartesianCoordinateSys onChange={this.lineCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBaseLineConfig};