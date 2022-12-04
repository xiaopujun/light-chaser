import React, {Component} from 'react';
import './style/index.less';
import CfgGroup from "../../../base/CfgGroup";

interface BarWidthProp {
    updateChartProps?: (data: any) => void;
    barWidth?: number;
}

/**
 * 条形图，单条宽度配置原子组件
 */
class BarWidth extends Component<BarWidthProp> {

    barWidthChanged = (width: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            maxBarWidth: width
        })
    }

    generateBarWidthSet = () => {
        return [
            {
                label: '条形宽度',
                comp: "LcNumberInput",
                config: {
                    value: this.props?.barWidth,
                    onChange: this.barWidthChanged,
                    min: 1,
                },
            },
        ]
    }

    render() {
        const items = this.generateBarWidthSet();
        return <CfgGroup items={items}/>;
    }
}

export default BarWidth;