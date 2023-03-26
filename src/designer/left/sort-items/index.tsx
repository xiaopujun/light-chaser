import React, {Component} from 'react';
import {observer} from "mobx-react";
import {sortItems} from "./scanner";
import leftStore from "../store/LeftStore";

class SortList extends Component {

    constructor(props: any) {
        super(props);
        const {setSorts} = leftStore;
        let sorts: Array<any> = [];
        let compNames = Object.keys(sortItems);
        if (sortItems && compNames.length > 0) {
            for (let i = 0; i < compNames.length; i++) {
                const sortInfo = new sortItems[compNames[i]]().getSortItemInfo();
                sorts.push(sortInfo);
            }
            setSorts(sorts);
        }

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