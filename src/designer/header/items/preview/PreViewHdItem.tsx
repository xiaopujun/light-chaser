import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {EyeFilled} from "@ant-design/icons";
import designerStore from "../../../store/DesignerStore";
import {message} from "antd";

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
            if (!designerStore.id) {
              message.error("项目未保存");
              return;
            }
            window.open(`/view?id=${designerStore.id}&saveType=${designerStore.projectConfig.saveType}&action=view`)
          }
        };
    }
}
