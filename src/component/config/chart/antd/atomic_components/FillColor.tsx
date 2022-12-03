import React, {Component} from 'react';
import './style/index.less';
import ColorSelector from "./ColorSelector";


interface FillColorProp {
    colorCount?: number;
    colors?: string[];
    onChange?: (data: string | string[]) => void;//回调函数
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
        const {colors} = this.props;
        this.state = {colors: colors || ['rgb(0,255,234)']};
    }


    colorChanged = (data: string | string[]) => {
        const {onChange} = this.props;
        onChange && onChange(data);
    }

    modeChanged = (value: string) => {
        if (value === '1') {
            //多色模式
            const {colorCount = 1} = this.props;
            let colorArr = [];
            for (let i = 0; i < colorCount; i++)
                colorArr.push('#00d8f9')
            this.setState({fillMode: value, colors: colorArr})
        } else {
            //单色模式
            this.setState({fillMode: value, colors: ['#00d8f9']})
        }
    }


    render() {
        const {colors = ['rgb(0,255,234)']} = this.state;
        return (
            <div className={'lc-config-item'}>
                <label className={'lc-config-item-label'}>填充色：</label>
                <ColorSelector max={5} colors={colors} onChange={this.colorChanged}/>
            </div>
        );
    }
}

export default FillColor;