import React, {Component} from 'react';
import './style/index.less';
import ColorSelector from "./ColorSelector";
import CfgGroup from "../../../base/CfgGroup";

interface FillColorProp {
    colorCount?: number;
    colors?: string[];
    onChange?: (data: string | string[]) => void;
}

/**
 * 配置项原子组件 - 图表填充色设置
 */
class FillColor extends Component<FillColorProp> {

    state: any = {
        colors: [],
    }

    constructor(props: FillColorProp) {
        super(props);
        const {colors, colorCount} = this.props;
        this.state = {colors: colors || ['rgb(0,255,234)'], colorCount};
    }

    colorChanged = (data: string | string[]) => {
        const {onChange} = this.props;
        onChange && onChange(data);
    }

    generateFillColorSet = () => {
        const {colors, colorCount} = this.props;
        return [
            {
                label: '填充色',
                comp: "ColorSelector",
                config: {
                    colors: colors,
                    max: colorCount,
                    onChange: this.colorChanged,
                },
            },
        ]
    }

    render() {
        return <CfgGroup items={this.generateFillColorSet()}/>;
    }
}

export default FillColor;