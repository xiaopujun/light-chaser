import React, {Component} from 'react';
import {Modal} from "antd";

/**
 * 画布设置React组件实现
 */
class CanvasHdConfigImpl extends Component {
    render() {
        console.log('CanvasHdConfigImpl render');
        return (
            <Modal title="画布设置" visible={true}>
                test
            </Modal>
        );
    }
}

export default CanvasHdConfigImpl;