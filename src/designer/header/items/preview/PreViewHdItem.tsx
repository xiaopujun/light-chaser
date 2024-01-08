import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {EyeFilled} from "@ant-design/icons";
import URLUtil from "../../../../utils/URLUtil";
import {DesignerMode} from "../../../DesignerType";

/**
 * header-预览
 */
export default class PreViewHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: EyeFilled,
            name: '预览',
            order: 4,
            onClick: () => {
                const {saveType, id} = URLUtil.parseUrlParams();
                window.open(`/view?id=${id}&saveType=${saveType}&mode=${DesignerMode.VIEW}`, '_blank');
            }
        };
    }
}
