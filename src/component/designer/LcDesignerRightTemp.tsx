import React, {Component} from 'react';
import './style/LcDesignerRight.less';
import LcConfigMenus from "./LcConfigMenus";
import LcConfigContent from "./LcConfigContent";

class LcDesignerRightTemp extends Component<any> {
    render() {
        const {
            LCDesignerStore,
            updateActive,
            updateBaseStyle,
            updateChartProps,
            updateBaseInfo,
            updateGlobalSet
        } = this.props;
        const {activated, chartConfigs, globalSet} = LCDesignerStore!;
        const chartConfig = chartConfigs[activated.id];
        return (
            <>
                <LcConfigMenus/>
                <LcConfigContent />
            </>
        );
    }
}

export default LcDesignerRightTemp;