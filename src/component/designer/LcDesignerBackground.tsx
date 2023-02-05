import React, {Component} from 'react';
import lcDesignerContentStore from './store/LcDesignerContentStore';
import localforage from "localforage";

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
    bgImgId = "";

    onClick = (e: any) => {
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
        if (bgConfig) {
            if (bgConfig.imgSource !== '' && bgConfig.imgSource !== this.bgImgId) {
                localforage.getItem(bgConfig?.imgSource).then((value => {
                    this.setState({bgImg: value})
                }))
            }
        }
    }

    render() {
        this.getBgImgSource();
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

export default LcDesignerBackground;