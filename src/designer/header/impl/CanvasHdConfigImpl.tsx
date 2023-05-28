import React, {Component} from 'react';
import {observer} from "mobx-react";
import Dialog from "../../../lib/lc-dialog/Dialog";
import ConfigItem from "../../../lib/config-item/ConfigItem";
import headerStore from "../HeaderStore";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";

/**
 * 画布设置React组件实现
 */
class CanvasHdConfigImpl extends Component {

    onClose = () => {
        const {setCanvasVisible} = headerStore;
        setCanvasVisible(false);
    }

    render() {
        const {canvasVisible} = headerStore;
        return (
            <Dialog title={'画布设置'} visible={canvasVisible} onClose={this.onClose}>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <ConfigItem title={'宽度'}>
                        <UnderLineInput/>
                    </ConfigItem>
                    <ConfigItem title={'高度'}>
                        <UnderLineInput/>
                    </ConfigItem>
                    <ConfigItem title={'列数'}>
                        <UnderLineInput/>
                    </ConfigItem>
                    <ConfigItem title={'缩放比'}>
                        <UnderLineInput/>
                    </ConfigItem>
                    <ConfigItem title={'基准高度'}>
                        <UnderLineInput/>
                    </ConfigItem>
                </div>
                <br/>
                <p style={{
                    color: '#7c7c7c',
                    padding: '0 5px',
                    fontSize: '12px'
                }}>说明：修改画布设置，会对整体效果产生较大影响，建议先调试好画布设置后再进行大屏设计</p>
            </Dialog>
        );
    }
}

export default observer(CanvasHdConfigImpl);