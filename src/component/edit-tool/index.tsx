import {DeleteOutlined, SettingOutlined} from '@ant-design/icons';
import React, {Component} from 'react';
import './index.less';
import {LCDesignerProps} from "../../types/LcDesignerType";

interface EditToolsProps {
    elemId?: string;  //组件id
    deleteItem?: (elemId: string) => void; //删除组件回调
    activeElem?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
    LCDesignerStore?: LCDesignerProps;
}

/**
 * 编辑工具栏
 */
class EditTools extends Component<EditToolsProps> {

    /**
     * 删除组件
     */
    deleteItem = () => {
        const {elemId = '-1', deleteItem} = this.props;
        deleteItem && deleteItem(elemId);
    }

    activeElem = () => {
        const {elemId = '-1', activeElem, LCDesignerStore} = this.props;
        let layoutConfigs = LCDesignerStore?.layoutConfigs!;
        let type = "";
        for (let i = 0; i < layoutConfigs.length; i++) {
            if (layoutConfigs[i].id === elemId) {
                type = layoutConfigs[i].name;
                break;
            }
        }
        activeElem && activeElem({elemId: parseInt(elemId), type});
    }

    render() {
        return (
            <div className={'edit-tools'}>
                <span onClick={this.deleteItem}><DeleteOutlined/></span>
                <span onClick={this.activeElem}><SettingOutlined/></span>
            </div>
        );
    }
}

export default EditTools;