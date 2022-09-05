import React, {Component} from 'react';
import ElemPropSet from "../../config";
import './index.less';

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
        const {active} = LCDesignerStore;
        return (
            <div className={'comp-config-layout'} style={{height: window.innerHeight - 64}}>
                {active.id >= 0 ? (<ElemPropSet {...this.props}/>) :
                    <div className={'config-message'}>
                        <div className={'message-content'}>请激活组件进行配置...</div>
                    </div>}
            </div>

        );
    }
}