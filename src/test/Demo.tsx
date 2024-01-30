import './DemoMain.less';
import {FieldChangeData, LCGUI} from "../json-schema/LCGUI.tsx";
import {Control} from "../json-schema/SchemaTypes.ts";

export default function Demo() {


    const schema: Control[] = [
        {
            key: 'style',
            type: 'grid',
            config: {
                columns: 2,
                containerStyle: {
                    marginBottom: 10,
                    width: 400,
                }
            },
            children: [
                {
                    key: 'name',
                    type: 'input',
                    value: '123',
                    label: '姓名',
                },
                {
                    key: 'sex',
                    type: 'radio',
                    value: 'man',
                    label: '性别',
                    config: {
                        options: [
                            {label: '男', value: 'man'},
                            {label: '女', value: 'woman'}
                        ]
                    }
                }
            ]
        },
        {
            type: 'grid',
            config: {
                columns: 2,
            },
            children: [
                {
                    type: 'input',
                    value: '123',
                    label: '姓名',
                },
                {
                    type: 'radio',
                    value: 'man',
                    label: '性别',
                    config: {
                        options: [
                            {label: '男', value: 'man'},
                            {label: '女', value: 'woman'}
                        ]
                    }
                }, {
                    type: 'input',
                    value: '123',
                    label: '姓名',
                },
                {
                    type: 'radio',
                    value: 'man',
                    label: '性别',
                    config: {
                        options: [
                            {label: '男', value: 'man'},
                            {label: '女', value: 'woman'}
                        ]
                    }
                },
            ]
        }
    ]

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        console.log(fieldChangeData);
    }

    return (
        <div style={{width: 400}}>
            <LCGUI schema={schema} onFieldChange={onFieldChange}/>

        </div>
    );
}
