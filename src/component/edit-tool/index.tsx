import {DeleteOutlined, SettingOutlined} from '@ant-design/icons';
import React, {Component} from 'react';
import './index.less';

interface EditToolsProps {
    elemId: string;  //组件id
    deleteItem?: (elemId: string) => void; //删除组件回调
    openConfig?: (elemId: string) => void; //打开右侧配置项回调
}

/**
 * 编辑工具栏
 */
class EditTools extends Component<EditToolsProps> {

    /**
     * 删除组件
     */
    deleteItem = () => {
        alert("delete elem");
        const {elemId, deleteItem} = this.props;
        deleteItem && deleteItem(elemId);
    }

    openConfig = () => {
        alert("open config");
        const {elemId, openConfig} = this.props;
        openConfig && openConfig(elemId);
    }

    render() {
        return (
            <div className={'edit-tools'}>
                <span onClick={this.deleteItem}><DeleteOutlined/></span>
                <span><SettingOutlined/></span>
            </div>
        );
    }
}

export default EditTools;