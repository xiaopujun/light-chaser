import React from "react";
import './BPNode.less';
import {PointType} from "../types";

export enum AnchorPointType {
    INPUT,
    OUTPUT
}

export interface AnchorPointProps {
    id?: string;
    title?: string;
    type?: AnchorPointType;
}

export interface NodeProps {
    icon?: any;
    title?: string;
    input?: AnchorPointProps[];
    output?: AnchorPointProps[];
    position?: PointType;
}

export const BPNode: React.FC<NodeProps> = (props) => {
    const {icon: Icon, title, input = [], output = [], position = {x: 0, y: 0}} = props;
    const cpList = [...output, ...input];
    return (
        <div className={'bp-node'} style={{transform: 'translate(' + position?.x + 'px,' + position?.y + 'px)'}}>
            <div className={'bp-node-header'}>
                <div className={'bp-node-icon'}><Icon/>&nbsp;</div>
                <div className={'bp-node-title'}>{title}</div>
            </div>
            <div className={'bp-node-body'}>
                {
                    cpList.map((cp, index) => {
                        const {id, title, type} = cp;
                        return (
                            <div key={index}
                                 className={`bp-node-ap ${type === AnchorPointType.INPUT ? 'node-ap-input' : 'node-ap-output'}`}>
                                <div className={'bp-node-ap-circle'}>
                                    <span id={id} className={`ap-circle ${type === AnchorPointType.INPUT ?
                                        'ap-circle-input' : 'ap-circle-output'}`}/>
                                </div>
                                <div className={'bg-node-ap-label'}>{title}</div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
