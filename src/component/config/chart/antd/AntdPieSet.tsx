import React, {Component} from 'react';
import './style/AntdPieSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import PolarCoordinateSystem from "./atomic_components/PolarCoordinate";

class AntdPieSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }


    render() {
        const {updateElemChartSet, LCDesignerStore} = this.props;
        const {active} = LCDesignerStore;
        const {chartConfigs} = LCDesignerStore;
        let chartConfig = chartConfigs[active?.id + ""];
        let colorPickerNumber = chartConfig.chartProperties.data.length;
        return (
            <div className={'elem-chart-config'}>

                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged} paletteCount={colorPickerNumber}/>
                {/*图例配置*/}
                <Legend chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                {/*极坐标系*/}
                <PolarCoordinateSystem updateElemChartSet={updateElemChartSet}/>

            </div>
        );
    }
}

export default AntdPieSet;