import React, {Component} from 'react';
import './style/GroupColorPicker.less';
import ColorPicker from "./BaseColorPicker";


interface GroupColorPickerProp {
    onChange?: (data: string[]) => void;
    value?: string[];
}

/**
 * 组合颜色选择器，可以同时渲染多个颜色选择器。色值结果以数组返回
 */
class GroupColorPicker extends Component<GroupColorPickerProp> {

    state: any = {
        colors: []
    }

    constructor(props: any) {
        super(props);
        const {value = []} = props;
        if (value.length === 0) {
            this.state = {colors: ['#00e9ff']};
            return;
        }
        this.state = {colors: value};
    }


    onChange = (color: any, e: any, id: any) => {
        let {colors} = this.state;
        const {onChange} = this.props;
        colors[id] = color;
        onChange && onChange(colors);
        this.setState({colors})
    }

    render() {
        const {colors = []} = this.state;
        return (
            <div className={'group-color-picker'} style={{display: "flex", flexDirection: "row"}}>
                {colors.map((item: string, i: number) => {
                    return <ColorPicker key={i + ''} id={i} color={item} onChange={this.onChange}/>
                })}
            </div>
        )
    }
}

export default GroupColorPicker;