import React, {Component} from 'react';
import './style/AntdAreaSet.less';
import FillColor from "./atomic_components/FillColor";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";

interface AntdAreaSetProps {
    chartConfig?: any;
    updateElemChartSet?: (data: any) => void;
}

class AntdAreaSet extends Component<AntdAreaSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({color: color});
    }

    render() {
        const {updateElemChartSet, chartConfig} = this.props;
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged} paletteCount={1}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates updateElemChartSet={updateElemChartSet}/>
            </div>
        );
    }
}

export default AntdAreaSet;