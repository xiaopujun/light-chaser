import React, {Component} from 'react';
import {MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import GroupColorPicker from "../../../../lib/GroupColorPicker";

interface ColorSelectorProps {
    /**
     * 颜色选择器最大数量
     */
    max?: number;
    /**
     * 颜色值数组
     */
    colors?: Array<string>;
    /**
     * 颜色发生改变时回调方法
     * @param data
     */
    onChange?: (data: string | string[]) => void;//回调函数
}

/**
 * 配置项原子组件 - 图表填充色设置
 */
class ColorSelector extends Component<ColorSelectorProps, any> {

    constructor(props: ColorSelectorProps) {
        super(props);
        const {colors = [], max = 1} = this.props;
        this.state = {colors, max}
    }


    colorChanged = (data: string[]) => {
        const {onChange} = this.props;
        onChange && onChange(data);
        this.setState({colors: data})
    }

    doAdd = () => {
        let {colors, max} = this.state;
        if (colors.length < max)
            colors.push('#00d8f9');
        this.setState({colors});
    }

    doDel = () => {
        let {colors} = this.state;
        if (colors.length > 1)
            colors.pop();
        this.setState({colors});
    }


    render() {
        const {colors} = this.state;
        return (
            <div className={'lc-color-selector'} style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <GroupColorPicker value={colors} onChange={this.colorChanged}/>
                <div style={{fontSize: '20px',}}>
                    <PlusSquareOutlined onClick={this.doAdd}/>
                    <MinusSquareOutlined onClick={this.doDel}/>
                </div>
            </div>
        );
    }
}

export default ColorSelector;