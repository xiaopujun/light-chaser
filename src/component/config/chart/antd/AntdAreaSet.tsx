import React, {Component} from 'react';
import './style/AntdAreaSet.less';
import FillColor from "./atomic_components/FillColor";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";

interface AntdAreaSetProps {
    chartConfig?: any;
    updateChartProps?: (data: any) => void;
}

class AntdAreaSet extends Component<AntdAreaSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }

    render() {
        const {updateChartProps, chartConfig} = this.props;
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged} paletteCount={1}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdAreaSet;