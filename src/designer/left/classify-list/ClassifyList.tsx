import React, {Component} from 'react';
import {observer} from "mobx-react";
import classifyListStore from "./ClassifyListStore";
import compListStore from "../comp-list/CompListStore";

class ClassifyList extends Component {

    constructor(props: any) {
        super(props);
        const {doInit} = classifyListStore;
        doInit && doInit();
    }

    changeClassifyKey = (e: any) => {
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
                    <div className={'sort-item-icon'}><Icon/></div>
                    <span className={'sort-item-content'}>{name}</span>
                </div>
            )
        }
        return classifyArr;
    }

    render() {
        const classifyListDom = this.buildClassifyList();
        return (
            <div className={'lc-charts-sort'}>
                {classifyListDom}
            </div>
        );
    }
}

export default observer(ClassifyList);