import Dialog from "../../../../json-schema/ui/dialog/Dialog.tsx";
import './EditDataSourceDialog.less';
import Button from "../../../../json-schema/ui/button/Button.tsx";
import {useRef} from "react";
import {cloneDeep} from "lodash";
import {Control} from "../../../../json-schema/SchemaTypes.ts";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI.tsx";
import ObjectUtil from "../../../../utils/ObjectUtil.ts";


export interface DataSourceConfigType {
    id?: string;
    key?: string;
    name?: string;
    type?: string;
    username?: string;
    password?: string;
    url?: string;
    des?: string;
}

export interface CreateDataSourceDialogProps {
    title: string;
    data?: DataSourceConfigType;
    onSave: (data: DataSourceConfigType) => void;
    onClose: () => void;
}

export default function EditDataSourceDialog(props: CreateDataSourceDialogProps) {

    const {data, title, onSave, onClose} = props;
    const dataRef = useRef(cloneDeep(data ?? {}));

    const schema: Control = {
        type: "grid",
        children: [
            {
                type: 'input',
                key: 'name',
                label: '名称',
                value: dataRef.current?.name
            },
            {
                type: 'select',
                label: "类型",
                key: 'type',
                value: dataRef.current?.type,
                config: {
                    options: [
                        {label: 'MySQL', value: '0'},
                    ]
                }
            },
            {
                type: 'input',
                label: '用户名',
                key: 'username',
                value: dataRef.current?.username
            },
            {
                type: 'input',
                label: '密码',
                key: 'password',
                value: dataRef.current?.password,
                config: {
                    type: 'password'
                }
            },
            {
                type: 'input',
                label: '链接地址',
                key: 'url',
                value: dataRef.current?.url
            },
            {
                type: 'text-area',
                key: 'des',
                label: '描述',
                value: dataRef.current?.des
            }
        ]
    }

    const onFiledChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        dataRef.current = ObjectUtil.merge(dataRef.current, dataFragment);
    }

    return <Dialog title={title} visible={true} className={'create-datasource-dialog'} onClose={onClose}>
        <LCGUI schema={schema} onFieldChange={onFiledChange}/>
        <div className={'create-datasource-btn'}>
            <Button onClick={() => onSave(dataRef.current || {})}>保存</Button>
            <Button onClick={onClose}>取消</Button>
        </div>
    </Dialog>
}