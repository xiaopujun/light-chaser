import React, {Component, MouseEvent} from 'react';
import {BackgroundColorMode, BackgroundMode} from "../../../designer/DesignerType";
import AbstractBackgroundImpl, {AbstractBackgroundImplProps, BackgroundConfigType} from "./AbstractBackgroundImpl";
import designerStore from "../../../designer/store/DesignerStore";
import EditorDesignerLoader from "../../../designer/loader/EditorDesignerLoader";

interface LcDesignerBackgroundProps {
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    config?: BackgroundConfigType;
}

/**
 * 设计器画布背景
 */
class DesignerBackground extends Component<LcDesignerBackgroundProps> {

    constructor(props: LcDesignerBackgroundProps) {
        super(props);
        const {compInstances, elemConfigs} = designerStore;
        let config: AbstractBackgroundImplProps | null = null;
        if ('80cc666f' in elemConfigs!)
            config = elemConfigs['80cc666f'];
        else {
            const componentDefine = EditorDesignerLoader.getInstance().customComponentInfoMap['LcBg'];
            if (componentDefine)
                config = componentDefine.getInitConfig();
        }
        compInstances['80cc666f'] = new AbstractBackgroundImpl(this, config!);
        this.state = {config: config?.background}
        delete elemConfigs!['80cc666f'];
    }

    onClick = (e: MouseEvent<HTMLDivElement>) => {
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