import React, {Component} from 'react';
import ElemPropSet from "../config/LCComponentConfig";
import './style/Right.less';
import LCNumberInput from "../base/LCNumberInput";

/**
 * 右滑框外壳组件
 * @description:用于展示右滑框，控制右滑框的显示与隐藏
 */
export default class ElemPropSetDrawer extends Component<any, any> {

    onClose = () => {
        const {updateDrawerVisible} = this.props;
        updateDrawerVisible();
    }

    render() {
        const {LCDesignerStore} = this.props;
        const {active, globalSet} = LCDesignerStore;
        return (
            <div className={'lc-config-panel'} style={{height: window.innerHeight - 64}}>
                {active.id >= 0 ? (<ElemPropSet {...this.props}/>) :
                    <div className={'lc-global-set'}>
                        <div className={'lc-global-set-title'}>全局配置</div>
                        <div className={'lc-global-set-content'}>
                            <div className={'lc-config-item'}>
                                <label className={'lc-config-item-label'}>大屏名称：</label>
                                <div className={'lc-config-item-value'}>
                                    <div className={'lc-input-container'}>
                                        <label>测试大屏01</label>
                                    </div>
                                </div>
                            </div>
                            <div className={'lc-config-item'}>
                                <label className={'lc-config-item-label'}>大屏宽度：</label>
                                <div className={'lc-config-item-value'}>
                                    <div className={'lc-input-container'}>
                                        <LCNumberInput value={globalSet.screenWidth} width={45}/>
                                    </div>
                                </div>
                            </div>
                            <div className={'lc-config-item'}>
                                <label className={'lc-config-item-label'}>大屏高度：</label>
                                <div className={'lc-config-item-value'}>
                                    <div className={'lc-input-container'}>
                                        <LCNumberInput value={globalSet.screenHeight} width={45}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>

        );
    }
}