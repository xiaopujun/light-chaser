import {observer} from "mobx-react";
import './LeftMenus.less';
import designerLeftStore from "../DesignerLeftStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";

const LeftMenus = () => {
    const changeMenu = (menu: string) => {
        if (!menu || menu === '')
            return;
        const {setMenu} = designerLeftStore;
        setMenu(menu);
        //更新标尺位置
        const {rulerRef} = eventOperateStore;
        if (rulerRef)
            rulerRef.ruleWheel();
    }

    const buildClassifyList = () => {
        const {menus, menu} = designerLeftStore;
        const classifyArr = [];
        for (let i = 0; i < menus.length; i++) {
            const {icon: Icon, name, key} = menus[i];
            classifyArr.push(
                <div key={i + ''} className={`menu-item ${key === menu ? "menu-item-active" : ""}`}
                     onClick={() => changeMenu(key)}>
                    <div className={'menu-item-icon'}><Icon/></div>
                    <span className={'menu-item-content'}>{name}</span>
                </div>
            )
        }
        return classifyArr;
    }

    return (
        <div className={'designer-left-menus'} style={{overflowY: 'scroll'}}>
            {buildClassifyList()}
        </div>
    );
}

export default observer(LeftMenus);