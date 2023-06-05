import {AbstractHeaderItem, HeaderItemProps} from "../../../../framework/types/HeaderTypes";
import {EyeFilled} from "@ant-design/icons";
import designerStore from "../../../store/DesignerStore";
import {designerRouter} from "../../../../index";

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
                designerRouter.history.push('/view', {id: designerStore.id});
            }
        };
    }
}
