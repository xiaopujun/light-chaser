import './DemoMain.less';
import {useEffect} from "react";
import FetchUtil from "../utils/FetchUtil.ts";
import CheckBox from "../json-schema/ui/checkbox/CheckBox.tsx";


export default function Demo() {
    useEffect(() => {
        FetchUtil.post('/api/datasource/pageList', {
            current: 1,
            size2: 10,
            searchValue: null
        }).then(res => console.log(res));
    }, []);

    return (
        <div style={{width: 500, height: 200}}>
            <CheckBox value={true} onChange={console.log}/>
        </div>

    );
}
