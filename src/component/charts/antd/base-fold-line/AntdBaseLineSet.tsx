import React, {Component} from 'react';
import FillColor from "../../../config/chart/antd/atomic_components/FillColor";
import RightAngleCoordinates from "../../../config/chart/antd/atomic_components/RightAngleCoordinates";
import {calculateFillColor, calculateRightAngleCoordinates} from "../../../config/chart/antd/util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";

interface AntdFoldLineSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
}

class AntdFoldLineSet extends Component<AntdFoldLineSetProps> {

    state: any = {
        data: []
    }

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color})
    }

    render() {
        const {updateChartProps, chartProps} = this.props;
        const colors = calculateFillColor(this.props.chartProps);
        const sorts = dataSort('type', chartProps.data);
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged}
                           colors={colors}
                           colorCount={sorts}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       chartProps={chartProps}
                                       updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdFoldLineSet;