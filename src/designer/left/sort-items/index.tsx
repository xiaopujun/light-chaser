import React, {Component} from 'react';
import {observer} from "mobx-react";
import leftStore from "../store/LeftStore";
import {sortItemScanner} from "./scanner";

class SortList extends Component {

    constructor(props: any) {
        super(props);
        //todo 需要优化调用结构
        sortItemScanner();
    }

    changeSortKey = (e: any) => {
        const {setSortKey, setShowComps} = leftStore;
        setSortKey(e.currentTarget.id);
        setShowComps(true);
    }

    buildSortList = () => {
        const {sorts} = leftStore;
        let sortList = [];
        for (let i = 0; i < sorts.length; i++) {
            const {icon: Icon, name, type} = sorts[i];
            sortList.push(
                <div key={i + ''} className={'sort-item'} id={type} onClick={this.changeSortKey}>
                    <div className={'sort-item-icon'}><Icon/></div>
                    <span className={'sort-item-content'}>{name}</span>
                </div>
            )
        }
        return sortList;
    }

    render() {
        const sortListDom = this.buildSortList();
        return (
            <div className={'lc-charts-sort'}>
                {sortListDom}
            </div>
        );
    }
}

export default observer(SortList);