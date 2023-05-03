import React, {PureComponent} from 'react';
import lcDesignerContentStore from '../store/DesignerStore';
import {observer} from "mobx-react";
import {BackgroundColorMode, BackgroundMode} from "../../types/DesignerType";

interface LcDesignerBackgroundProps {
    onClick?: (e: any) => void;
}

/**
 * 设计器画布背景
 */
class DesignerBackground extends PureComponent<LcDesignerBackgroundProps> {

    onClick = (e: any) => {
        this.props.onClick && this.props.onClick(e);
    }

    getBgConfigProps = () => {
        const {bgConfig} = lcDesignerContentStore!;
        let bgImgSize = '100% 100%';
        if (bgConfig.bgImgSize && bgConfig.bgImgSize.length === 2)
            bgImgSize = `${bgConfig.bgImgSize[0]}px ${bgConfig.bgImgSize[1]}px`;
        let bgImgPosition = '0 0';
        if (bgConfig.bgImgPos && bgConfig.bgImgPos.length === 2)
            bgImgPosition = `${bgConfig.bgImgPos[0]}px ${bgConfig.bgImgPos[1]}px`;
        if (bgConfig) {
            let bgConfigProps: any = {
                height: bgConfig.height,
                width: bgConfig.width,
            }
            if (bgConfig.bgImgUrl && bgConfig.bgImgUrl !== '')
                bgConfigProps['backgroundImage'] = `url(${bgConfig.bgImgUrl})`;
            if (bgConfig?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT || bgConfig?.bgColorMode === BackgroundColorMode.RADIAL_GRADIENT)
                bgConfigProps['background'] = bgConfig?.bgColor;
            if (bgConfig?.bgMode === BackgroundMode.PICTURE) {
                bgConfigProps['backgroundSize'] = bgImgSize;
                bgConfigProps['backgroundPosition'] = bgImgPosition;
                bgConfigProps['backgroundRepeat'] = bgConfig?.bgImgRepeat;
            }
            if (bgConfig?.bgColorMode === BackgroundColorMode.SINGLE)
                bgConfigProps['backgroundColor'] = bgConfig.bgColor || '#131e26';
            return bgConfigProps;
        }
    }

    render() {
        return (
            <div className={'lc-canvas'}
                 id={'-1'}
                 data-type={'LcBg'}
                 onClick={this.onClick}
                 style={this.getBgConfigProps()}>
                {this.props.children}
            </div>
        );
    }
}

export default observer(DesignerBackground);