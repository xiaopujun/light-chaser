import {Component} from 'react';
import {observer} from "mobx-react";
import './LeftMenus.less';
import classifyListStore from "./LeftMenusStore";
import designerLeftStore from "../DesignerLeftStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";

class LeftMenus extends Component {

    constructor(props: {}) {
        super(props);
    }

    changeMenu = (key: string) => {
        if (!key || key === '')
            return;
        const {setKey} = designerLeftStore;
        setKey(key);
        //更新标尺位置
        const {rulerRef} = eventOperateStore;
        if (rulerRef)
            rulerRef.ruleWheel();
    }

    buildClassifyList = () => {
        const {classifies} = classifyListStore;
        let classifyArr = [];
        for (let i = 0; i < classifies.length; i++) {
            const {icon: Icon, name, key} = classifies[i];
            classifyArr.push(
                <div key={i + ''} className={'menu-item'} onClick={() => this.changeMenu(key)}>
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