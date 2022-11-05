import React, {Component} from 'react';
import PaddingSet from "../base/PaddingSet";
import BackgroundSet from "../base/BackgroundSet";
import BorderSet from "../base/BorderSet";
import {Select} from "antd";
import ColorPicker from "../../color_picker/BaseColorPicker";
import LCNumberInput from "../../base/LCNumberInput";
import LCTextInput from "../../base/LCTextInput";

/**
 * lc组件基础信息
 */
class LcEmBaseInfo extends Component {
    render() {
        return (
            <div className={'lc-base-info'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>ID号：</label>
                    <label>3</label>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>名称：</label>
                    <LCTextInput/>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>描述：</label>
                    <LCTextInput/>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>类型：</label>
                    <LCTextInput/>
                </div>
            </div>
        );
    }
}

export default LcEmBaseInfo;