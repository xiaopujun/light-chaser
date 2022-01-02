import React, {Component} from 'react';
import {Input, Slider} from "antd";
import ColorPicker from "../../color-picker/base";
import './index.less';

/**
 * 标题设置
 */
class TitleConfig extends Component {

    updateTitleContent = (event) => {
        const {value, name} = event.target;
        const {updateTitleConfig} = this.props;
        switch (name) {
            case "mainTitle":
                updateTitleConfig({mainTitle: value});
                break;
            case "subTitle":
                updateTitleConfig({subTitle: value});
                break;
            default:
                break;
        }
    }

    updateTitleColor = (name, color) => {
        const {updateTitleConfig} = this.props;
        switch (name) {
            case "mainTitleColor":
                updateTitleConfig({mainTitleColor: color});
                break;
            case "subTitleColor":
                updateTitleConfig({subTitleColor: color});
                break;
            default:
                break;
        }
    }

    updateMainTitleSize = (value) => {
        const {updateTitleConfig} = this.props;
        updateTitleConfig({mainTitleSize: value});
    }

    updateSubTitleSize = (value) => {
        const {updateTitleConfig} = this.props;
        updateTitleConfig({subTitleSize: value});
    }

    render() {
        return (
            <>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>主标题：</label>
                    <Input name={'mainTitle'} onPressEnter={this.updateTitleContent}
                           className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>副标题：</label>
                    <Input name={'subTitle'} onPressEnter={this.updateTitleContent}
                           className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>主标题颜色：</label>
                    <ColorPicker name={'mainTitleColor'} onChange={this.updateTitleColor}
                                 className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>副标题颜色：</label>
                    <ColorPicker name={'subTitleColor'} onChange={this.updateTitleColor}
                                 className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>标题大小：</label>
                    <Slider defaultValue={16} max={100} min={8} style={{width: '60%'}} name={'mainTitleSize'}
                            onChange={this.updateMainTitleSize}
                            className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>副标题大小：</label>
                    <Slider defaultValue={10} max={100} min={8} style={{width: '60%'}} name={'mainTitleSize'}
                            onChange={this.updateSubTitleSize}
                            className={'config-item-value'}/>
                </div>
            </>
        );
    }
}

export default TitleConfig;