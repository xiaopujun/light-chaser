import {Component} from 'react';
import Dialog from "../../../../ui/dialog/Dialog";
import './ThemeHdItem.less';
import headerStore from "../../HeaderStore";
import ThemeList from "../../../../comps/common-component/theme-config/theme-list/ThemeList";
import {ThemeItemType} from "../../../DesignerType";
import designerStore from "../../../store/DesignerStore";
import ThemeEditor from "../../../../comps/common-component/theme-config/theme-editor/ThemeEditor";
import Button from "../../../../ui/button/Button";

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
                <Dialog title={'主题设置(全局)'} className={'lc-theme-config-global'} visible={themeVisible}
                        onClose={this.onClose} width={450}>
                    <Button style={{width: '100%', height: 50, margin: '5px 0 10px 0'}}
                            onClick={this.openEditor}>
                        + 自定义主题</Button>
                    <div style={{maxHeight: 360, overflowY: "scroll", padding: '3px 0 6px 0'}}>
                        <ThemeList onSelected={(value) => this.selectedTheme = value}/>
                    </div>
                    <p style={{color: '#6e6e6e'}}>警告：全局主题设置在更新后，会影响到当前项目的所有组件。请谨慎操作！</p>
                    <Button style={{width: '100%', margin: '10px 0 5px 0'}}
                            onClick={this.updateGlobalTheme}>更新全局主题</Button>
                </Dialog>
                <Dialog onClose={this.closeEditor} title={'编辑主题'} visible={openEditor} width={860}>
                    <ThemeEditor/>
                </Dialog>
            </>
        );
    }
}

export default ThemeHdItemImpl;