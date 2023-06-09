import React, {Component} from 'react';
import {LineOutlined} from "@ant-design/icons";
import {Input} from "antd";
import compListStore from "./CompListStore";
import classifyListStore from "../classify-list/ClassifyListStore";
import './CompList.less';
import {observer} from "mobx-react";
import designerStarter from "../../DesignerStarter";
import designerStore from "../../store/DesignerStore";
import {snowflake} from "../../../utils/IdGenerate";
import {MovableItemData} from "../../../lib/lc-movable/MovableItem";

class CompList extends Component {

    constructor(props: any) {
        super(props);
        const {doInit} = compListStore;
        doInit && doInit();
    }

    addItem = (compKey: string) => {
        const {addItem} = designerStore;
        let movableItem: MovableItemData = {
            type: compKey,
            width: 384,
            height: 216,
            position: [0, 0],
            id: snowflake.generateId() + ''
        }
        addItem && addItem(movableItem);
    }

    getChartDom = () => {
        let chartDom = [];
        let {classifyKey} = classifyListStore
        let {comps, compKey} = compListStore;
        if (classifyKey !== 'all') {
            comps = comps.filter((item: any) => {
                return item.typeKey === classifyKey;
            })
        }
        if (compKey !== '') {
            comps = comps.filter((item: any) => {
                return item.name.indexOf(compKey) >= 0;
            })
        }
        for (let i = 0; i < comps.length; i++) {
            let compInfo: any = comps[i];
            const {name, key} = compInfo;
            const {customComponentInfoMap} = designerStarter;
            let lcCompInit: any = customComponentInfoMap[key];
            let chartImg = lcCompInit.getChartImg();
            chartDom.push(
                <div key={i + ''} className={'list-item droppable-element'}>
                    <div className={'item-header'}>
                        <div className={'item-name'}>{name}</div>
                        <div className={'item-type'}>Antd</div>
                    </div>
                    <div className={'item-content'} onDoubleClick={() => this.addItem(key)}>
                        <div className={'item-img'} style={{backgroundImage: `url(${chartImg})`}}/>
                    </div>
                </div>
            )
        }
        return chartDom;
    }

    onClose = () => {
        const {setVisible} = compListStore;
        setVisible && setVisible(false);
    }

    searchChart = (e: any) => {
        const {setCompKey} = compListStore;
        setCompKey && setCompKey(e.currentTarget.value);
    }

    render() {
        const {visible} = compListStore;
        return (
            <>
                {visible ? <div className={'lc-comp-list'}>
                    <div className={'list-title'}>
                        <div className={'title-content'}>组件列表</div>
                        <div onClick={this.onClose}><span><LineOutlined/></span></div>
                    </div>
                    <div className={'list-search'}>
                        <Input placeholder="搜索组件" onPressEnter={this.searchChart}
                               style={{width: '100%'}}/>
                    </div>
                    <div className={'list-items'}>
                        {this.getChartDom()}
                    </div>
                </div> : <></>}
            </>
        );
    }
}

export default observer(CompList);