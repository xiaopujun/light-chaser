import {Component, MouseEvent} from 'react';
import {observer} from "mobx-react";
import '../classify-list/ClassifyList.less';
import classifyListStore from "./ClassifyListStore";
import compListStore from "../../float-configs/comp-list/CompListStore";

class ClassifyList extends Component {

    constructor(props: {}) {
        super(props);
        const {doInit} = classifyListStore;
        doInit && doInit();
    }

    changeClassifyKey = (e: MouseEvent<HTMLDivElement>) => {
        const {setClassifyKey} = classifyListStore;
        const {setVisible, visible} = compListStore;
        setClassifyKey(e.currentTarget.id);
        if (!visible)
            setVisible && setVisible(true);
    }

    buildClassifyList = () => {
        const {classifies} = classifyListStore;
        let classifyArr = [];
        for (let i = 0; i < classifies.length; i++) {
            const {icon: Icon, name, classify} = classifies[i];
            classifyArr.push(
                <div key={i + ''} className={'sort-item'} id={classify} onClick={this.changeClassifyKey}>
                    <div className={'sort-item-icon'}><img style={{width: 20}} src={Icon} alt={'all'}/></div>
                    <span className={'sort-item-content'}>{name}</span>
                </div>
            )
        }
        return classifyArr;
    }

    render() {
        const classifyListDom = this.buildClassifyList();
        return (
            <div className={'lc-charts-sort'} style={{overflowY: 'scroll'}}>
                {classifyListDom}
            </div>
        );
    }
}

export default observer(ClassifyList);