import React, {Component} from 'react';
import {Bar} from "@ant-design/charts";
import {SettingOutlined} from '@ant-design/icons';
import './index.less';
import GlowBorder from "../../../border/four-angle-glow";

/**
 * 基础条形图
 */
export default class AntdBaseBar extends Component {

    componentDidMount() {
        const {subType} = this.props;
        this.setState({subType})
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {currentActive} = this.props;
        if (nextProps.id === currentActive?.activeId) {
            return true;
        } else {
            return false;
        }
    }

    openSet = (event) => {
        const {subType} = this.state;
        const {openRightSlideBox, updateActiveConfig, currentActive} = this.props;
        const {id} = event.currentTarget;
        openRightSlideBox(true);
        updateActiveConfig({activeId: id, activeType: 'AntdBar', activeSubType: subType});
    }

    render() {
        const {id, config} = this.props;
        const {antdBarConfig, backgroundConfig, borderConfig, titleConfig} = config;
        const bgColor = backgroundConfig?.showBg ? backgroundConfig.backgroundColor : 'rgb(1,1,1,0)';
        return (
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: bgColor,
            }}>
                <GlowBorder borderConfig={borderConfig}>
                    <div className={'base-bar'}>
                        <div className={'title'}>
                            <div className={'title-left'}>
                                <label className={'title-main'}
                                       style={{
                                           color: `${titleConfig.mainTitleColor}`,
                                           fontSize: `${titleConfig.mainTitleSize}px`
                                       }}>{titleConfig.mainTitle}</label>
                                <label className={'title-subscrible'}
                                       style={{
                                           color: `${titleConfig.subTitleColor}`,
                                           fontSize: `${titleConfig.subTitleSize}px`
                                       }}>{titleConfig.subTitle}</label>
                            </div>
                            <div className={'title-right'}>
                                <SettingOutlined id={id} onClick={this.openSet} className={'chart-setting'}/>
                            </div>
                        </div>
                        <div className={'content'}>
                            <div className={'content-container'}>
                                <Bar className={'grid-item1-bar'} {...antdBarConfig} />
                            </div>
                        </div>
                    </div>
                </GlowBorder>
            </div>
        );
    }
}
