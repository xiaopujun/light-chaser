import React, {Component} from 'react';
import {Drawer} from 'antd';
import {connect} from 'react-redux';
import ElemPropSet from "../../../component/config";
import './index.less';

/**
 * 右滑框外壳组件
 * @description:用于展示右滑框，控制右滑框的显示与隐藏
 */
class ElemPropSetDrawer extends Component<any, any> {

    onClose = () => {
        const {updateDrawerVisible} = this.props;
        updateDrawerVisible();
    }

    render() {
        const {dataXDesigner} = this.props;
        const {elemPropSetDialog} = dataXDesigner;
        return (
            <Drawer className={'right-slide-box'} title="组件属性设置"
                    placement="right"
                    width={400}
                    mask={false}
                    visible={elemPropSetDialog?.visible || false}
                    getContainer={false}
                    onClose={this.onClose}
            >
                <ElemPropSet {...this.props}/>
            </Drawer>
        );
    }
}

/**
 * 右滑框容器组件
 */
export default connect(
    (state: any) => ({
        rightSildeBox: state.rightSildeBox,
        layoutDesigner: state.layoutDesigner
    }),
    {}
)(ElemPropSetDrawer)