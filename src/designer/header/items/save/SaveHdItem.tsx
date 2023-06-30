import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {SaveFilled} from "@ant-design/icons";
import designerStore from "../../../store/DesignerStore";
import {createProject, updateProject} from "../../../../utils/LocalStorageUtil";
import {SaveType} from "../../../DesignerType";
import eventOperateStore from "../../../operate-provider/EventOperateStore";
import {htmlToImgWithId} from "../../../../utils/ImageUtil";
import {buildUrlParams, parseUrlParams} from "../../../../utils/URLUtil";
import scaleCore from "../../../operate-provider/scale/ScaleCore";

export const localSave = () => {
    let {id = -1, setId} = designerStore;
    const {maxOrder, minOrder} = eventOperateStore;
    designerStore.extendParams['maxOrder'] = maxOrder;
    designerStore.extendParams['minOrder'] = minOrder;
    let imgDom: any = document.querySelector('.lc-content-scale');
    htmlToImgWithId(imgDom, {scale: scaleCore.scale}).then((imageId: any) => {
        designerStore.projectConfig.screenshot = imageId || ''; //截图
        if (id === -1) {
            createProject(designerStore).then((id: number | any) => {
                if (id > -1) {
                    //更新id
                    setId && setId(id);
                    //修改路由参数，新增变为更新
                    let urlParams = parseUrlParams();
                    urlParams = {...urlParams, ...{id, action: 'edit'}};
                    window.history.replaceState(null, '', '?' + buildUrlParams(urlParams));
                    alert("create success");
                    return;
                }
            });
        } else {
            updateProject(designerStore).then(() => {
                alert("update success");
                return;
            });
        }
    });
}

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
                if (saveType === SaveType.LOCAL) {
                    localSave();
                } else if (saveType === SaveType.SERVER) {
                    alert("server save");
                }
            }
        }
    }
}
