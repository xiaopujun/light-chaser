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
                backgroundColor: bgConfig.bgColor || '#131e26',
                backgroundSize: bgImgSize,
                backgroundPosition: bgImgPosition,
                backgroundRepeat: bgConfig?.bgImgRepeat,
            }
            //todo 优化，图片不能全部加载到内存中，要通过链接方式渲染背景图
            if (bgConfig.bgImgUrl && bgConfig.bgImgUrl !== '')
                bgConfigProps['backgroundImage'] = `url(${bgConfig.bgImgUrl})`;
            return bgConfigProps;
        }
    }

    // getBgImgSource = () => {
    //     const {bgConfig} = lcDesignerContentStore!;
    //     if (bgConfig.bgImgUrl && bgConfig.bgImgUrl !== '' && bgConfig.bgImgUrl !== this.previousImgId && !this.imgLoaded) {
    //         //注意此处的imgLoaded条件，如果不加，会导致死循环
    //         this.imgLoaded = true;
    //         this.setState({bgImgUrl: bgConfig.bgImgUrl});
    //     }
    // }

    render() {

        return (
            <div className={'lc-canvas'}
                // ref={ref => this.lcDesBgDom = ref}
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