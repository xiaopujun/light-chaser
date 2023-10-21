import React from "react";
import './BPNode.less';
import {PointType} from "../types";
import bpStore from "../store/BPStore";

export enum AnchorPointType {
    INPUT,
    OUTPUT
}

export interface AnchorPointProps {
    id?: string;
    name?: string;
    type?: AnchorPointType;
}

export interface NodeProps {
    id?: string;
    icon?: any;
    name?: string;
    type?: string;
    titleBgColor?: string;
    input?: AnchorPointProps[];
    output?: AnchorPointProps[];
    position?: PointType;
}

export const BPNode: React.FC<NodeProps> = React.memo((props) => {
    const {icon: Icon, name, input = [], output = [], position = {x: 0, y: 0}, titleBgColor = '#247057', id} = props;
    const cpList = [...output, ...input];
    const {canvasTranslate, canvasScale} = bpStore;
    return (
        <div className={'bp-node'} id={`bpnode:${id}`}
             style={{transform: 'translate(' + (position?.x - canvasTranslate.x) / canvasScale + 'px,' + (position?.y - canvasTranslate.y) / canvasScale + 'px)'}}>
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
})
