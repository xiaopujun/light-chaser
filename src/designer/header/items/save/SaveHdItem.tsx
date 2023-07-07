import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {SaveFilled} from "@ant-design/icons";
import designerStore from "../../../store/DesignerStore";
import {SaveType} from "../../../DesignerType";
import designerStarter from "../../../DesignerStarter";

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
                const {abstractOperatorMap} = designerStarter;
                const {projectConfig: {saveType = SaveType.LOCAL}} = designerStore;
                abstractOperatorMap[saveType].doCreateOrUpdate(designerStore).then(() => {
                    console.log('update or create success');
                });
            }
        }
    }
}
