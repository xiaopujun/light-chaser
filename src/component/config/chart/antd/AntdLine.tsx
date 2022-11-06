import React, {Component} from 'react';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import ColumnWidth from "./atomic_components/ColumnWidth";

interface AntdFoldLineSetProps {
    updateElemChartSet?: (data: any) => void;
    chartProps?: any;
    activated?: any;
}

class AntdFoldLineSet extends Component<AntdFoldLineSetProps> {

    state: any = {
        data: []
    }

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({color: color})
    }

    render() {
        const {updateElemChartSet, activated, chartProps} = this.props;
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor paletteCount={1} onChange={this.fillColorChanged}/>
                {/*图例配置*/}
                <Legend chartProps={chartProps} updateElemChartSet={updateElemChartSet}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates chartProps={chartProps} updateElemChartSet={updateElemChartSet}/>
                {/*条形图单条宽度配置*/}
                <ColumnWidth updateElemChartSet={updateElemChartSet}/>
            </div>
        );
    }
}

export default AntdFoldLineSet;