import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {SaveFilled} from "@ant-design/icons";
import designerStore from "../../../store/DesignerStore";
import {SaveType} from "../../../DesignerType";
import eventOperateStore from "../../../operate-provider/EventOperateStore";
import {buildUrlParams, parseUrlParams} from "../../../../utils/URLUtil";
import scaleCore from "../../../operate-provider/scale/ScaleCore";
import LocalOperator from "../../../../framework/operate/LocalOperator";
import {ImgUtil} from "../../../../utils/ImgUtil";

export const localSave = () => {
    let {id = '', setId} = designerStore;
    const {maxLevel, minLevel} = eventOperateStore;
    designerStore.layerConfigs.maxLevel = maxLevel;
    designerStore.layerConfigs.minLevel = minLevel;
    let imgDom: any = document.querySelector('.lc-content-scale');
    ImgUtil.htmlToImgWithId(imgDom, {scale: scaleCore.scale}).then((imageId: any) => {
        designerStore.projectConfig.screenshot = imageId || ''; //截图
        if (id === '') {
            new LocalOperator().createProject(designerStore).then((id: number | any) => {
                if (id && id !== '') {
                    //更新id
                    setId && setId(id);
                    //修改路由参数，新增变为更新
                    let urlParams = parseUrlParams();
                    urlParams = {...urlParams, ...{id, action: 'edit'}};
                    window.history.replaceState(null, '', '?' + buildUrlParams(urlParams));
                    alert("create success");
                }
            });
        } else {
            new LocalOperator().updateProject(designerStore).then(() => {
                alert("update success");
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
