import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdBarGraphics, AntdCartesianCoordinateSys, AntdLegend} from "../../antd-common/config/AntdFragment";
import {Bar, BarOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBar";

class AntdBaseBarStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance: AbstractComponent<Bar, AntdBarProps> = this.props.instance;
        instance.update({style: {legend}});
    }

    barGraphicsChange = (config: BarOptions) => {
        const instance: AbstractComponent<Bar, AntdBarProps> = this.props.instance;
        instance.update({style: config});
    }

    barCoordinateSysChange = (config: BarOptions) => {
        const instance: AbstractComponent<Bar, AntdBarProps> = this.props.instance;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: BarOptions = instance.getConfig().style;
        return (
            <>
                <AntdBarGraphics onChange={this.barGraphicsChange} config={config}/>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.barCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBaseBarStyleConfig};