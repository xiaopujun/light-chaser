import React from "react";
import './BPNode.less';
import {PointType} from "../types";
import {AnchorPointType} from "./core/AbstractBPNodeController";
import nodeIconMap from "./NodeIconMap";
import {CodeSandboxOutlined} from "@ant-design/icons";

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

export default class BPNode extends React.PureComponent<NodeProps> {
    render() {
        const {icon, name, input = [], output = [], titleBgColor = '#247057'} = this.props;
        const cpList = [...output, ...input];
        const Icon = nodeIconMap.get(icon) || CodeSandboxOutlined;
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

// const BPNode: React.FC<NodeProps> = React.memo((props) => {
//     const {icon: Icon, name, input = [], output = [], titleBgColor = '#247057'} = props;
//     const cpList = [...output, ...input];
//     return (
//         <div className={'bp-node'}>
//             <div className={'bp-node-header'} style={{backgroundColor: titleBgColor}}>
//                 <div className={'bp-node-icon'}><Icon/>&nbsp;</div>
//                 <div className={'bp-node-title'}>{name}</div>
//             </div>
//             <div className={'bp-node-body'}>
//                 {
//                     cpList.map((cp, index) => {
//                         const {id, name, type} = cp;
//                         return (
//                             <div key={index}
//                                  className={`bp-node-ap ${type === AnchorPointType.INPUT ? 'node-ap-input' : 'node-ap-output'}`}>
//                                 <div className={'bp-node-ap-circle'}>
//                                     <span id={id} className={`ap-circle ${type === AnchorPointType.INPUT ?
//                                         'ap-circle-input' : 'ap-circle-output'}`}/>
//                                 </div>
//                                 <div className={'bg-node-ap-label'}>{name}</div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// })
//
// export default BPNode;
