import React, {Component} from 'react';
import {Switch} from "antd";
import ColorPicker from "../../color-picker/base";

/**
 * 背景设置
 */
class BackgroundConfig extends Component {

    updateShowBg = (value) => {
        const {updateBackgroundConfig} = this.props;
        updateBackgroundConfig({showBg: value});
    }

    updateBgColor = (name, value) => {
        const {updateBackgroundConfig} = this.props;
        updateBackgroundConfig({[name]: value});
    }

    render() {
        return (
            <>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>显示背景：</label>
                    <div>
                        <Switch name={'showBorder'} onChange={this.updateShowBg}
                                className={'config-item-value'}/>
                    </div>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>背景颜色：</label>
                    <ColorPicker name={'backgroundColor'} onChange={this.updateBgColor}
                                 className={'config-item-value'}/>
                </div>
            </>
        );
    }
}

export default BackgroundConfig;