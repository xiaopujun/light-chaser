import './DemoMain.less';
import {Control} from "../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../json-schema/LCGUI";

export default function Demo() {

    const schema: Control = {
        type: 'item-panel',
        label: '卡片面板',
        tip: '这是一个卡片面板',
        children: [
            {
                type: 'input',
                label: '输入框',
                tip: '这是一个输入框',
            }
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        console.log(fieldChangeData);
    }

    return (
        <div style={{width: 400, padding: 10, background: '#313131'}}>
            <LCGUI schema={schema} onFieldChange={onFieldChange}/>
        </div>
    )
}
