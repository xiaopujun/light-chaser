import React, {Component} from 'react';
import {Popover} from 'antd';
import {ChromePicker,} from 'react-color';
import './index.less';
import ColorPicker from "../base";

/**
 * 组合颜色选择器，可以同时渲染多个颜色选择器。色值结果以数组返回
 */
class GroupColorPicker extends Component {

    state = {
        res: []
    }

    onChange = (index, data) => {
        let {res} = this.state;
        const {onChange} = this.props;
        res[index] = data;
        onChange("color", res);
        this.setState({res})
    }

    render() {
        const {number = 1} = this.props;
        let tempArr = [];
        for (let i = 0; i < number; i++) {
            tempArr.push(i);
        }
        return (
            <div className={'group-color-picker'} style={{
                display: "flex",
                flexDirection: "row"
            }}>
                {tempArr.map((item, i) => {
                    return <ColorPicker key={item} name={i} onChange={this.onChange}/>
                })}
            </div>
        )
    }
}

export default GroupColorPicker;