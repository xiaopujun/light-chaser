import React, {Component} from 'react';
import './ThemeEditor.less';
import ConfigItem from "../../../config-item/ConfigItem";
import UnderLineInput from "../../../lc-input/UnderLineInput";
import BaseColorPicker from "../../../lc-color-picker/BaseColorPicker";
import CfgItemBorder from "../../../config-item/CfgItemBorder";
import ThemeItem from "../theme-item/ThemeItem";
import ConfigCard from "../../../config-card/ConfigCard";
import LcButton from "../../../lc-button/LcButton";

/**
 * 主题编辑器
 */
class ThemeEditor extends Component {
    render() {
        return (
            <div className={'lc-theme-editor'}>
                <div className={'editor-left'}>
                    <ConfigCard title={'主题信息'}>
                        <ConfigItem title={'名称'} contentStyle={{width: 80, marginRight: 10}}>
                            <UnderLineInput/>
                        </ConfigItem>
                        <ConfigItem title={'描述'} contentStyle={{width: 110, marginRight: 10}}>
                            <UnderLineInput/>
                        </ConfigItem>
                    </ConfigCard>
                    <ConfigCard title={'颜色定义'}>
                        <ConfigItem title={'主题色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder><BaseColorPicker showText={true} style={{width: '100%', borderRadius: 2}}
                                                            value={'#8cffc9'}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'文字色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder><BaseColorPicker showText={true} style={{width: '100%', borderRadius: 2}}
                                                            value={'#19ffa8'}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'背景色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder><BaseColorPicker showText={true} style={{width: '100%', borderRadius: 2}}
                                                            value={'#00e08e'}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'辅助色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder><BaseColorPicker showText={true} style={{width: '100%', borderRadius: 2}}
                                                            value={'#00a66c'}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'强调色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder><BaseColorPicker showText={true} style={{width: '100%', borderRadius: 2}}
                                                            value={'#006e4b'}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'补充色'} contentStyle={{width: 80, marginRight: 10}}>
                            <CfgItemBorder><BaseColorPicker showText={true} style={{width: '100%', borderRadius: 2}}
                                                            value={'#0d4e39'}/>
                            </CfgItemBorder>
                        </ConfigItem>
                    </ConfigCard>
                    <p style={{color: '#cd9b9b'}}>说明：自定义主题色的色值应该保持在同一色系。以确保整体统一的风格。主题色占据主要面积</p>
                    <div className={'theme-operate-btn'}>
                        <LcButton>保存</LcButton>
                        <LcButton>取消</LcButton>
                    </div>
                </div>
                <div className={'editor-right'}>
                    <ConfigCard title={'主题列表'}>
                        <ThemeItem itemStyle={{width: '100%'}} selected={true}
                                   colors={{
                                       main: '#ffdac0',
                                       text: '#ffbf7c',
                                       background: '#ffaa59',
                                       auxiliary: '#ff8d3b',
                                       emphasize: '#ff6e00',
                                       supplementary: '#c35a00'
                                   }}/>
                    </ConfigCard>
                </div>
            </div>

        );
    }
}

export default ThemeEditor;