import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdBarGraphics, AntdLegend} from "../../common-fragment/AntdFragment";
import {BarOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";

class AntdBaseBarStyleConfig extends Component<ConfigType> {


    legendChange = (legend: Legend) => {
        console.log(legend);
    }

    barGraphicsChange = (config: BarOptions) => {
        console.log(config);
    }

    render() {
        const {instance} = this.props;
        const config: BarOptions = instance.getConfig().style;
        return (
            <>
                {/*<BaseStyleSet config={config.baseStyle} updateConfig={updateConfig}/>*/}
                {/*<AntdBarGraphics onChange={this.barGraphicsChange} config={config}/>*/}
                {/*<AntdLegend onChange={this.legendChange} config={config.legend}/>*/}
                <AntdCartesianCoordinateSys config={config}/>
            </>
        );
    }
}

export {AntdBaseBarStyleConfig};