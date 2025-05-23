/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import React from "react";
import './BPNode.less';
import {AnchorPointType, NodeInfoType} from "./core/AbstractBPNodeController";
import nodeIconMap from "./NodeIconMap";
import {IPoint} from "../manager/BluePrintManager.ts";
import {ConnectionPoint} from "@icon-park/react";

export interface NodeProps extends NodeInfoType {
    position?: IPoint;
}

export default class BPNode extends React.PureComponent<NodeProps> {
    render() {
        const {icon, name, input = [], output = [], titleBgColor = '#247057'} = this.props;
        const cpList = [...output, ...input];
        const Icon = nodeIconMap.get(icon) || ConnectionPoint;
        return (
            <div className={'bp-node'}>
                <div className={'bp-node-header'} style={{backgroundColor: titleBgColor}}>
                    <div className={'bp-node-icon'}><Icon/>&nbsp;</div>
                    <div className={'bp-node-title'}>{name}</div>
                </div>
                <div className={'bp-node-body'}>
                    {
                        cpList.map((cp, index) => {
                            const {id, name, type} = cp;
                            return (
                                <div key={index}
                                     className={`bp-node-ap ${type === AnchorPointType.INPUT ? 'node-ap-input' : 'node-ap-output'}`}>
                                    <div className={'bp-node-ap-circle'}>
                                    <span id={id} className={`ap-circle ${type === AnchorPointType.INPUT ?
                                        'ap-circle-input' : 'ap-circle-output'}`}/>
                                    </div>
                                    <div className={'bg-node-ap-label'}>{name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
