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
import {ConfigType} from "../../../types/ConfigType";

class AntdBaseBarConfigStyle extends Component<ConfigType> {

    state: any = {
        colors: []
    }

    fillColorChanged = (color: string | string[]) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({color: color});
    }

    groupColorChanged = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({
            color: value
        })
    }


    render() {
        const colors = calculateFillColor(this.props.config);
        const sorts = dataSort('type', this.props.config.data);
        const {updateConfig, config: {chartStyle}} = this.props;
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
                    <Legend {...calculateLegendConfig(chartStyle)}
                            chartProps={chartStyle}
                            updateChartProps={updateConfig}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates {...calculateRightAngleCoordinates(chartStyle)}
                                           chartProps={chartStyle}
                                           updateChartProps={updateConfig}/>
                </div>
            </>
        );
    }
}

export default AntdBaseBarConfigStyle;