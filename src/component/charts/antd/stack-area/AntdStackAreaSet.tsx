import React, {Component} from 'react';
import FillColor from "../../../config/chart/antd/atomic_components/FillColor";
import RightAngleCoordinates from "../../../config/chart/antd/atomic_components/RightAngleCoordinates";
import {calculateFillColor, calculateRightAngleCoordinates} from "../../../config/chart/antd/util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";
import Legend from "../../../config/chart/antd/atomic_components/Legned";
import LcConfigItem from "../../../base/LcConfigItem";
import ColorSelector from "../../../config/chart/antd/atomic_components/ColorSelector";
import LcSwitch from "../../../base/LcSwitch";
import CfgItemBorder from "../../../base/CfgItemBorder";
import LCNumberInput from "../../../base/LCNumberInput";
import Accordion from "../../../base/Accordion";

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
                <Accordion title={'图形'}>
                    <LcConfigItem title={'填充色'}>
                        <ColorSelector/>
                    </LcConfigItem>
                    <LcConfigItem title={'平滑曲线'}>
                        <LcSwitch/>
                    </LcConfigItem>
                    <LcConfigItem title={'透明度'}>
                        <CfgItemBorder width={'50%'}>
                            <LCNumberInput/>
                        </CfgItemBorder>
                    </LcConfigItem>
                </Accordion>
                <Legend/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdStackAreaSet;