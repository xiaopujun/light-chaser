import React, {Component} from 'react';
import Dialog from "../../../../lib/lc-dialog/Dialog";
import headerStore from "../../HeaderStore";
import ThemeList from "../../../../lib/common-fragment/theme-config/theme-list/ThemeList";
import LcButton from "../../../../lib/lc-button/LcButton";
import {ThemeItemType} from "../../../DesignerType";
import designerStore from "../../../store/DesignerStore";
import ThemeEditor from "../../../../lib/common-fragment/theme-config/theme-editor/ThemeEditor";

class ThemeHdItemImpl extends Component {

    selectedTheme: ThemeItemType | undefined;

    state: any = {
        openEditor: false,
    }

    onClose = () => {
        const {setThemeVisible} = headerStore;
        setThemeVisible(false);
    }

    openTheme = (open: boolean) => {
        this.setState({open});
    }

    updateGlobalTheme = () => {
        const {flashGlobalTheme} = designerStore;
        if (this.selectedTheme) {
            flashGlobalTheme(this.selectedTheme);
            this.onClose();
        }
    }

    openEditor = () => {
        this.setState({openEditor: true});
    }

    closeEditor = () => {
        this.setState({openEditor: false});
    }

    render() {
        const {themeVisible} = headerStore;
        const {openEditor} = this.state;
        return (
            <>
                <Dialog title={'主题设置(全局)'} visible={themeVisible} onClose={this.onClose} width={450}>
                    <LcButton style={{width: '100%', height: 50, margin: '5px 0 10px 0'}}
                              onClick={this.openEditor}>
                        + 自定义主题</LcButton>
                    <ThemeList onChange={(value) => this.selectedTheme = value}/>
                    <p style={{color: '#a98366'}}>警告：全局主题设置在更新后，会影响到当前项目的所有组件。请谨慎操作！</p>
                    <LcButton style={{width: '100%', margin: '10px 0 5px 0'}}
                              onClick={this.updateGlobalTheme}>更新主题</LcButton>
                </Dialog>
                <Dialog onClose={this.closeEditor} title={'编辑主题'} visible={openEditor} width={860}>
                    <ThemeEditor/>
                </Dialog>
            </>
        );
    }
}

export default ThemeHdItemImpl;