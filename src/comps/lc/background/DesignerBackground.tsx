import React, {Component} from 'react';
import {BackgroundColorMode, BackgroundMode} from "../../../designer/DesignerType";
import AbstractBackgroundImpl, {BackgroundConfigType} from "./AbstractBackgroundImpl";
import designerStore from "../../../designer/store/DesignerStore";

interface LcDesignerBackgroundProps {
    onClick?: (e: any) => void;
    config?: BackgroundConfigType;
}

/**
 * 设计器画布背景
 */
class DesignerBackground extends Component<LcDesignerBackgroundProps> {

    constructor(props: LcDesignerBackgroundProps) {
        super(props);
        const instance = new AbstractBackgroundImpl(this);
        const {compInstances} = designerStore;
        compInstances['80cc666f'] = instance;
        this.state = {config: instance.getConfig()?.background}
    }

    onClick = (e: any) => {
        const {onClick} = this.props;
        onClick && onClick(e);
    }

    getBgConfigProps = () => {
        // const bgConfig: BackgroundConfigType = this.props.config!!;
        const {config: bgConfig} = this.state as any;
        const {width, height, bgMode, bgColor, bgImg} = bgConfig;
        let bgImgSize = '100% 100%';
        if (bgImg.bgImgSize && bgImg.bgImgSize.length === 2)
            bgImgSize = `${bgConfig.bgImg.bgImgSize[0]}px ${bgImg.bgImgSize[1]}px`;
        let bgImgPosition = '0 0';
        if (bgImg.bgImgPos && bgImg.bgImgPos.length === 2)
            bgImgPosition = `${bgImg.bgImgPos[0]}px ${bgImg.bgImgPos[1]}px`;
        if (bgConfig) {
            let bgConfigProps: any = {height: height, width: width}
            if (bgMode + '' === BackgroundMode.NONE)
                bgConfigProps['backgroundColor'] = '#000000';
            else if (bgMode + '' === BackgroundMode.PICTURE) {
                if (bgImg.bgImgUrl && bgImg.bgImgUrl !== '') {
                    bgConfigProps['backgroundImage'] = `url(${bgImg.bgImgUrl})`;
                    bgConfigProps['backgroundSize'] = bgImgSize;
                    bgConfigProps['backgroundPosition'] = bgImgPosition;
                    bgConfigProps['backgroundRepeat'] = bgImg?.bgImgRepeat;
                } else
                    bgConfigProps['backgroundColor'] = '#000000';
            } else {
                const {single, radialGradient, linearGradient, bgColorMode} = bgColor;
                if (bgConfig?.bgColor.bgColorMode + '' === BackgroundColorMode.SINGLE)
                    bgConfigProps['backgroundColor'] = single.color;
                else if (bgColorMode === BackgroundColorMode.LINEAR_GRADIENT)
                    bgConfigProps['background'] = linearGradient.color;
                else
                    bgConfigProps['background'] = radialGradient.color;
            }
            return bgConfigProps;
        }
    }

    render() {
        return (
            <div className={'lc-background'}
                 id={'80cc666f'}
                 data-type={'LcBg'}
                 onDoubleClick={this.onClick}
                 style={this.getBgConfigProps()}>
                {this.props.children}
            </div>
        );
    }
}

export default DesignerBackground;