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
                    <div className={'theme-operate-btn'}>
                        <LcButton>保存</LcButton>
                        <LcButton>取消</LcButton>
                    </div>
                </div>
                <div className={'editor-right'}>
                    <ConfigCard title={'主题列表'}>
                        <ThemeItem itemStyle={{width: '100%'}} active={true} main={'#ffdac0'} text={'#ffbf7c'}
                                   background={'#ffaa59'}
                                   auxiliary={'#ff8d3b'}
                                   emphasize={'#ff6e00'} supplementary={'#c35a00'}/>
                        <ThemeItem itemStyle={{width: '100%'}} main={'#c0e5ff'} text={'#7cbaff'} background={'#59aaff'}
                                   auxiliary={'#3b8dff'}
                                   emphasize={'#0072ff'} supplementary={'#005ac3'}/>
                        <ThemeItem itemStyle={{width: '100%'}} main={'#ffeac0'} text={'#ffdf7c'} background={'#ffc659'}
                                   auxiliary={'#ffb23b'}
                                   emphasize={'#ffa000'} supplementary={'#c37900'}/>
                        <ThemeItem itemStyle={{width: '100%'}} main={'#e7c0ff'} text={'#b17cff'} background={'#9959ff'}
                                   auxiliary={'#7b3bff'}
                                   emphasize={'#5800ff'} supplementary={'#4f00c3'}/>
                        <ThemeItem itemStyle={{width: '100%'}} main={'#c6c6c6'} text={'#969696'} background={'#6f6f6f'}
                                   auxiliary={'#4c4c4c'}
                                   emphasize={'#292929'} supplementary={'#1f1f1f'}/>
                        <ThemeItem itemStyle={{width: '100%'}} main={'#c0a978'} text={'#7c5d3d'} background={'#a97542'}
                                   auxiliary={'#8d5c3b'}
                                   emphasize={'#724028'} supplementary={'#5a3200'}/>
                    </ConfigCard>
                </div>
            </div>

        );
    }
}

export default ThemeEditor;