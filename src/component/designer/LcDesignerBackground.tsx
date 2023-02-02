import React, {Component} from 'react';
import lcDesignerContentStore from './store/LcDesignerContentStore';
import localforage from "localforage";

/**
 * 设计器画布背景
 */
class LcDesignerBackground extends Component {

    state = {
        bgImg: null
    }
    bgImgId = "";

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
        console.log('LcDesignerBackground render');
        this.getBgImgSource();
        const {updateActive} = lcDesignerContentStore;
        return (
            <div className={'lc-canvas'}
                 id={'-1'}
                 data-type={'lcCanvas'}
                 onClick={updateActive}
                 style={this.getBgConfigProps()}>
                {this.props.children}
            </div>
        );
    }
}

export default LcDesignerBackground;