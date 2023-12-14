import {Control, ControlValueType} from "./SchemaTypes";
import {LCGUI, SchemaPathNode} from "./LCGUI";

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
        let result = {};
        let current: any = result;
        for (let i = 0; i < keyPath.length; i++) {
            const key = keyPath[i];
            current[key] = i === keyPath.length - 1 ? value : {};
            current = current[key];
        }
        return result;
    }

    public static schemaStructureAssignment(data: object, template: Control): Control {
        if (typeof data !== 'object')
            return;
        Object.keys(data).forEach(key => {
            //使用value对象的每一个key，去template中查找对应的key
            if (typeof data[key] !== 'object') {
                //在template当前层匹配
                if (template.key === key) {
                    template.value = data[key];
                } else if (template.children) {
                    template.children.forEach(childTemp => {
                        LCGUIUtil.schemaStructureAssignment({[key]: data[key]}, childTemp);
                    })
                }
            } else {
                //在template的子层匹配
                const childTemplate = LCGUIUtil.findChildSchemaByKey(key, template);
                if (childTemplate) {
                    LCGUIUtil.schemaStructureAssignment(data[key], childTemplate);
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
        return null;
    }

    public static parseSchemaData(schema: Control): object {
        const result = {};
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