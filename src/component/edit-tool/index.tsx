import {DeleteOutlined, SettingOutlined} from '@ant-design/icons';
import React, {Component} from 'react';
import './index.less';

/**
 * 编辑工具栏
 */
class EditTools extends Component {
    render() {
        return (
            <div className={'edit-tools'}>
                <span><DeleteOutlined/></span>
                <span><SettingOutlined/></span>
            </div>
        );
    }
}

export default EditTools;