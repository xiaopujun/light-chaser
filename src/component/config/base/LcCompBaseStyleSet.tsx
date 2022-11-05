import React, {Component} from 'react';
import './style/LCBaseConfig.less';
import PaddingSet from "./PaddingSet";
import LcCompBorderSet from "./LcCompBorderSet";
import LcCompBackgroundSet from "./LcCompBackgroundSet";
import {BaseStyle} from "../../../global/types";

interface LcCompBaseStyleSetProps {
    baseStyle?: BaseStyle;
    updateElemBaseSet?: (data: any) => void;
}

/**
 * lc组件基础样式
 */
export default class LcCompBaseStyleSet extends Component<LcCompBaseStyleSetProps> {

    paddingChanged = (padding: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({padding: padding});
    }

    backgroundColorChanged = (color: string | string[]) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({backgroundColor: color});
    }

    render() {
        const {baseStyle} = this.props;
        return (
            <div className={'lc-base-config'}>
                <PaddingSet onChange={this.paddingChanged} count={4}/>
                <LcCompBackgroundSet backgroundColorChanged={this.backgroundColorChanged} {...baseStyle}/>
                <LcCompBorderSet updateElemBaseSet={this.props.updateElemBaseSet} {...baseStyle}/>
            </div>
        );
    }
}
