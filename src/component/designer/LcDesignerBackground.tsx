import React, {PureComponent} from 'react';
import lcDesignerContentStore from './store/LcDesignerContentStore';
import {observer} from "mobx-react";

interface LcDesignerBackgroundProps {
    onClick?: (e: any) => void;
}

/**
 * 设计器画布背景
 */
class LcDesignerBackground extends PureComponent<LcDesignerBackgroundProps> {

    onClick = (e: any) => {
        this.props.onClick && this.props.onClick(e);
    }

    getBgConfigProps = () => {
        const {projectConfig, bgConfig} = lcDesignerContentStore!;
        let bgImgSize = '100% 100%';
        if (bgConfig.bgImgSize && bgConfig.bgImgSize.length === 2)
            bgImgSize = `${bgConfig.bgImgSize[0]}px ${bgConfig.bgImgSize[1]}px`;
        let bgImgPosition = '0 0';
        if (bgConfig.bgImgPosition && bgConfig.bgImgPosition.length === 2)
            bgImgPosition = `${bgConfig.bgImgPosition[0]}px ${bgConfig.bgImgPosition[1]}px`;
        if (projectConfig) {
            let bgConfigProps: any = {
                height: projectConfig.screenHeight,
                width: projectConfig.screenWidth,
            }
            if (bgConfig.bgImgUrl && bgConfig.bgImgUrl !== '')
                bgConfigProps['backgroundImage'] = `url(${bgConfig.bgImgUrl})`;
            if (bgConfig?.bgColorMode === '1' || bgConfig?.bgColorMode === '2')
                bgConfigProps['background'] = bgConfig?.bgColor;
            if (bgConfig?.bgMode === '1') {
                bgConfigProps['backgroundSize'] = bgImgSize;
                bgConfigProps['backgroundPosition'] = bgImgPosition;
                bgConfigProps['backgroundRepeat'] = bgConfig?.bgImgRepeat;
            }
            if (bgConfig?.bgColorMode === '0')
                bgConfigProps['backgroundColor'] = bgConfig.bgColor || '#131e26';
            return bgConfigProps;
        }
    }

    render() {
        return (
            <div className={'lc-canvas'}
                 id={'-1'}
                 data-type={'lcCanvas'}
                 onClick={this.onClick}
                 style={this.getBgConfigProps()}>
                {this.props.children}
            </div>
        );
    }
}

export default observer(LcDesignerBackground);