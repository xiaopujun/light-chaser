import {useRef, useState} from 'react';
import './ThemeHdItem.less';
import ThemeList from "../../../../comps/common-component/theme-config/theme-list/ThemeList";
import {ThemeItemType} from "../../../DesignerType";
import layerManager from "../../../manager/LayerManager.ts";
import ThemeEditor from "../../../../comps/common-component/theme-config/theme-editor/ThemeEditor";
import themeManager from "./ThemeManager.ts";
import {Button, Modal} from 'antd';

const ThemeHdItemImpl = () => {
    const selectedThemeRef = useRef<ThemeItemType>();
    const [openEditor, setOpenEditor] = useState(false);
    const {themeVisible, setThemeVisible} = themeManager;

    const onClose = () => setThemeVisible(false);

    const updateGlobalTheme = () => {
        const {flashGlobalTheme} = layerManager;
        if (selectedThemeRef.current) {
            flashGlobalTheme(selectedThemeRef.current);
            onClose();
        }
    }

    return (
        <>
            <Modal title="画布设置" width={500} open={themeVisible} onCancel={onClose}
                   footer={[
                       <Button type="primary" onClick={updateGlobalTheme}>更新全局主题</Button>,
                       <Button type="dashed" onClick={() => setOpenEditor(true)}>自定义主题</Button>,
                       <Button onClick={onClose}>取消</Button>,
                   ]}
                   className={"lc-theme-config-global"}>

                <div style={{maxHeight: 360, overflowY: "scroll", padding: '3px 0 6px 0'}}>
                    <ThemeList onSelected={(value) => selectedThemeRef.current = value}/>
                </div>
                <p style={{color: '#6e6e6e'}}>警告：全局主题设置在更新后，会影响到当前项目的所有组件。请谨慎操作！</p>
            </Modal>
            <Modal title={'编辑主题'} open={openEditor} onCancel={() => setOpenEditor(false)} width={860} footer={null}>
                <ThemeEditor/>
            </Modal>
        </>
    );

}

export default ThemeHdItemImpl;