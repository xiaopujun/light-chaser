import React, {Component} from 'react';
import './style/AntdPieSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import PolarCoordinateSystem from "./atomic_components/PolarCoordinate";


interface AntdPieSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
    activated?: any;
}

class AntdPieSet extends Component<AntdPieSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }


    render() {
        const {updateChartProps, chartProps} = this.props;
        let colorPickerNumber = chartProps.data.length;
        return (
            <div className={'elem-chart-config'}>

                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged} colorCount={colorPickerNumber}/>
                {/*图例配置*/}
                <Legend chartProps={chartProps} updateChartProps={updateChartProps}/>
                {/*极坐标系*/}
                <PolarCoordinateSystem updateChartProps={updateChartProps}/>

            </div>
        );
    }
}

export default AntdPieSet;