import React, {Component} from 'react';
import {Layout} from 'antd';
import {connect} from "react-redux";
import LayoutTools from "./left/tools";
import DataXLayoutContent from "./content";
import {
    addItem,
    deleteItem,
    updateItemLayout,
    activeElem,
    updateDrawerVisible,
    updateElemBaseSet,
    updateElemChartSet
} from "../../redux/actions/LayoutDesigner";


const {Header, Footer, Sider, Content} = Layout;

class DataXLayoutDesigner extends Component<any> {
    render() {
        return (
            <Layout>
                <Header>头</Header>
                <Layout style={{minHeight: window.innerHeight - 134}}>
                    <Sider>
                        <LayoutTools/>
                    </Sider>
                    <Content>
                        <DataXLayoutContent {...this.props}/>
                    </Content>
                </Layout>
                <Footer>下</Footer>
            </Layout>
        );
    }
}

export default connect(
    (state: any) => ({dataXDesigner: state?.dataXDesigner || {}}),
    {addItem, deleteItem, updateItemLayout, activeElem, updateDrawerVisible, updateElemBaseSet, updateElemChartSet}
)(DataXLayoutDesigner)