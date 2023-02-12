import React, {Component} from 'react';
import RightAngleCoordinates from "../../../config/chart/antd/atomic_components/RightAngleCoordinates";
import {calculateFillColor, calculateRightAngleCoordinates} from "../../../config/chart/antd/util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";
import Legend from "../../../config/chart/antd/atomic_components/Legned";
import Accordion from "../../../base/Accordion";
import LcConfigItem from "../../../base/LcConfigItem";
import ColorSelector from "../../../config/chart/antd/atomic_components/ColorSelector";
import LcSwitch from "../../../base/LcSwitch";
import CfgItemBorder from "../../../base/CfgItemBorder";
import LCNumberInput from "../../../base/LCNumberInput";

interface AntdAreaSetProps {
    chartConfig?: any;
    chartProps?: any;
    updateChartProps?: (data: any) => void;
}

class AntdBaseAreaSet extends Component<AntdAreaSetProps> {

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
                        <ColorSelector colors={colors} max={sorts}/>
                    </LcConfigItem>
                    <LcConfigItem title={'平滑曲线'}>
                        <LcSwitch/>
                    </LcConfigItem>
                    <LcConfigItem title={'透明度'}>
                        <CfgItemBorder width={'50%'}>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigItem>
                </Accordion>
                <Legend/>
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdBaseAreaSet;