import React, {Component} from 'react';
import './style/AntdAreaSet.less';
import FillColor from "./atomic_components/FillColor";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import {calculateFillColor, calculateRightAngleCoordinates} from "./util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";

interface AntdAreaSetProps {
    chartConfig?: any;
    chartProps?: any;
    updateChartProps?: (data: any) => void;
}

class AntdAreaSet extends Component<AntdAreaSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }

    render() {
        const {updateChartProps, chartProps} = this.props;
        const colors = calculateFillColor(chartProps);
        let sorts = dataSort('type', chartProps.data);
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged}
                           colors={colors}
                           colorCount={sorts}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdAreaSet;