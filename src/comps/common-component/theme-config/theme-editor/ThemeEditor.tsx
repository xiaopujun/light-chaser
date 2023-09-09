import React, {ChangeEvent, Component, FormEvent} from 'react';
import './ThemeEditor.less';
import ConfigItem from "../../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../../lib/lc-input/UnderLineInput";
import BaseColorPicker from "../../../../lib/lc-color-picker/BaseColorPicker";
import CfgItemBorder from "../../../../lib/lc-config-item/CfgItemBorder";
import ConfigCard from "../../../../lib/lc-config-card/ConfigCard";
import LcButton from "../../../../lib/lc-button/LcButton";
import {ThemeItemType} from "../../../../designer/DesignerType";
import designerStore from "../../../../designer/store/DesignerStore";
import ThemeList from "../theme-list/ThemeList";
import {cloneDeep} from "lodash";

/**
 * 主题编辑器
 */
class ThemeEditor extends Component {

    initThemeConfig: ThemeItemType = {
        id: '',
        name: '',
        colors: {
            main: '#000000',
            mainText: '#000000',
            background: '#000000',
            subText: '#000000',
            supplementFirst: '#000000',
            supplementSecond: '#000000'
        }
    }

    state: any = {
        data: [],
        themeConfig: this.initThemeConfig
    }

    constructor(props: any) {
        super(props);
        const themeList = designerStore.themeConfig;
        this.state.data = cloneDeep(themeList) || [];
    }


    nameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({themeConfig: {...this.state.themeConfig, name: e.target.value}})
    }

    mainColorChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, main: color}
            }
        })
    };

    mainTextChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, mainText: color}
            }
        })
    };

    subTextChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, subText: color}
            }
        })
    };

    backgroundChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, background: color}
            }
        })
    };

    supplementFirstChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, supplementFirst: color}
            }
        })
    };

    supplementSecondChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, supplementSecond: color}
            }
        })
    };

    doSaveOrUpd = (e: FormEvent<HTMLFormElement> | undefined) => {
        e?.preventDefault();
        const {data, themeConfig} = this.state;
        if (themeConfig.id === '') {
            if (data.length > 20)
                alert('主题数量已达上限');
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === themeConfig.name) {
                    alert('主题名称重复');
                    return;
                }
            }
            themeConfig.id = this.state.data.length + 1;
            data.push({...themeConfig});
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === themeConfig.id) {
                    data[i] = {...themeConfig};
                    break;
                }
            }
            themeConfig.id = '';
        }
        this.setState({data, themeConfig: this.initThemeConfig});
        //保存到数据库
        const {updateThemeConfig} = designerStore;
        updateThemeConfig(data);
    }

    onDel = (id: string) => {
        const {data} = this.state;
        let newData = data.filter((item: any) => item.id !== id);
        this.setState({data: newData});
    }

    onSelected = (data: ThemeItemType) => {
        const {themeConfig} = this.state;
        if (themeConfig.id === data.id)
            this.setState({themeConfig: this.initThemeConfig});
        else
            this.setState({themeConfig: data});
    }

    render() {
        const {themeConfig} = this.state;
        return (
            <div className={'lc-theme-editor'}>
                <div className={'editor-left'}>
                    <form onSubmit={this.doSaveOrUpd}>
                        <ConfigCard title={'主题信息'}>
                            <ConfigItem title={'名称'} contentStyle={{width: 80, marginRight: 10}}>
                                <UnderLineInput value={themeConfig.name} onChange={this.nameChanged}
                                                required={true}/>
                            </ConfigItem>
                        </ConfigCard>
                        <ConfigCard title={'颜色定义'}>
                            <ConfigItem title={'主体色'} contentStyle={{width: 80, marginRight: 10}}>
                                <CfgItemBorder>
                                    <BaseColorPicker onChange={this.mainColorChanged} showText={true}
                                                     style={{width: '100%', borderRadius: 2}}
                                                     value={themeConfig.colors.main}/>
                                </CfgItemBorder>
                            </ConfigItem>
                            <ConfigItem title={'主文字'} contentStyle={{width: 80, marginRight: 10}}>
                                <CfgItemBorder>
                                    <BaseColorPicker onChange={this.mainTextChanged} showText={true}
                                                     style={{width: '100%', borderRadius: 2}}
                                                     value={themeConfig.colors.mainText}/>
                                </CfgItemBorder>
                            </ConfigItem>
                            <ConfigItem title={'辅文字'} contentStyle={{width: 80, marginRight: 10}}>
                                <CfgItemBorder>
                                    <BaseColorPicker onChange={this.subTextChanged} showText={true}
                                                     style={{width: '100%', borderRadius: 2}}
                                                     value={themeConfig.colors.subText}/>
                                </CfgItemBorder>
                            </ConfigItem>
                            <ConfigItem title={'背景色'} contentStyle={{width: 80, marginRight: 10}}>
                                <CfgItemBorder>
                                    <BaseColorPicker onChange={this.backgroundChanged} showText={true}
                                                     style={{width: '100%', borderRadius: 2}}
                                                     value={themeConfig.colors.background}/>
                                </CfgItemBorder>
                            </ConfigItem>
                            <ConfigItem title={'补充一'} contentStyle={{width: 80, marginRight: 10}}>
                                <CfgItemBorder>
                                    <BaseColorPicker onChange={this.supplementFirstChanged} showText={true}
                                                     style={{width: '100%', borderRadius: 2}}
                                                     value={themeConfig.colors.supplementFirst}/>
                                </CfgItemBorder>
                            </ConfigItem>
                            <ConfigItem title={'补充二'} contentStyle={{width: 80, marginRight: 10}}>
                                <CfgItemBorder>
                                    <BaseColorPicker onChange={this.supplementSecondChanged} showText={true}
                                                     style={{width: '100%', borderRadius: 2}}
                                                     value={themeConfig.colors.supplementSecond}/>
                                </CfgItemBorder>
                            </ConfigItem>
                        </ConfigCard>
                        <p style={{color: '#6e6e6e'}}>说明：自定义主题色的色值应该保持在同一色系。以确保整体统一的风格。主题色占据主要面积</p>
                        <br/>
                        <div className={'theme-operate-btn'}>
                            <LcButton type={"submit"}>添加 / 更新</LcButton>
                        </div>
                    </form>
                </div>
                <div className={'editor-right'}>
                    <ConfigCard title={'主题列表'}>
                        <ThemeList showOperator={true} onSelected={this.onSelected} onDel={this.onDel}/>
                    </ConfigCard>
                </div>
            </div>
        );
    }
}

export default ThemeEditor;