import React, {ReactElement, ReactNode} from "react";
import './Node.less';
import {AnchorPointProps, AnchorPointType} from "./AnchorPoint";


export interface NodeProps {
    icon?: any;
    title?: string;
    input?: AnchorPointProps[];
    output?: AnchorPointProps[];
}

export const Node: React.FC<NodeProps> = (props) => {
    const {icon: Icon, title, input = [], output = []} = props;
    const cpList = [...input, ...output];
    return (
        <div className={'bp-node'}>
            <div className={'bp-node-header'}>
                <div className={'bp-node-icon'}><Icon/>&nbsp;</div>
                <div className={'bp-node-title'}>{title}</div>
            </div>
            <div className={'bp-node-body'}>
                {
                    cpList.map((cp, index) => {
                        const {id, title, type} = cp;
                        return (
                            <div
                                className={`bg-node-ap ${type === AnchorPointType.INPUT ? 'node-ap-input' : 'node-ap-output'}`}>
                                <div className={'bg-node-ap-circle'}>
                                    <span id={id} className={`${type === AnchorPointType.INPUT ?
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
