import React, {Component} from 'react';
import '../../../config/chart/antd/style/AntdAreaSet.less';
import FillColor from "../../../config/chart/antd/atomic_components/FillColor";
import RightAngleCoordinates from "../../../config/chart/antd/atomic_components/RightAngleCoordinates";
import {calculateFillColor, calculateRightAngleCoordinates} from "../../../config/chart/antd/util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";
import Legend from "../../../config/chart/antd/atomic_components/Legned";

interface AntdAreaSetProps {
    chartConfig?: any;
    chartProps?: any;
    updateChartProps?: (data: any) => void;
}

class AntdStackAreaSet extends Component<AntdAreaSetProps> {

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
                <Legend/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdStackAreaSet;