import React, {Component} from 'react';
import {Drawer} from 'antd';
import {connect} from 'react-redux';
import {closeRightSildeBox} from '../../../redux/actions/RightSildeBox';
import {
    updateTitleConfig,
    updateBorderConfig,
    updateBackgroundConfig,
    updateActiveConfig,
    updateChartConfig,
} from '../../../redux/actions/LayoutDesigner';
import ElementConfig from "../../../component/config/ElementConfig";
import './index.less';

/**
 * 右滑框外壳组件
 * @description:用于展示右滑框，控制右滑框的显示与隐藏
 */
class Index extends Component {

    onClose = () => {
        const {closeRightSildeBox} = this.props;
        closeRightSildeBox(false);
    }

    render() {
        const {rightSildeBox} = this.props;
        return (
            <Drawer className={'right-slide-box'} title="组件属性设置"
                    placement="right"
                    width={400}
                    mask={false}
                    onClose={this.onClose}
                    visible={rightSildeBox.switchState}>
                <ElementConfig {...this.props}/>
            </Drawer>
        );
    }
}

/**
 * 右滑框容器组件
 */
export default connect(
    state => ({
        rightSildeBox: state.rightSildeBox,
        layoutDesigner: state.layoutDesigner
    }),
    {
        closeRightSildeBox,
        updateTitleConfig,
        updateBorderConfig,
        updateBackgroundConfig,
        updateActiveConfig,
        updateChartConfig,
    }
)(Index)