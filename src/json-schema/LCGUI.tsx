import {Control} from "./SchemaTypes";
import Stack from "../framework/stack/Stack";
import React, {ReactNode} from "react";
import componentsMap from "../lib";
import {HorizontalItem} from "../ui/horizontal-item/HorizontalItem";
import {VerticalItem} from "../ui/vertical-item/VerticalItem";
import {idGenerate} from "../utils/IdGenerate";

export interface LCGUIProps {
    schema: Control;
}

export class LCGUI extends React.Component<LCGUIProps> {
    public schemaStack: Stack<Control | Control[]> = new Stack<Control | Control[]>();


    buildConfigUI = (control: Control, schemaKeyPath: string[], dataKeyPath: string[]): any => {
        const nodes: ReactNode[] = [];
        if (!control) return nodes;
        if ("children" in control) {
            //有子节点，递归解析
            const tempNodes: ReactNode[] = [];
            const {children} = control;
            schemaKeyPath.push('children');
            control.key && dataKeyPath.push(control.key);
            children && children.forEach((child: Control) => {
                child.parent = control;
                tempNodes.push(this.buildConfigUI(child, [...schemaKeyPath], [...dataKeyPath]));
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
                nodes.push(<Component key={idGenerate.generateId()} {...config}>{tempNodes}</Component>);
            }
        } else {
            //解析叶子节点
            const {label, type, direction, config} = control;
            if (!type) return null;
            schemaKeyPath.push('value');
            dataKeyPath.push(control.key!);
            console.log('schemaKeyPath', schemaKeyPath)
            console.log('dataKeyPath', dataKeyPath)
            let Component = componentsMap.get(type);
            let tempDom;
            if (!label) {
                tempDom = <Component key={idGenerate.generateId()} {...config}/>
            } else if (!direction || direction === 'horizontal') {
                tempDom = <HorizontalItem key={idGenerate.generateId()} label={label}>
                    <Component {...config}/>
                </HorizontalItem>
            } else {
                tempDom = <VerticalItem key={idGenerate.generateId()} label={label}>
                    <Component {...config}/>
                </VerticalItem>
            }
            nodes.push(tempDom);
        }
        return nodes;
    }

    render() {
        const {schema} = this.props;
        const schemaKeyPath: string[] = [];
        const dataKeyPath: string[] = [];
        return (
            <>{this.buildConfigUI(schema, schemaKeyPath, dataKeyPath)}</>
        );
    }
}
