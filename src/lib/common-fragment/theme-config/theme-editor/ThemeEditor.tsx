import React, {Component} from 'react';
import './ThemeEditor.less';
import ConfigItem from "../../../config-item/ConfigItem";
import UnderLineInput from "../../../lc-input/UnderLineInput";
import BaseColorPicker from "../../../lc-color-picker/BaseColorPicker";
import CfgItemBorder from "../../../config-item/CfgItemBorder";
import ThemeItem from "../theme-item/ThemeItem";
import ConfigCard from "../../../config-card/ConfigCard";
import LcButton from "../../../lc-button/LcButton";
import {ThemeItemType} from "../../../../framework/types/DesignerType";
import designerStore from "../../../../designer/store/DesignerStore";

/**
 * 主题编辑器
 */
class ThemeEditor extends Component {

    state: any = {
        data: []
    }

    constructor(props: any) {
        super(props);
        const {list} = designerStore.themeConfig;
        this.state.data = list || [];
    }

    themeConfig: ThemeItemType = {
        id: '-1',
        name: '',
        des: '',
        colors: {
            main: '#000000',
            text: '#000000',
            background: '#000000',
            auxiliary: '#000000',
            emphasize: '#000000',
            supplementary: '#000000'
        }
    }

    nameChanged = (name: string) => this.themeConfig.name = name;

    desChanged = (des: string) => this.themeConfig.des = des;

    mainColorChanged = (color: string) => this.themeConfig.colors.main = color;

    textColorChanged = (color: string) => this.themeConfig.colors.text = color;

    backgroundColorChanged = (color: string) => this.themeConfig.colors.background = color;

    auxiliaryColorChanged = (color: string) => this.themeConfig.colors.auxiliary = color;

    emphasizeColorChanged = (color: string) => this.themeConfig.colors.emphasize = color;

    supplementaryColorChanged = (color: string) => this.themeConfig.colors.supplementary = color;

    doSave = () => {
        if (!this.themeConfig.name) {
            alert('请输入主题名称');
            return;
        }
        const {data} = this.state;
        if (data.length > 20)
            alert('主题数量已达上限');
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === this.themeConfig.name) {
                alert('主题名称重复');
                return;
            }
        }
        this.themeConfig.id = this.state.data.length + 1;
        data.push({...this.themeConfig});
        this.setState({data});
        //保存到数据库
        const {updateThemeConfig} = designerStore;
        updateThemeConfig({list: data});
    }

    render() {
        const {data} = this.state;
        let themeList = [];
        for (let i = 0; i < data.length; i++)
            themeList.push(<ThemeItem key={i} id={data[i].id} name={data[i].name} colors={data[i].colors}
                                      itemStyle={{width: '100%'}}/>);
        return (
            <div className={'lc-theme-editor'}>
                <div className={'editor-left'}>
                    <ConfigCard title={'主题信息'}>
                        <ConfigItem title={'名称'} contentStyle={{width: 80, marginRight: 10}}>
                            <UnderLineInput onChange={this.nameChanged}/>
                        </ConfigItem>
                        <ConfigItem title={'描述'} contentStyle={{width: 110, marginRight: 10}}>
                            <UnderLineInput onChange={this.desChanged}/>
                        </ConfigItem>
                    </ConfigCard>
                    <ConfigCard title={'颜色定义'}>
                        <ConfigItem title={'主题色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder>
                                <BaseColorPicker onChange={this.mainColorChanged} showText={true}
                                                 style={{width: '100%', borderRadius: 2}}
                                                 defaultValue={this.themeConfig.colors.main}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'文字色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder>
                                <BaseColorPicker onChange={this.textColorChanged} showText={true}
                                                 style={{width: '100%', borderRadius: 2}}
                                                 defaultValue={this.themeConfig.colors.text}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'背景色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder>
                                <BaseColorPicker onChange={this.backgroundColorChanged} showText={true}
                                                 style={{width: '100%', borderRadius: 2}}
                                                 defaultValue={this.themeConfig.colors.background}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'辅助色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder>
                                <BaseColorPicker onChange={this.auxiliaryColorChanged} showText={true}
                                                 style={{width: '100%', borderRadius: 2}}
                                                 defaultValue={this.themeConfig.colors.auxiliary}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'强调色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder>
                                <BaseColorPicker onChange={this.emphasizeColorChanged} showText={true}
                                                 style={{width: '100%', borderRadius: 2}}
                                                 defaultValue={this.themeConfig.colors.emphasize}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'补充色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder>
                                <BaseColorPicker onChange={this.supplementaryColorChanged} showText={true}
                                                 style={{width: '100%', borderRadius: 2}}
                                                 defaultValue={this.themeConfig.colors.supplementary}/>
                            </CfgItemBorder>
                        </ConfigItem>
                    </ConfigCard>
                    <p style={{color: '#cd9b9b'}}>说明：自定义主题色的色值应该保持在同一色系。以确保整体统一的风格。主题色占据主要面积</p>
                    <div className={'theme-operate-btn'}>
                        <LcButton onClick={this.doSave}>保存</LcButton>
                    </div>
                </div>
                <div className={'editor-right'}>
                    <ConfigCard title={'主题列表'}>
                        {themeList}
                    </ConfigCard>
                </div>
            </div>

        );
    }
}

export default ThemeEditor;