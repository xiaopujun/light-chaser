import {Control} from "./SchemaTypes";
import Stack from "../framework/stack/Stack";
import React, {ReactNode} from "react";
import componentsMap from "../lib";
import {HorizontalItem} from "../ui/horizontal-item/HorizontalItem";
import {VerticalItem} from "../ui/vertical-item/VerticalItem";
import {idGenerate} from "../utils/IdGenerate";

export class SchemaCore {
    public schemaStack: Stack<Control | Control[]> = new Stack<Control | Control[]>();

    public buildLeafNode(control: Control): ReactNode {
        const {label, type, direction, config} = control;
        if (!type) return null;
        let Component = componentsMap.get(type);
        let tempDom;
        if (!label) {
            tempDom = <Component key={idGenerate.generateId()} {...config}/>
        } else if (!direction || direction === 'horizontal') {
            tempDom = <HorizontalItem label={label}>
                <Component {...config}/>
            </HorizontalItem>
        } else {
            tempDom = <VerticalItem label={label}>
                <Component {...config}/>
            </VerticalItem>
        }
        return tempDom;
    }

    public buildConfigUI(control: Control): any {
        const nodes: ReactNode[] = [];
        if (!control) return nodes;
        if ("children" in control) {
            //有子节点，递归解析
            const tempNodes: ReactNode[] = [];
            const {children} = control;
            children && children.forEach((child: Control) => {
                tempNodes.push(this.buildConfigUI(child));
            })
            //构建本级节点对应的组件
            const {type} = control;
            if (!type) {
                //本层没有控件，直接返回子节点
                nodes.push([...tempNodes]);
            } else {
                const {type, config} = control;
                let Component = componentsMap.get(type);
                //非叶子节点不解析label
                nodes.push(<Component {...config}>{tempNodes}</Component>);
            }
        } else {
            //没有子节点，解析当前节点并构建组件
            nodes.push(this.buildLeafNode(control));
        }
        return nodes;
    }
}
