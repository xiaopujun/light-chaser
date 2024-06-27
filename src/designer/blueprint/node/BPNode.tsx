import React from "react";
import './BPNode.less';
import nodeIconMap from "./NodeIconMap";
import {ConnectionPoint} from "@icon-park/react";
import {AnchorPointType, IPoint, NodeInfoType} from "../../DesignerType.ts";

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
