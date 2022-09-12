import {DeleteOutlined, SettingOutlined} from '@ant-design/icons';
import React, {Component} from 'react';
import './index.less';
import {LCDesignerProps} from "../../global/types";

interface EditToolsProps {
    elemId: string;  //组件id
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
        const {elemId, deleteItem} = this.props;
        deleteItem && deleteItem(elemId);
    }

    activeElem = () => {
        const {elemId, activeElem, LCDesignerStore} = this.props;
        let layoutConfig = LCDesignerStore?.layoutConfig!;
        let type = "";
        for (let i = 0; i < layoutConfig.length; i++) {
            if (layoutConfig[i].id === elemId) {
                type = layoutConfig[i].name;
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