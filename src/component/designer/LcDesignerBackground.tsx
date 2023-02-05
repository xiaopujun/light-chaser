import React, {Component} from 'react';
import lcDesignerContentStore from './store/LcDesignerContentStore';
import localforage from "localforage";
import {observer} from "mobx-react";

interface LcDesignerBackgroundProps {
    onClick?: (e: any) => void;
}

/**
 * 设计器画布背景
 */
class LcDesignerBackground extends Component<LcDesignerBackgroundProps> {

    state = {
        bgImg: null
    }
    imgLoaded = false;
    previousImgId = '';
    lcDesBgDom: any = null;

    onClick = (e: any) => {
        const {bgConfig} = lcDesignerContentStore!;
        if (bgConfig.imgSource && bgConfig.imgSource != '')
            this.props.onClick && this.props.onClick(e);
    }

    getBgConfigProps = () => {
        const {projectConfig} = lcDesignerContentStore!;
        const {bgImg} = this.state;
        if (projectConfig) {
            let bgConfigProps: any = {
                height: projectConfig.screenHeight,
                width: projectConfig.screenWidth,
                backgroundColor: '#131e26',
            }
            if (bgImg)
                bgConfigProps['backgroundImage'] = `url(${this.state.bgImg})`;
            return bgConfigProps;
        }
    }

    getBgImgSource = () => {
        const {bgConfig} = lcDesignerContentStore!;
        if (bgConfig.imgSource && bgConfig.imgSource !== '' && bgConfig.imgSource !== this.previousImgId && !this.imgLoaded) {
            this.previousImgId = bgConfig.imgSource;
            localforage.getItem(bgConfig?.imgSource).then((value => {
                this.setState({bgImg: value, imgLoaded: true});
            }))
        }
    }

    render() {
        this.getBgImgSource();
        return (
            <div className={'lc-canvas'}
                 ref={ref => this.lcDesBgDom = ref}
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