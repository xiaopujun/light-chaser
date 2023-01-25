import React, {Component} from 'react';

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

interface LcConfigBlockProps {
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

class LcConfigBlock extends Component<LcConfigBlockProps> {
    modeClass: any = {
        [LayoutMode.LV_UD]: 'config-item-lv-ud',
        [LayoutMode.VL_UD]: 'config-item-vl-ud',
        [LayoutMode.LV_LR]: 'config-item-lv-lr',
    }

    render() {
        const {layoutMode = LayoutMode.LV_LR, title, className = ''} = this.props;
        let modeClass = (this.modeClass)[layoutMode];
        return (
            <div className={`lc-cfg-block ${className} ${modeClass}`}>
                <div className={'lc-cfg-block-title'}>{title}</div>
                <div className={'lc-cfg-block-content'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LcConfigBlock;