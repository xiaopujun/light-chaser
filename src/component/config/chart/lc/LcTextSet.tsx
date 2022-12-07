import React, {Component} from 'react';
import CfgGroup from "../../base/CfgGroup";


interface LcTextSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
}

class LcTextSet extends Component<LcTextSetProps> {

    textChanged = (text: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({value: text});
    }

    textColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color});
    }

    fontSizeChanged = (size: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({fontSize: size});
    }

    generateLcTextSet = () => {
        const {chartProps = ''} = this.props;
        return [
            {
                label: '文本',
                comp: "LcTextInput",
                config: {
                    value: chartProps?.value,
                    onChange: this.textChanged,
                },
            },
            {
                label: '字体颜色',
                comp: "ColorPicker",
                config: {
                    value: chartProps?.color,
                    onChange: this.textColorChanged,
                },
            },
            {
                label: '字体大小',
                comp: "LcNumberInput",
                config: {
                    value: chartProps?.fontSize,
                    onChange: this.fontSizeChanged,
                    min: 12,
                },
            },
        ]
    }

    render() {
        const items = this.generateLcTextSet();
        return <CfgGroup items={items}/>;
    }
}

export default LcTextSet;