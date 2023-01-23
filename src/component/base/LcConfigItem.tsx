import React, {Component} from 'react';
import './style/LcConfigItem.less';

export enum LayoutMode {
    /**
     * 上下布局，显示名在上，设置组件在下
     */
    LV_UD,
    /**
     * 上下布局，设置组件在上，显示名在下
     */
    VL_UD,
    /**
     * 左右布局，显示名称在左，设置组件在右
     */
    LV_LR,
}

const modeClass = {
    LV_UD: 'config-item-lv-ud',
    VL_UD: 'config-item-vl-ud',
    LV_LR: 'config-item-lv-lr',
}


interface LcConfigItemProps {
    /**
     * 布局模式
     */
    layoutMode?: LayoutMode;
    /**
     * 标题名
     */
    title: string;
    className?: string;
}

class LcConfigItem extends Component<LcConfigItemProps> {

    render() {
        const {layoutMode = LayoutMode.LV_LR, title, className} = this.props;
        return (
            <div className={`lc-config-item ${className} ${layoutMode == LayoutMode.LV_LR ?
                'config-left-right' : 'config-up-down'}`}>
                <div className={'lc-config-item-label'}>{title}</div>
                <div className={'lc-config-item-value'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LcConfigItem;