import {Component} from 'react';
import {observer} from "mobx-react";
import './LeftMenus.less';
import designerLeftStore from "../DesignerLeftStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";

class LeftMenus extends Component {

    constructor(props: {}) {
        super(props);
    }

    changeMenu = (menu: string) => {
        if (!menu || menu === '')
            return;
        const {setMenu} = designerLeftStore;
        setMenu(menu);
        //更新标尺位置
        const {rulerRef} = eventOperateStore;
        if (rulerRef)
            rulerRef.ruleWheel();
    }

    buildClassifyList = () => {
        const {menus, menu} = designerLeftStore;
        let classifyArr = [];
        for (let i = 0; i < menus.length; i++) {
            const {icon: Icon, name, key} = menus[i];
            classifyArr.push(
                <div key={i + ''} className={`menu-item ${key === menu ? "menu-item-active" : ""}`}
                     onClick={() => this.changeMenu(key)}>
                    <div className={'menu-item-icon'}><Icon/></div>
                    <span className={'menu-item-content'}>{name}</span>
                </div>
            )
        }
        return classifyArr;
    }

    render() {
        const classifyListDom = this.buildClassifyList();
        return (
            <div className={'designer-left-menus'} style={{overflowY: 'scroll'}}>
                {classifyListDom}
            </div>
        );
    }
}

export default observer(LeftMenus);