import {Control} from "./SchemaTypes";
import {SchemaPathNode} from "./LCGUI";

export default class LCGUIUtil {
    public static updateSchema(oldSchema: Control, path: SchemaPathNode[], value: any) {
        const currentNode = path.shift();
        const {key, index} = currentNode!;
        if (key in oldSchema) {
            if (path.length === 0) {
                //赋值
                oldSchema[key as keyof Control] = value;
            } else if (index !== undefined) {
                //取指定数据元素继续递归
                this.updateSchema(oldSchema[key as keyof Control][index], path, value);
            } else {
                //普通属性继续递归
                this.updateSchema(oldSchema[key as keyof Control], path, value);
            }
        }
    }

    public static updateSchemaStringPath(oldSchema: Control, path: string[], value: any) {
        const schemaPathNode: SchemaPathNode[] = [];
        path.forEach((key, index) => {
            if (key.indexOf("_") !== -1) {
                const [_key, index] = key.split("_");
                schemaPathNode.push({key: _key, index: parseInt(index)});
            } else {
                schemaPathNode.push({key});
            }
        });
        this.updateSchema(oldSchema, schemaPathNode, value);
    }

    public static createObjectFromArray(arr: [], value: any): any {
        let result = {};
        let current: any = result;
        for (let i = 0; i < arr.length; i++) {
            const key = arr[i];
            current[key] = i === arr.length - 1 ? value : {};
            current = current[key];
        }
        return result;
    }
}