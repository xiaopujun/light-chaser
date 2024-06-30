import {Component} from 'react';
import Dialog from "../../../json-schema/ui/dialog/Dialog";
import ThemeEditor from "./theme-editor/ThemeEditor";
import ThemeList from "./theme-list/ThemeList";
import {ThemeItemType} from "../../../designer/DesignerType";
import rightStore from "../../../designer/right/RightStore";
import Button from "../../../json-schema/ui/button/Button";
import {layerManager} from "../../../designer/loader/EditDesignerManager.ts";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController.ts";

class ThemeConfig extends Component<{ controller: AbstractDesignerController }> {
    state = {
        editTheme: false,
    }

    openThemeEditor = () => this.setState({editTheme: true});

    closeEditor = () => this.setState({editTheme: false});

    themeChange = (theme: ThemeItemType) => {
        if (!theme) return;
        const {activeElem: {id}} = rightStore;
        const {compController} = layerManager;
        const instance = compController[id + ''];
        instance && instance.updateTheme(theme);
    }

    render() {
        return (
            <>
                <div className={'lc-theme-config'}>
                    <div className={'lc-theme-custom'}>
                        <Button onClick={this.openThemeEditor} style={{width: '100%'}}>+ 自定义主题</Button>
                    </div>
                    <br/>
                    <ThemeList onSelected={this.themeChange}/>
                </div>
                <Dialog onClose={this.closeEditor} title={'编辑主题'} visible={this.state.editTheme} width={860}>
                    <ThemeEditor/>
                </Dialog>
            </>
        );
    }
}

export default ThemeConfig;