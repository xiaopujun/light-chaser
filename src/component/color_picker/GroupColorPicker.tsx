import React, {Component} from 'react';
import './style/GroupColorPicker.less';
import ColorPicker from "./BaseColorPicker";


interface GroupColorPickerProp {
    onChange?: (data: string[]) => void;
    paletteCount: number;
    /**
     * 初始化颜色
     */
    initColor?: string;
}

/**
 * 组合颜色选择器，可以同时渲染多个颜色选择器。色值结果以数组返回
 */
class GroupColorPicker extends Component<GroupColorPickerProp> {

    state: any = {
        colorArr: []
    }

    constructor(props: any) {
        super(props);
        const {paletteCount, initColor = '#00ffdb'} = props;
        let initColorArr: string[] = [];
        for (let i = 0; i < paletteCount; i++)
            initColorArr[i] = initColor;
        this.state = {colorArr: initColorArr};
    }


    onChange = (color: any, e: any, id: any) => {
        let {colorArr} = this.state;
        const {onChange} = this.props;
        colorArr[id] = color;
        onChange && onChange(colorArr);
        this.setState({colorArr})
    }

    render() {
        const {paletteCount = 1} = this.props;
        let tempArr = [];
        for (let i = 0; i < paletteCount; i++) {
            tempArr.push(i);
        }
        return (
            <div className={'group-color-picker'} style={{display: "flex", flexDirection: "row"}}>
                {tempArr.map((item, i) => {
                    return <ColorPicker key={item} id={i} onChange={this.onChange}/>
                })}
            </div>
        )
    }
}

export default GroupColorPicker;