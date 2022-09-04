import {DeleteOutlined, SettingOutlined} from '@ant-design/icons';
import React, {Component} from 'react';
import './index.less';
import {LCDesignerProps} from "../../global/types";

interface EditToolsProps {
    elemId: string;  //组件id
    deleteItem?: (elemId: string) => void; //删除组件回调
    activeElem?: (data: { elemId: number, type: string; subType: string }) => void; //打开右侧配置项回调
    LCDesigner?: LCDesignerProps;
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
        const {elemId, activeElem, LCDesigner} = this.props;
        let subType = LCDesigner?.layoutConfig[parseInt(elemId)]?.name;
        activeElem && activeElem({elemId: parseInt(elemId), type: "", subType});
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