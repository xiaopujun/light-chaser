import React, {Component} from 'react';
import ConfigItem from "../../../lib/config-item/ConfigItem";
import Dialog from "../../../lib/lc-dialog/Dialog";
import headerStore from "../HeaderStore";
import CfgItemBorder from "../../../lib/config-item-border/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import LcSwitch from "../../../lib/lc-switch/LcSwitch";
import ConfigCard from "../../../lib/config-card/ConfigCard";

class ThemeHdItemImpl extends Component {

    state = {
        open: false
    }

    onClose = () => {
        const {setThemeVisible} = headerStore;
        setThemeVisible(false);
    }

    openTheme = (open: boolean) => {
        this.setState({open});
    }

    render() {
        const {themeVisible} = headerStore;
        const {open} = this.state;
        return (
            <Dialog title={'主题设置'} visible={themeVisible} onClose={this.onClose}>
                <ConfigItem title={'开启'}>
                    <LcSwitch onChange={this.openTheme}/>
                </ConfigItem>
                {open && <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <ConfigCard title={'颜色划分'}>
                        <ConfigItem title={'主体色'} contentStyle={{width: 90, marginRight: 20}}>
                            <CfgItemBorder>
                                <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'文字色'} contentStyle={{width: 90, marginRight: 20}}>
                            <CfgItemBorder>
                                <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'副文字色'} contentStyle={{width: 90, marginRight: 20}}>
                            <CfgItemBorder>
                                <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'背景色'} contentStyle={{width: 90, marginRight: 20}}>
                            <CfgItemBorder>
                                <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'辅助色'} contentStyle={{width: 90, marginRight: 20}}>
                            <CfgItemBorder>
                                <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'强调色'} contentStyle={{width: 90, marginRight: 20}}>
                            <CfgItemBorder>
                                <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                        <ConfigItem title={'补充色'} contentStyle={{width: 90, marginRight: 20}}>
                            <CfgItemBorder>
                                <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                    </ConfigCard>
                </div>}
                <br/>
                <p style={{padding: '0 10px', color: '#b0b0b0', fontSize: 12}}>说明：全局主题设置后，将会对所有实现了主题系统的组件生效</p>
            </Dialog>
        );
    }
}

export default ThemeHdItemImpl;