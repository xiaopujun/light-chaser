import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Scatter, ScatterOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import {AntdScatterProps} from "./AntdCommonScatter";

class AntdScatterCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance: AbstractComponent<Scatter, AntdScatterProps> = this.props.instance;
        instance.update({style: {legend}});
    }

    ScatterCoordinateSysChange = (config: ScatterOptions) => {
        const instance: AbstractComponent<Scatter, AntdScatterProps> = this.props.instance;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: ScatterOptions = instance.getConfig().style;
        return (
            <>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.ScatterCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdScatterCommonStyleConfig};