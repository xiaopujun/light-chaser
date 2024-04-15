import './DemoMain.less';
import MonacoEditor from "../json-schema/ui/code-editor/MonacoEditor.tsx";


export default function Demo() {

    return (
        <div style={{width: 400}}>
            <MonacoEditor value={'select * from table;'}
                          language={'sql'} width={400} height={200}/>
        </div>
    );
}
