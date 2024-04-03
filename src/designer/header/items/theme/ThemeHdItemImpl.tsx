import {useRef, useState} from 'react';
import Dialog from "../../../../json-schema/ui/dialog/Dialog";
import './ThemeHdItem.less';
import headerStore from "../../HeaderStore";
import ThemeList from "../../../../comps/common-component/theme-config/theme-list/ThemeList";
import {ThemeItemType} from "../../../DesignerType";
import designerStore from "../../../store/DesignerStore";
import ThemeEditor from "../../../../comps/common-component/theme-config/theme-editor/ThemeEditor";
import Button from "../../../../json-schema/ui/button/Button";

const ThemeHdItemImpl = () => {
    const selectedThemeRef = useRef<ThemeItemType>();
    const [openEditor, setOpenEditor] = useState(false);
    const {themeVisible} = headerStore;

    const onClose = () => headerStore.setThemeVisible(false);

    const updateGlobalTheme = () => {
        const {flashGlobalTheme} = designerStore;
        if (selectedThemeRef.current) {
            flashGlobalTheme(selectedThemeRef.current);
            onClose();
        }
    }

    return (
        <>
            <Dialog title={'主题设置(全局)'} className={'lc-theme-config-global'} visible={themeVisible}
                    onClose={onClose} width={450}>
                <Button style={{width: '100%', height: 50, margin: '5px 0 10px 0'}}
                        onClick={() => setOpenEditor(true)}>
                    + 自定义主题</Button>
                <div style={{maxHeight: 360, overflowY: "scroll", padding: '3px 0 6px 0'}}>
                    <ThemeList onSelected={(value) => selectedThemeRef.current = value}/>
                </div>
                <p style={{color: '#6e6e6e'}}>警告：全局主题设置在更新后，会影响到当前项目的所有组件。请谨慎操作！</p>
                <Button style={{width: '100%', margin: '10px 0 5px 0'}}
                        onClick={updateGlobalTheme}>更新全局主题</Button>
            </Dialog>
            <Dialog onClose={() => setOpenEditor(false)} title={'编辑主题'} visible={openEditor} width={860}>
                <ThemeEditor/>
            </Dialog>
        </>
    );

}

export default ThemeHdItemImpl;