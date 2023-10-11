import React from "react";
import {BPMovable} from "../drag/BPMovable";
import {CodeSandboxOutlined} from "@ant-design/icons";
import {BPNode} from "./BPNode";
import {BPSelectable} from "../drag/BPSelectable";
import {observer} from "mobx-react";
import bpStore from "../store/BPStore";

export const NodeLayer = observer(() => {

    const {nodes} = bpStore;

    return (
        <div id={'bp-node-container'} style={{position: 'relative', width: '100%', height: '100%'}} ref={ref => {
            const {setNodeContainerRef} = bpStore;
            setNodeContainerRef(ref!);
        }}>
            <BPSelectable>
                <BPMovable>
                    {nodes.map((node, index) => {
                        return (
                            <BPNode key={index}
                                    icon={node.icon || CodeSandboxOutlined}
                                    name={node.name}
                                    id={node.id}
                                    input={node.input}
                                    output={node.output}
                                    position={node.position}
                            />
                        )
                    })}
                </BPMovable>
            </BPSelectable>
        </div>
    )
})
