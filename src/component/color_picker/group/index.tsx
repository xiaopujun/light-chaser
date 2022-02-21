import React, {Component} from 'react';
import {Button, Popover} from 'antd';
import {ChromePicker,} from 'react-color';
import './index.less';
import ColorPicker from "../base";


interface GroupColorPickerProp {
    onChange?: (data: string[]) => void;
    groupNumber: number;
}

/**
 * 组合颜色选择器，可以同时渲染多个颜色选择器。色值结果以数组返回
 */
class GroupColorPicker extends Component<GroupColorPickerProp> {

    state: any = {
        res: []
    }

    onChange = (color: any, e: any, id: any) => {
        let {res} = this.state;
        const {onChange} = this.props;
        res[id] = color;
        onChange && onChange(res);
        this.setState({res})
    }

    render() {
        const {groupNumber = 1} = this.props;
        let tempArr = [];
        for (let i = 0; i < groupNumber; i++) {
            tempArr.push(i);
        }
        return (
            <div className={'group-color-picker'} style={{
                display: "flex",
                flexDirection: "row"
            }}>
                {tempArr.map((item, i) => {
                    return <ColorPicker key={item} id={i} onChange={this.onChange}/>
                })}
            </div>
        )
    }
}

export default GroupColorPicker;