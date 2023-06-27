import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {SaveFilled} from "@ant-design/icons";
import {designerRouter} from "../../../../index";
import designerStore from "../../../store/DesignerStore";
import {createProject, saveImgToLocal, updateProject} from "../../../../utils/LocalStorageUtil";
import {SaveType} from "../../../DesignerType";
import eventOperateStore from "../../../operate-provider/EventOperateStore";
import {htmlToImg} from "../../../../utils/ImageUtil";
import {idGenerate} from "../../../../utils/IdGenerate";

export async function generateScreenshots() {
    try {
        // Generate screenshot
        let imgDom: any = document.querySelector('.lc-content-scale');
        if (imgDom) {
            const url: any = await htmlToImg(imgDom);
            const imageId = idGenerate.generateId();
            await saveImgToLocal(url, imageId);
            // Free up memory
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 3000);
            return imageId;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

export const localSave = () => {
    let {id = -1, setId} = designerStore;
    const {maxOrder, minOrder} = eventOperateStore;
    designerStore.extendParams['maxOrder'] = maxOrder;
    designerStore.extendParams['minOrder'] = minOrder;
    generateScreenshots().then((imageId: any) => {
        designerStore.projectConfig.screenshot = imageId;
        if (id === -1) {
            createProject(designerStore).then((id: number | any) => {
                if (id > -1) {
                    //更新id
                    setId && setId(id);
                    //修改路由参数，新增变为更新
                    const {history} = designerRouter;
                    const {action} = history.location.state;
                    if (action === 'create') {
                        designerRouter.history.replace("/designer", {
                            ...history.location.state, ...{
                                action: 'edit',
                                id,
                            }
                        });
                    }
                    alert("create success");
                }
            });
        } else {
            updateProject(designerStore).then(() => {
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
