import React, {Component} from 'react';
import {observer} from "mobx-react";
import classifyListStore from "./ClassifyListStore";

class ClassifyList extends Component {

    constructor(props: any) {
        super(props);
        const {doInit} = classifyListStore;
        doInit && doInit();
    }

    changeClassifyKey = (e: any) => {
        const {setClassifyKey} = classifyListStore;
        setClassifyKey(e.currentTarget.id);
    }

    buildClassifyList = () => {
        const {classifies} = classifyListStore;
        let classifyArr = [];
        for (let i = 0; i < classifies.length; i++) {
            const {icon: Icon, name, type} = classifies[i];
            classifyArr.push(
                <div key={i + ''} className={'sort-item'} id={type} onClick={this.changeClassifyKey}>
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