import './DemoMain.less';
import {FieldChangeData, LCGUI} from "../json-schema/LCGUI.tsx";
import {Control} from "../json-schema/SchemaTypes.ts";
import {useRef, useState} from "react";

export default function Demo() {

    const [count, setCount] = useState(0)
    const codeRef = useRef<string>('function test() {\n    console.log("test");\n}')

    const schema: Control[] = [
        {
            id: 'btnTest',
            type: 'button'
        },
        {
            id: 'code',
            type: 'code-editor',
            value: codeRef.current,
            reRender: true,
            config: {
                readonly: true,
                height: 160,
            }
        }


    ]

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, reRender} = fieldChangeData;
        if (id === 'btnTest') {
            codeRef.current = `const test = "niubi"`
        }
        if (reRender)
            setCount(count + 1)
    }

    return (
        <div style={{width: 400}}>
            <LCGUI schema={schema} onFieldChange={onFieldChange}/>

        </div>
    );
}
