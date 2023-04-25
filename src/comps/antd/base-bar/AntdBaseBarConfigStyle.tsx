import React, {Component} from 'react';
import '../../../lib/config/chart/antd/style/AntdBarSet.less';
import Legend from "../../../lib/config/chart/antd/atomic_components/Legned";
import RightAngleCoordinates from "../../../lib/config/chart/antd/atomic_components/RightAngleCoordinates";
import {dataSort} from "../../../utils/SortUtil";
import {
    calculateFillColor,
    calculateLegendConfig,
    calculateRightAngleCoordinates
} from "../../../lib/config/chart/antd/util/AntdChartConfigUtil";
import Accordion from "../../../lib/Accordion";
import LcConfigItem from "../../../lib/LcConfigItem";
import ColorSelector from "../../../lib/config/chart/antd/atomic_components/ColorSelector";
import LCNumberInput from "../../../lib/LCNumberInput";
import CfgItemBorder from "../../../lib/CfgItemBorder";
import BaseStyleSet from "../../../lib/config/base/BaseStyleSet";

interface AntdBarSetProps {
    updateChartProps?: (data: any) => void;
    activated?: any;
    chartProps?: any;
}

class AntdBaseBarConfigStyle extends Component<AntdBarSetProps> {

    state: any = {
        colors: []
    }

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }

    groupColorChanged = (value: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            color: value
        })
    }


    render() {
        const colors = calculateFillColor(this.props.chartProps);
        const sorts = dataSort('type', this.props.chartProps.data);
        const {updateChartProps, chartProps} = this.props;
        return (
            <>
                <BaseStyleSet/>
                <div className={'elem-chart-config'}>
                    {/*图形填充色设置*/}
                    <Accordion title={'图形'}>
                        <LcConfigItem title={'填充色'}>
                            <ColorSelector colors={colors} max={sorts}/>
                        </LcConfigItem>
                        <LcConfigItem title={'条形宽度'}>
                            <CfgItemBorder width={'50%'}>
                                <LCNumberInput style={{width: '100%'}}/>
                            </CfgItemBorder>
                        </LcConfigItem>
                    </Accordion>
                    {/*图例配置*/}
                    <Legend {...calculateLegendConfig(this.props.chartProps)}
                            chartProps={chartProps}
                            updateChartProps={updateChartProps}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                           chartProps={chartProps}
                                           updateChartProps={updateChartProps}/>
                </div>
            </>
        );
    }
}

export default AntdBaseBarConfigStyle;