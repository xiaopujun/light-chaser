import React, {Component} from 'react';
import Legend from "../../../lib/common-fragment/legend/Legned";
import RightAngleCoordinates from "../../../lib/common-fragment/right-angle-coordinates/RightAngleCoordinates";
import {
    calculateLegendConfig,
    calculateRightAngleCoordinates
} from "../../../utils/AntdChartConfigUtil";
import Accordion from "../../../lib/lc-accordion/Accordion";
import CfgItemBorder from "../../../lib/config-item-border/CfgItemBorder";
import BaseStyleSet from "../../../lib/common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../framework/types/ConfigType";
import ConfigItem from "../../../lib/config-item/ConfigItem";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import ConfigCard from "../../../lib/config-card/ConfigCard";
import NumberInput from "../../../lib/lc-input/NumberInput";

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
        // const colors = calculateFillColor(this.props.config);
        // const sorts = dataSort('type', this.props.config.data);
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
                            updateElemConfig={updateConfig}/>
                    <RightAngleCoordinates {...calculateRightAngleCoordinates(chartStyle)}
                                           chartProps={chartStyle}
                                           updateElemConfig={updateConfig}/>
                </div>
            </>
        );
    }
}

export default AntdBaseBarConfigStyle;