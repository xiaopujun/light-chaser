import React, {Component} from 'react';
import Dialog from "../../lc-dialog/Dialog";
import ThemeEditor from "./theme-editor/ThemeEditor";
import LcButton from "../../lc-button/LcButton";
import ThemeList from "./theme-list/ThemeList";
import {ConfigType} from "../../../framework/types/ConfigType";
import {ThemeItemType} from "../../../framework/types/DesignerType";
import rightStore from "../../../designer/right/RightStore";
import {updateTheme} from "../../../comps/antd/base-bar/AntdBaseBarCore";

class ThemeConfig extends Component<ConfigType> {
    state = {
        editTheme: false,
    }

    openThemeEditor = () => this.setState({editTheme: true});

    closeEditor = () => this.setState({editTheme: false});

    themeChange = (theme: ThemeItemType) => {
        const {updateConfig} = this.props;
        updateTheme(theme, rightStore.activeElemConfig);
        updateConfig && updateConfig({theme: theme});
    }

    render() {
        return (
            <>
                <div className={'lc-theme-config'}>
                    <div className={'lc-theme-custom'}>
                        <LcButton onClick={this.openThemeEditor} style={{width: '100%'}}>+ 自定义主题</LcButton>
                    </div>
                    <br/>
                    <ThemeList onChange={this.themeChange}/>
                </div>
                <Dialog onClose={this.closeEditor} title={'编辑主题'} visible={this.state.editTheme} width={860}>
                    <ThemeEditor/>
                </Dialog>
            </>
        );
    }
}

export default ThemeConfig;