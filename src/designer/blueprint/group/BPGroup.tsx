import React, {useRef, useState, FC, useEffect, useCallback} from 'react';
import {Button, Tabs, TabsProps, Popconfirm, PopconfirmProps} from 'antd';
import "./BPGroup.less";
import {Plus,CloseSmall} from "@icon-park/react";
import {observer} from "mobx-react";
import bluePrintGroupManager from "../manager/BluePrintGroupManager";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;



interface IProps {
    // 在这里定义组件的props类型
}

const TabItem = ({bpgName, remove, tabKey, tabId}) => {
    console.log(bpgName, remove, tabKey, tabId);
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        e.stopPropagation();
        remove && remove(tabKey, tabId);
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        e.stopPropagation();
    };

  return (
      <span className={"tab-item-container"}>
        <span style={{margin:"0 10px"}}>
            {bpgName}
        </span>
          {bpgName!=="初始化"?(
              <span className={"tab-item-remove-btn"} onClick={(e)=>e.stopPropagation()}>
             <Popconfirm
                 title="删除蓝图"
                 description="你确定要删除当前蓝图吗?删除后不可恢复"
                 okText="是"
                 cancelText="否"
                 onConfirm={confirm}
                 onCancel={cancel}
             >
                <CloseSmall theme="outline" size="14" fill="#fff"/>
             </Popconfirm>
        </span>
          ):null}
      </span>
  )
}

const BPGroup: FC<IProps> = (props) => {
    const [initialItems, setInitialItems] = useState([]);
    const [activeKey, setActiveKey] = useState("");
    const [items, setItems] = useState([]);
    const newTabIndex = useRef(0);
    const itemsRef = useRef([]);

    useEffect(()=>{
        let items = [];
        for (let bpgId in bluePrintGroupManager.bluePrintManagerMap){
            const data = bluePrintGroupManager.bluePrintManagerMap[bpgId];
            const item = {
                label: <TabItem bpgName={data.bpgName} remove={remove} tabKey={data.bpgName} tabId={bpgId}/>,
                children: null,
                key: data.bpgName,
                id: bpgId,
                closable: false,
            };
            items.push(item);
        }
        setActiveKey(items[0].key);

        bluePrintGroupManager.bluePrintManager.updateUsedLayerNodes();

        setInitialItems(items);
        itemsRef.current = items;
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
        newPanes.push({
            closable: true,
            label: <TabItem bpgName={key} remove={remove} tabKey={key} tabId={id}/>,
            children: null,
            key: key,
            id
        });
        setItems(newPanes);
        setInitialItems(newPanes);
        setActiveKey(key);
        itemsRef.current = newPanes;

    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        itemsRef.current.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });

        const newPanes = itemsRef.current.filter((item) => item.key !== targetKey);
        if (newPanes.length) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        const delItem = itemsRef.current.find(item=>item.key==targetKey);
        if(delItem){
            bluePrintGroupManager.deleteBluePrintManager(delItem.id);
        }
        setInitialItems(newPanes);
        setItems(newPanes);
        setActiveKey(newActiveKey);
        itemsRef.current=newPanes;
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

    console.log("activeKey>>>", activeKey)

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
