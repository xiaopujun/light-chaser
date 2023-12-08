import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {EyeFilled} from "@ant-design/icons";
import URLUtil from "../../../../utils/URLUtil";

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
                window.open(`/view?id=${id}&saveType=${saveType}&action=view`, '_blank');
            }
        };
    }
}
