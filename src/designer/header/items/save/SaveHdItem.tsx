import {AbstractHeaderItem, HeaderItemProps} from "../../../../framework/types/HeaderTypes";
import {SaveFilled} from "@ant-design/icons";
import {designerRouter} from "../../../../index";
import designerStore from "../../../store/DesignerStore";
import {createProject, updateProject} from "../../../../utils/LocalStorageUtil";

/**
 * header-保存
 */
export default class SaveHdItem extends AbstractHeaderItem {

    localSave = () => {
        let {id = -1, setId} = designerStore;
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
    }

    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: SaveFilled,
            name: '保存',
            order: 3,
            onClick: () => {
                let {projectConfig: {saveType}} = designerStore;
                if (saveType === 'local') {
                    this.localSave();
                } else if (saveType === 'server') {
                    alert("server save");
                }
            }
        }
    }
}
