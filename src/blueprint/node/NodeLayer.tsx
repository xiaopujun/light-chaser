import React from "react";
import {BPMovable} from "../drag/BPMovable";
import {CodeSandboxOutlined} from "@ant-design/icons";
import {AnchorPointType, BPNode} from "./BPNode";
import {BPSelectable} from "../drag/BPSelectable";
import {observer} from "mobx-react";

export const NodeLayer = observer(() => {
    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <BPSelectable>
                <BPMovable>
                    <BPNode icon={CodeSandboxOutlined} title={'测试节点'}
                            input={[
                                {id: '1', title: '输入1', type: AnchorPointType.INPUT},
                                {id: '2', title: '输入2', type: AnchorPointType.INPUT},
                                {id: '3', title: '输入3', type: AnchorPointType.INPUT},
                            ]}
                            output={[
                                {id: '4', title: '输出1', type: AnchorPointType.OUTPUT},
                                {id: '5', title: '输出2', type: AnchorPointType.OUTPUT},
                            ]}
                    />
                    <BPNode icon={CodeSandboxOutlined} title={'测试节点2'}
                            input={[
                                {id: '11', title: '输入1', type: AnchorPointType.INPUT},
                                {id: '22', title: '输入2', type: AnchorPointType.INPUT},
                                {id: '33', title: '输入3', type: AnchorPointType.INPUT},
                            ]}
                            output={[
                                {id: '44', title: '输出1', type: AnchorPointType.OUTPUT},
                                {id: '55', title: '输出2', type: AnchorPointType.OUTPUT},
                            ]}
                    />
                    <BPNode icon={CodeSandboxOutlined} title={'测试节点3'}
                            input={[
                                {id: '111', title: '输入1', type: AnchorPointType.INPUT},
                                {id: '222', title: '输入2', type: AnchorPointType.INPUT},
                                {id: '333', title: '输入3', type: AnchorPointType.INPUT},
                            ]}
                            output={[
                                {id: '444', title: '输出1', type: AnchorPointType.OUTPUT},
                                {id: '555', title: '输出2', type: AnchorPointType.OUTPUT},
                            ]}
                    />
                </BPMovable>
            </BPSelectable>
        </div>
    )
})
