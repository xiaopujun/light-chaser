import React, {Component} from 'react';
import './style/AntdPieSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import PolarCoordinateSystem from "./atomic_components/PolarCoordinate";


interface AntdPieSetProps {
    updateElemChartSet?: (data: any) => void;
    chartProps?: any;
    activated?: any;
}

class AntdPieSet extends Component<AntdPieSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({color: color});
    }


    render() {
        const {updateElemChartSet, chartProps} = this.props;
        let colorPickerNumber = chartProps.data.length;
        return (
            <div className={'elem-chart-config'}>

                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged} paletteCount={colorPickerNumber}/>
                {/*图例配置*/}
                <Legend chartProps={chartProps} updateElemChartSet={updateElemChartSet}/>
                {/*极坐标系*/}
                <PolarCoordinateSystem updateElemChartSet={updateElemChartSet}/>

            </div>
        );
    }
}

export default AntdPieSet;