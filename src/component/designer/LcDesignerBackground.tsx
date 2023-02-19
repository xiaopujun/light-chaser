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

    state = {
        bgImgUrl: null
    }
    imgLoaded = false;
    previousImgId = '';
    lcDesBgDom: any = null;

    onClick = (e: any) => {
        this.props.onClick && this.props.onClick(e);
    }

    getBgConfigProps = () => {
        const {projectConfig} = lcDesignerContentStore!;
        const {bgImgUrl} = this.state;
        if (projectConfig) {
            let bgConfigProps: any = {
                height: projectConfig.screenHeight,
                width: projectConfig.screenWidth,
                backgroundColor: '#131e26',
                backgroundSize: '100% 100%',
            }
            //todo 优化，图片不能全部加载到内存中，要通过链接方式渲染背景图
            if (bgImgUrl)
                bgConfigProps['backgroundImage'] = `url(${bgImgUrl})`;
            return bgConfigProps;
        }
    }

    getBgImgSource = () => {
        const {bgConfig} = lcDesignerContentStore!;
        if (bgConfig.bgImgUrl && bgConfig.bgImgUrl !== '' && bgConfig.bgImgUrl !== this.previousImgId && !this.imgLoaded) {
            //注意此处的imgLoaded条件，如果不加，会导致死循环
            this.imgLoaded = true;
            this.setState({bgImgUrl: bgConfig.bgImgUrl});
        }
    }

    render() {
        console.log('LcDesignerBackground render')
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