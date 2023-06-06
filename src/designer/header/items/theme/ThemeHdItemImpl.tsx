import React, {Component} from 'react';
import Dialog from "../../../../lib/lc-dialog/Dialog";
import headerStore from "../../HeaderStore";
import ThemeList from "../../../../lib/common-fragment/theme-config/theme-list/ThemeList";
import LcButton from "../../../../lib/lc-button/LcButton";
import {ThemeItemType} from "../../../DesignerType";
import designerStore from "../../../store/DesignerStore";

class ThemeHdItemImpl extends Component {

    selectedTheme: ThemeItemType | undefined;

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

    render() {
        const {themeVisible} = headerStore;
        return (
            <Dialog title={'主题设置'} visible={themeVisible} onClose={this.onClose}>
                <ThemeList onChange={(value) => this.selectedTheme = value}/>
                <br/>
                <LcButton style={{width: '100%'}} onClick={this.updateGlobalTheme}>更新主题</LcButton>
                <br/>
            </Dialog>
        );
    }
}

export default ThemeHdItemImpl;