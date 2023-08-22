import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {SaveFilled} from "@ant-design/icons";
import designerStore from "../../../store/DesignerStore";
import {SaveType} from "../../../DesignerType";
import EditorDesignerLoader from "../../../loader/EditorDesignerLoader";

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
                const {projectConfig: {saveType = SaveType.LOCAL}} = designerStore;
                EditorDesignerLoader.getInstance().abstractOperatorMap[saveType].doCreateOrUpdate(designerStore.getData());
            }
        }
    }
}
