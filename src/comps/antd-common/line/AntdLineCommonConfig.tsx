import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Line, LineOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import {AntdLineProps} from "./AntdCommonLine";

class AntdLineCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance: AbstractComponent<Line, AntdLineProps> = this.props.instance;
        instance.update({style: {legend}});
    }

    lineCoordinateSysChange = (config: LineOptions) => {
        const instance: AbstractComponent<Line, AntdLineProps> = this.props.instance;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: LineOptions = instance.getConfig().style;
        return (
            <>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.lineCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdLineCommonStyleConfig};