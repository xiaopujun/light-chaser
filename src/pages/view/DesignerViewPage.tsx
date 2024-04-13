import URLUtil from "../../utils/URLUtil.ts";
import {SaveType} from "../../designer/DesignerType.ts";
import DesignerView from "../../designer/view/DesignerView.tsx";

export default function DesignerViewPage() {
    const {saveType, id} = URLUtil.parseUrlParams();
    return <DesignerView id={id} type={saveType as SaveType}/>
}
