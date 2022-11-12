import React, {Component} from 'react';
import './style/LCBaseConfig.less';
import PaddingSet from "./PaddingSet";
import LcCompBorderSet from "./LcCompBorderSet";
import LcCompBackgroundSet from "./LcCompBackgroundSet";
import {BaseStyle} from "../../../types/LcDesignerType";

interface LcCompBaseStyleSetProps {
    baseStyle?: BaseStyle;
    updateBaseStyle?: (data: any) => void;
}

/**
 * lc组件基础样式
 */
export default class LcCompBaseStyleSet extends Component<LcCompBaseStyleSetProps> {

    paddingChanged = (padding: string) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({padding: padding});
    }

    backgroundColorChanged = (color: string | string[]) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({backgroundColor: color});
    }

    render() {
        const {baseStyle} = this.props;
        return (
            <div className={'lc-base-config'}>
                <PaddingSet data={baseStyle?.padding} onChange={this.paddingChanged} count={4}/>
                <LcCompBackgroundSet backgroundColorChanged={this.backgroundColorChanged}
                                     backgroundColor={baseStyle?.backgroundColor}/>
                <LcCompBorderSet updateBaseStyle={this.props.updateBaseStyle} {...baseStyle}/>
            </div>
        );
    }
}
