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

import {Control, ControlValueType} from "./SchemaTypes";
import {SchemaPathNode} from "./LCGUI";

export default class LCGUIUtil {
    public static updateSchema(oldSchema: Control, path: SchemaPathNode[], value: ControlValueType) {
        const currentNode = path.shift();
        const {key, index} = currentNode!;
        if (key && key in oldSchema) {
            if (path.length === 0) {
                //赋值
                oldSchema.value = value;
            } else if (index !== undefined) {
                //取指定数据元素继续递归
                this.updateSchema((oldSchema[key as keyof Control] as [])[index], path, value);
            } else {
                //普通属性继续递归
                this.updateSchema(oldSchema[key as keyof Control] as Control, path, value);
            }
        }
    }

    public static createObjectFromArray(keyPath: string[], value: ControlValueType): object {
        const result: Record<string, any> = {};
        let current: Record<string, any> = result;
        for (let i = 0; i < keyPath.length; i++) {
            const key = keyPath[i];
            current[key] = i === keyPath.length - 1 ? value : {};
            current = current[key];
        }
        return result;
    }

    /**
     * 根据schema模板，将数据结构赋值到模板中生成完整的schema
     * @param data 数据结构
     * @param template schema模板
     */
    public static schemaStructureAssignment(data: object, template: Control): Control {
        if (typeof data !== 'object')
            return {};
        Object.keys(data).forEach(key => {
            //使用value对象的每一个key，去template中查找对应的key
            if (typeof data[key as keyof object] !== 'object') {
                //在template当前层匹配
                if (template.key === key) {
                    template.value = data[key as keyof object];
                } else if (template.children) {
                    template.children.forEach(childTemp => {
                        LCGUIUtil.schemaStructureAssignment({[key]: data[key as keyof object]}, childTemp);
                    })
                }
            } else {
                //在template的子层匹配
                const childTemplate = LCGUIUtil.findChildSchemaByKey(key, template);
                if (childTemplate) {
                    LCGUIUtil.schemaStructureAssignment(data[key as keyof object], childTemplate);
                }
            }
        });
        return template;
    }

    public static findChildSchemaByKey(key: string, template: Control): Control {
        if (template.key === key)
            return template;
        if (template.children) {
            for (let i = 0; i < template.children.length; i++) {
                const result = this.findChildSchemaByKey(key, template.children[i]);
                if (result)
                    return result;
            }
        }
        return {};
    }

    public static parseSchemaData(schema: Control): object {
        const result: Record<string, unknown> = {};
        if (schema.children) {
            let tempRes = {};
            schema.children.forEach(child => {
                tempRes = {...tempRes, ...LCGUIUtil.parseSchemaData(child)};
            });
            if (schema.key) {
                result[schema.key] = tempRes;
                return result;
            } else
                return tempRes;
        } else {
            if (schema.key) {
                result[schema.key] = schema.value || undefined;
                return result;
            } else {
                return result;
            }
        }
    }
}