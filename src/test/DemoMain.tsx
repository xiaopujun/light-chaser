import React from 'react';
import {observer} from "mobx-react";
import './DemoMain.less';
import {LayerGroupItem} from "../designer/float-configs/layer-list/group/LayerGroupItem";
import LayerItem from "../designer/float-configs/layer-list/item/LayerItem";
import {MovableItemType} from "../designer/operate-provider/movable/types";
import AVLTree from "../framework/data-structure/avl-tree/AVLTree";

interface TreeNode {
    id: number;
    name: string;
    pid?: number;
    children?: TreeNode[];
}

class MyComponent extends React.Component {

    avlTree = new AVLTree();

    layerData: MovableItemType[] = [
        {
            "name": "Antd基础面积图",
            "type": "AntdBaseArea",
            "width": 250,
            "height": 220,
            "position": [
                375,
                79.9895
            ],
            "id": "HhHnA4HDKZ",
            "lock": false,
            "hide": false,
            "order": 9
        },
        {
            "name": "Antd基础面积图",
            "type": "AntdBaseArea",
            "width": 250,
            "height": 220,
            "position": [
                660,
                80
            ],
            "id": "aKsbw8mFmq",
            "lock": false,
            "hide": false,
            "order": 17
        },
        {
            "name": "Antd区间条形图",
            "type": "AntdRangeBar",
            "width": 260,
            "height": 200,
            "position": [
                375,
                300
            ],
            "id": "311uMpnelG",
            "lock": false,
            "hide": false,
            "order": 18
        },
        {
            "name": "Antd基础柱状图",
            "type": "AntdBaseColumn",
            "width": 238,
            "height": 200,
            "position": [
                672.286,
                300
            ],
            "id": "kL0aATkPEQ",
            "lock": false,
            "hide": false,
            "order": 19
        },
        {
            "name": "Antd百分比柱状图",
            "type": "AntdPercentColumn",
            "width": 320,
            "height": 200,
            "position": [
                335,
                306
            ],
            "id": "6LnduuTQ7I",
            "lock": false,
            "hide": false,
            "order": 20,
            "pid": 'ke1MpSvTa2'
        },
        {
            "name": "Antd饼图",
            "type": "AntdPie",
            "width": 320,
            "height": 200,
            "position": [
                332,
                494
            ],
            "id": "tvzJnuWZru",
            "lock": false,
            "hide": false,
            "order": 21
        },
        {
            "name": "Antd气泡图",
            "type": "AntdScatterBubble",
            "width": 320,
            "height": 200,
            "position": [
                422,
                213
            ],
            "id": "xvqYHHqVuH",
            "lock": false,
            "hide": false,
            "order": 39
        },
        {
            "name": "Antd百分比面积图",
            "type": "AntdPercentArea",
            "width": 320,
            "height": 200,
            "position": [
                281,
                286
            ],
            "id": "ZT8kOIcfsH",
            "lock": false,
            "hide": false,
            "order": 40
        },
        {
            "name": "Antd基础面积图",
            "type": "AntdBaseArea",
            "width": 320,
            "height": 200,
            "position": [
                341,
                183
            ],
            "id": "jJyeQ0iDoH",
            "lock": false,
            "hide": false,
            "order": 41,
            "pid": 'ke1MpSvTa2'
        },
        {
            "name": "Antd基础面积图",
            "type": "AntdBaseArea",
            "width": 250,
            "height": 220,
            "position": [
                375.014,
                113.995
            ],
            "id": "ke1MpSvTao",
            "lock": false,
            "hide": false,
            "order": 42
        },
        {
            "name": "Antd基础面积图",
            "type": "group",
            "id": "ke1MpSvTa2",
            "lock": false,
            "hide": false,
            "order": 425
        },
        {
            "name": "Antd基础面积图",
            "type": "AntdBaseArea",
            "width": 250,
            "height": 220,
            "position": [
                660.014,
                114.0055
            ],
            "id": "aUfIsKSSZk",
            "lock": false,
            "hide": false,
            "order": 43
        },
    ]

    // testData = [
    //     {id: 0, name: '数据0'},
    //     {id: 1, pid: 0, name: '数据1'},
    //     {id: 2, pid: 0, name: '数据2'},
    //     {id: 3, pid: 1, name: '数据3'},
    //     {id: 4, name: '数据4'},
    //     {id: 5, pid: 1, name: '数据5'},
    //     {id: 6, name: '数据6'},
    //     {id: 7, pid: 2, name: '数据7'},
    //     {id: 8, pid: 2, name: '数据8'},
    //     {id: 9, name: '数据9'},
    // ]

    resData = [
        {
            id: 0, name: '数据0', children: [
                {
                    id: 1, pid: 0, name: '数据1', children: [
                        {id: 3, pid: 1, name: '数据3'},
                        {id: 5, pid: 1, name: '数据5'},
                    ]
                },
                {
                    id: 2, pid: 0, name: '数据2', children: [
                        {id: 7, pid: 2, name: '数据7'},
                        {id: 8, pid: 2, name: '数据8'},
                    ]
                },
            ]
        },
        {id: 4, name: '数据4'},
        {id: 6, name: '数据6'},
        {id: 9, name: '数据9'},
    ]


    parseData = (testData: TreeNode[]): TreeNode[] => {
        const idMap: { [id: number]: TreeNode } = {};
        // 将节点按照 id 映射到一个对象
        for (const node of testData) {
            idMap[node.id] = node;
        }
        // 构建树结构
        const resData: TreeNode[] = [];
        for (const node of testData) {
            if (node.pid === undefined) {
                // 根节点
                resData.push(node);
            } else {
                // 非根节点，将其加入父节点的 children 中
                const parent = idMap[node.pid];
                if (parent) {
                    parent.children = parent.children || [];
                    parent.children.push(node);
                }
            }
        }
        return resData;
    }

    testData: TreeNode[] = [
        {id: 1, pid: 0, name: '数据1'},
        {id: 0, name: '数据0'},
        {id: 3, pid: 1, name: '数据3'},
        {id: 4, name: '数据4'},
        {id: 6, name: '数据6'},
        {id: 8, pid: 2, name: '数据8'},
        {id: 2, pid: 0, name: '数据2'},
        {id: 5, pid: 1, name: '数据5'},
        {id: 9, name: '数据9'},
        {id: 7, pid: 2, name: '数据7'},
    ];

    render() {
        // 解析数据
        const resData = this.parseData(this.testData);
        console.log(resData)
        return (
            <>
                <div style={{width: 300}}>
                    <LayerGroupItem>
                        <LayerItem compId={'d'} name={'测试节点2'}/>
                        <LayerItem compId={'d'} name={'测试节点3'}/>
                        <LayerItem compId={'d'} name={'测试节点3'}/>
                        <LayerGroupItem>
                            <LayerItem compId={'d'} name={'测试节点2'}/>
                            <LayerItem compId={'d'} name={'测试节点3'}/>
                            <LayerGroupItem>
                                <LayerItem compId={'d'} name={'测试节点2'}/>
                                <LayerItem compId={'d'} name={'测试节点3'}/>
                                <LayerItem compId={'d'} name={'测试节点3'}/>
                                <LayerGroupItem>
                                    <LayerItem compId={'d'} name={'测试节点2'}/>
                                    <LayerItem compId={'d'} name={'测试节点3'}/>
                                </LayerGroupItem>
                            </LayerGroupItem>
                        </LayerGroupItem>
                    </LayerGroupItem>
                </div>
            </>
        )
    }

}

export default observer(MyComponent);
