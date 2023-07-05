import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {SaveFilled} from "@ant-design/icons";
import designerStore from "../../../store/DesignerStore";
import {SaveType} from "../../../DesignerType";
import LocalOperator from "../../../../framework/operate/LocalOperator";

/**
 * header-保存
 */
export default class SaveHdItem extends AbstractHeaderItem {

    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: SaveFilled,
            name: '保存',
            order: 3,
            onClick: () => {
                let {projectConfig: {saveType}} = designerStore;
                //todo 使用策略模式优化
                if (saveType === SaveType.LOCAL) {
                    new LocalOperator().doCreateOrUpdate(designerStore).then(() => {

                    });
                } else if (saveType === SaveType.SERVER) {
                    alert("server save");
                }
            }
        }
    }
}
