import {Control, ControlValueType} from "./SchemaTypes";
import React, {ReactNode} from "react";
import LCGUIUtil from "./LCGUIUtil";
import UIMap from "./ui";
import {ConfigProvider, MappingAlgorithm, theme} from "antd";

export interface FieldChangeData {
    id?: string;
    data: ControlValueType;
    reRender?: boolean;
    schemaKeyPath: SchemaPathNode[];
    dataKeyPath: string[];
    dataFragment: object;
}

export interface LCGUIProps {
    schema: Control | Control[];
    onFieldChange?: (fieldChangeData: FieldChangeData) => void;
}

export class SchemaPathNode {
    constructor(key: string, index?: number) {
        this.key = key;
        this.index = index;
    }

    key: string = '';
    index?: number = 0;
}

/**
 * 特殊场景的操作全交给使用方，向外提供Util方法更新schema结构
 */
export class LCGUI extends React.Component<LCGUIProps> {

    onControlChange = (data: ControlValueType, schemaKeyPath: SchemaPathNode[], dataKeyPath: string[], reRender?: boolean, id?: string) => {
        const {onFieldChange} = this.props;
        const dataFragment = LCGUIUtil.createObjectFromArray(dataKeyPath, data)
        onFieldChange && onFieldChange({
            id, data, reRender, schemaKeyPath: [...schemaKeyPath], dataKeyPath, dataFragment
        });
    }

    /**
     * 解析rules规则，判断是否满足
     * @param rules
     * @param control
     */
    analyzeRules = (rules: string, control: Control): boolean => {
        const regex = /{([^}]+)}/g;
        const variable = [];
        let match;
        //解析rule中设置的变量
        while ((match = regex.exec(rules)) !== null) {
            variable.push(match[1]);
        }
        //从control本层级开始逐级向上匹配，直到所有变量都匹配结束
        const analyze = (control: Control, variable: string[], rules: string): string => {
            if (variable.length === 0){
                //如果没有按照LCGUI设计的变量格式设置变量，如："{variable}==='true'",则会直接返回rule本身，并使用eval解析执行。这意味着可以直接写js脚本，转换为字符串匹配执行。这无意间提升了rule字段的灵活性
                return rules;
            }
            const {parent} = control;
            if (parent && "children" in parent) {
                //解析parent的所有子节点control(与当前control同级)
                const {children} = parent;
                for (let i = 0; i < children!.length; i++) {
                    if (variable.length === 0) break;
                    const child = children![i];
                    const matchIndex = variable.indexOf(child.key!);
                    if (child.key && matchIndex !== -1) {
                        rules = rules.replaceAll(`{${child!.key}}`, `'${child.value}'`)
                        variable.splice(matchIndex, 1);
                    }
                }
            }
            if (variable.length > 0 && parent) {
                //解析parent层级的key是否匹配
                const matchIndex = variable.indexOf(parent!.key!);
                if (parent!.key && parent.value && matchIndex !== -1) {
                    //parent层级在同时匹配上key，同时value属性有值，同时variable中有匹配项时，才进行替换
                    rules = rules.replace(`{${parent!.key}}`, `'${parent.value}'`)
                    variable.splice(matchIndex, 1);
                }
                if (variable.length > 0) {
                    return analyze(parent!, variable, rules);
                }
            }
            return rules;
        }
        // eslint-disable-next-line
        return eval(analyze(control, variable, rules));
    }

    buildConfigUI = (control: Control, schemaKeyPath: SchemaPathNode[], dataKeyPath: string[], childIndex: number): ReactNode[] => {
        const nodes: ReactNode[] = [];
        if (!control) return nodes;
        if ("children" in control) {
            //有子节点，递归解析
            const tempNodes: ReactNode[] = [];
            const {children} = control;
            const childLevel = new SchemaPathNode("children");
            const {type, rules} = control;
            //判断是否满足rules规则，不满足则不继续递归渲染
            if (rules && !this.analyzeRules(rules, control))
                return nodes;

            schemaKeyPath.push(childLevel);
            control.key && dataKeyPath.push(control.key);
            children && children.forEach((child: Control, index: number) => {
                childLevel.index = index;
                child.parent = control;
                tempNodes.push(this.buildConfigUI(child, JSON.parse(JSON.stringify(schemaKeyPath)), [...dataKeyPath], index));
            })
            //构建本级schema路径下的ReactNode
            if (!type) {
                //本层没有控件，直接返回子节点
                nodes.push([...tempNodes]);
            } else {
                const {type, config, value, id, reRender, label, tip} = control;
                const Component = UIMap.get(type);
                schemaKeyPath.pop();
                schemaKeyPath.push({key: "value"});
                //非叶子节点不解析label
                const controlVal = reRender ? {value} : {defaultValue: value};
                const _props = {
                    ...config, ...controlVal, label, tip,
                    onChange: (data: any) => this.onControlChange(data, schemaKeyPath, dataKeyPath, reRender, id)
                };
                nodes.push(<Component key={childIndex} {..._props}>{tempNodes}</Component>);
            }
        } else {
            //解析叶子节点
            const {label, type, tip, config, value, rules, id, reRender} = control;
            if (!type) return [];
            if (rules && !this.analyzeRules(rules, control))
                return nodes;

            //设置schemaKeyPath和dataKeyPath
            schemaKeyPath.push({key: "value"});
            dataKeyPath.push(control.key!);
            const controlVal = reRender ? {value} : {defaultValue: value};
            const _props = {
                ...config, ...controlVal, label, tip,
                onChange: (data: any) => this.onControlChange(data, schemaKeyPath, dataKeyPath, reRender, id)
            };
            const Component = UIMap.get(type);
            if (!Component) return [];
            nodes.push(<Component key={childIndex} {..._props} />);
        }
        return nodes;
    }

    init = (): ReactNode[] => {
        const nodes: ReactNode[] = [];
        let {schema} = this.props;
        schema = Array.isArray(schema) ? schema : [schema];
        schema.forEach((control: Control) => {
            nodes.push(this.buildConfigUI(control, [], [], 0));
        })
        return nodes;
    }

    render() {
        return (
            <ConfigProvider theme={{
                algorithm: studioDarkAlgorithm,
                components: {
                    InputNumber: {
                        paddingInline: 7,
                        colorBgContainer: "#292929",
                    },
                    Input: {
                        paddingInline: 7,
                        colorBgContainer: "#292929",
                    },
                    Switch: {
                        trackHeight: 17,
                        colorBgContainer: "#292929",
                        handleSize: 13,
                        trackMinWidth: 30,
                    },
                    Select: {
                        optionSelectedBg: '#29323f',
                        paddingSM: 7,
                    },
                    Radio: {
                        radioSize: 12,
                        wrapperMarginInlineEnd: 3,
                    }
                }
            }}>
                {this.init()}
            </ConfigProvider>
        );
    }
}

const studioDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
    const baseToken = theme.darkAlgorithm(seedToken, mapToken);
    return {
        ...baseToken,
        controlHeight: 26,
        borderRadius: 3,
        fontSize: 12,
    };
};