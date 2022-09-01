import React, {Component} from 'react';
import {Layout} from 'antd';
import {connect} from "react-redux";
import LayoutTools from "./left/tools";
import LCLayoutContent from "./content";
import {
    activeElem,
    addItem,
    deleteItem,
    updateDrawerVisible,
    updateElemBaseSet,
    updateElemChartSet,
    updateItemLayout
} from "../../redux/actions/LayoutDesigner";
import DesignerHeader from "./head";
import RightSlideBox from "./right";


const {Header, Sider, Content} = Layout;

class DataXLayoutDesigner extends Component<any> {
    render() {
        return (
            <div className={'light_chaser-designer'}>
                <Layout>
                    <Header><DesignerHeader/></Header>
                    <Layout>
                        <Sider width={300}>
                            <LayoutTools/>
                        </Sider>
                        <Content>
                            <LCLayoutContent {...this.props}/>
                        </Content>
                        <Sider width={300}>
                            <RightSlideBox {...this.props}/>
                        </Sider>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default connect(
    (state: any) => ({dataXDesigner: state?.dataXDesigner || {}}),
    {
        addItem,
        deleteItem,
        updateItemLayout,
        activeElem,
        updateDrawerVisible,
        updateElemChartSet,
        updateElemBaseSet
    }
)(DataXLayoutDesigner)