import URLUtil from "../../utils/URLUtil.ts";
import {SaveType} from "../../designer/DesignerType.ts";
import Designer from "../../designer/Designer.tsx";

export default function DesignerPage() {
    const {saveType, id} = URLUtil.parseUrlParams();
    return <Designer id={id} type={saveType as SaveType}/>
}
