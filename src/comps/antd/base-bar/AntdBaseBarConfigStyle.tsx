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
import CfgItemBorder from "../../../lib/CfgItemBorder";
import BaseStyleSet from "../../../lib/config/base/BaseStyleSet";
import {ConfigType} from "../../../types/ConfigType";
import ConfigItem from "../../../lib/config/item/ConfigItem";
import BaseColorPicker from "../../../lib/BaseColorPicker";
import ConfigCard from "../../../lib/config/card/ConfigCard";
import NumberInput from "../../../lib/NumberInput";

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
                    <Accordion title={'图形'}>
                        <ConfigCard title={'x轴'}>
                            <ConfigItem title={'宽度'}>
                                <NumberInput size={'small'}/>
                            </ConfigItem>
                            <ConfigItem title={'颜色'}>
                                <CfgItemBorder>
                                    <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                                     showText={true}/>
                                </CfgItemBorder>
                            </ConfigItem>
                        </ConfigCard>
                    </Accordion>
                    <Legend {...calculateLegendConfig(chartStyle)}
                            chartProps={chartStyle}
                            updateChartProps={updateConfig}/>
                    <RightAngleCoordinates {...calculateRightAngleCoordinates(chartStyle)}
                                           chartProps={chartStyle}
                                           updateChartProps={updateConfig}/>
                </div>
            </>
        );
    }
}

export default AntdBaseBarConfigStyle;