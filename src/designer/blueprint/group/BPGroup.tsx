import React, {useRef, useState, FC, useEffect, useCallback} from 'react';
import {Button, Tabs, TabsProps} from 'antd';
import "./BPGroup.less";
import {Plus} from "@icon-park/react";
import {observer} from "mobx-react";
import bluePrintGroupManager from "../manager/BluePrintGroupManager";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;



interface IProps {
    // 在这里定义组件的props类型
}

const BPGroup: FC<IProps> = (props) => {
    const [initialItems, setInitialItems] = useState([]);
    const [activeKey, setActiveKey] = useState("");
    const [items, setItems] = useState([]);
    const newTabIndex = useRef(0);

    useEffect(()=>{
        let items = [];
        for (let bpgId in bluePrintGroupManager.bluePrintManagerMap){
            const data = bluePrintGroupManager.bluePrintManagerMap[bpgId];
            const item = {
                label: <span style={{margin:"0 10px"}}>{data.bpgName}</span>,
                children: null,
                key: data.bpgName,
                id: bpgId,
                closable: false,
            };
            items.push(item);
        }
        setActiveKey(items[0].key);

        setInitialItems(items);
    },[bluePrintGroupManager.bluePrintManagerMap.length])

    useEffect(()=>{
        if(initialItems.length>0){
            setItems(initialItems);
            newTabIndex.current = initialItems.length;
        }
    },[initialItems]);

    const onChange = (newActiveKey: string) => {
        const item = initialItems.find(tabItem=>tabItem.key==newActiveKey);
        bluePrintGroupManager.changeBluePrintManager(item.id);
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newPanes = [...items];
        const key = `事件蓝图${newTabIndex.current++}`;
        let id = bluePrintGroupManager.createBluePrintManager(key);
        newPanes.push({closable: true, label: <span style={{margin:"0 10px"}}>{key}</span>, children: null, key: key, id });
        setItems(newPanes);
        setInitialItems(newPanes);
        setActiveKey(key);

    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    const width = window.innerWidth - 670;

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <div style={{display:"flex", alignItems: "center"}}>
            <DefaultTabBar {...props} />
            <div className={"add-group-btn"}>
                <Button icon={<Plus theme="outline" size="24" fill="#fff"/>} onClick={add}/>
            </div>
        </div>
    );

    return (
        <div className={'bp-footer-item'} style={{width}}>
            <Tabs
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
                tabPosition="bottom"
                renderTabBar={renderTabBar}
                tabBarStyle={{maxWidth:width-100}}
            />
        </div>
    );
};

export default observer(BPGroup);
