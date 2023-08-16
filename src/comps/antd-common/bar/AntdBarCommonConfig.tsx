import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdBarGraphics, AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {BarOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AntdCommonBar from "./AntdCommonBar";

class AntdBarCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance = this.props.instance as AntdCommonBar;
        instance.update({style: {legend}});
    }

    barGraphicsChange = (config: BarOptions) => {
        const instance = this.props.instance as AntdCommonBar;
        instance.update({style: config});
    }

    barCoordinateSysChange = (config: BarOptions) => {
        const instance = this.props.instance as AntdCommonBar;
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

export {AntdBarCommonStyleConfig};