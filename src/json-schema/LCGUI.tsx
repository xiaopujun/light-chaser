import {Control} from "./SchemaTypes";
import React, {ReactNode} from "react";
import componentsMap from "../lib";
import {HorizontalItem} from "../ui/horizontal-item/HorizontalItem";
import {VerticalItem} from "../ui/vertical-item/VerticalItem";

export interface LCGUIProps {
    schema: Control;
}

export class ChildLevel {
    constructor(key: string, index?: number) {
        this.key = key;
        this.index = index;
    }

    key: string = '';
    index?: number = 0;
}

export class LCGUI extends React.Component<LCGUIProps> {

    state = {renderCount: 0}

    updateSchema = (oldSchema: Control, path: ChildLevel[], value: any) => {
        const currentLevel = path.shift();
        const {key, index} = currentLevel!;
        if (key in oldSchema) {
            if (path.length === 0) {
                //赋值
                oldSchema[key as keyof Control] = value;
            } else if (index !== undefined) {
                //组数
                this.updateSchema(oldSchema[key as keyof Control][index], path, value);
            } else {
                //普通属性
                this.updateSchema(oldSchema[key as keyof Control], path, value);
            }
        }
        this.setState({renderCount: this.state.renderCount + 1});
        console.log(oldSchema)
    }

    createObjectFromArray = (arr: [], value: any): any => {
        let result = {};
        let current: any = result;

        for (let i = 0; i < arr.length; i++) {
            const key = arr[i];
            current[key] = i === arr.length - 1 ? value : {};
            current = current[key];
        }

        return result;
    }

    onControlChange = (data: any, schemaKeyPath: ChildLevel[], dataKeyPath: string[]) => {
        const {schema} = this.props;
        console.log(data, schemaKeyPath, dataKeyPath)
        // this.updateSchema(schema, schemaKeyPath, data);
    }

    buildConfigUI = (control: Control, schemaKeyPath: ChildLevel[], dataKeyPath: string[], childIndex: number): any => {
        const nodes: ReactNode[] = [];
        if (!control) return nodes;
        if ("children" in control) {
            //有子节点，递归解析
            const tempNodes: ReactNode[] = [];
            const {children} = control;
            const childLevel = new ChildLevel("children");
            schemaKeyPath.push(childLevel);
            control.key && dataKeyPath.push(control.key);
            children && children.forEach((child: Control, index: number) => {
                childLevel.index = index;
                child.parent = control;
                //todo childLevel同一个对象传递到下一次调用了，有问题. 解决办法：对schemaKeyPath深拷贝
                tempNodes.push(this.buildConfigUI(child, JSON.parse(JSON.stringify(schemaKeyPath)), [...dataKeyPath], index));
            })
            //构建本级节点对应的组件
            const {type} = control;
            if (!type) {
                //本层没有控件，直接返回子节点
                nodes.push([...tempNodes]);
            } else {
                const {type, config, value, defaultValue} = control;
                let Component = componentsMap.get(type);
                schemaKeyPath.pop();
                schemaKeyPath.push({key: "value"});
                //非叶子节点不解析label
                const _props = {
                    ...config,
                    value,
                    defaultValue,
                    onChange: (data: any) => this.onControlChange(data, schemaKeyPath, dataKeyPath)
                };
                nodes.push(<Component key={childIndex} {..._props}>{tempNodes}</Component>);
            }
        } else {
            //解析叶子节点
            const {label, type, direction, config, value, defaultValue} = control;
            if (!type)
                return null;
            schemaKeyPath.push({key: "value"});
            dataKeyPath.push(control.key!);
            const _props = {
                ...config,
                value,
                defaultValue,
                onChange: (data: any) => this.onControlChange(data, schemaKeyPath, dataKeyPath)
            };
            let Component = componentsMap.get(type);
            let tempDom;
            if (!label) {
                tempDom = <Component key={childIndex} {..._props}/>
            } else if (!direction || direction === 'horizontal') {
                tempDom = <HorizontalItem key={childIndex} label={label}>
                    <Component {..._props}/>
                </HorizontalItem>
            } else {
                tempDom = <VerticalItem key={childIndex} label={label}>
                    <Component {..._props}/>
                </VerticalItem>
            }
            nodes.push(tempDom);
        }
        return nodes;
    }

    render() {
        const {schema} = this.props;
        return (
            <>{this.buildConfigUI(schema, [], [], 0)}</>
        );
    }
}
