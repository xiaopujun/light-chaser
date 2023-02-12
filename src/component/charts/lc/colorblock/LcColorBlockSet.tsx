import React, {Component} from 'react';
import CfgGroup from "../../../config/base/CfgGroup";

interface LcColorBlockSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
}

class LcColorBlockSet extends Component<LcColorBlockSetProps> {

    textChanged = (text: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({value: text});
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
            }
        ]
    }

    render() {
        const items = this.generateLcTextSet();
        return <CfgGroup items={items}/>;
    }
}

export default LcColorBlockSet;