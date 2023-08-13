import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdBarGraphics, AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Column, ColumnOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import {AntdColumnProps} from "./AntdCommonColumn";

class AntdColumnCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance: AbstractComponent<Column, AntdColumnProps> = this.props.instance;
        instance.update({style: {legend}});
    }

    barGraphicsChange = (config: ColumnOptions) => {
        const instance: AbstractComponent<Column, AntdColumnProps> = this.props.instance;
        instance.update({style: config});
    }

    barCoordinateSysChange = (config: ColumnOptions) => {
        const instance: AbstractComponent<Column, AntdColumnProps> = this.props.instance;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: ColumnOptions = instance.getConfig().style;
        return (
            <>
                <AntdBarGraphics onChange={this.barGraphicsChange} config={config}/>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.barCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdColumnCommonStyleConfig};