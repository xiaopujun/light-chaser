import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Area, AreaOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import {AntdAreaProps} from "./AntdCommonArea";

class AntdAreaCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance: AbstractComponent<Area, AntdAreaProps> = this.props.instance;
        instance.update({style: {legend}});
    }

    AreaCoordinateSysChange = (config: AreaOptions) => {
        const instance: AbstractComponent<Area, AntdAreaProps> = this.props.instance;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: AreaOptions = instance.getConfig().style;
        return (
            <>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.AreaCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdAreaCommonStyleConfig};