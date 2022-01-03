import React, {Component} from 'react';
import {Button, Layout} from 'antd';
import LayoutTools from "./left/tools";
import DataXLayoutContent from "./content";


const {Header, Footer, Sider, Content} = Layout;

class DataXLayoutDesigner extends Component<any, any> {
    render() {
        return (
            <Layout>
                <Header>头</Header>
                <Layout style={{minHeight: window.innerHeight - 134}}>
                    <Sider>
                        <LayoutTools/>
                    </Sider>
                    <Content>
                        <DataXLayoutContent/>
                    </Content>
                </Layout>
                <Footer>下</Footer>
            </Layout>
        );
    }
}

export default DataXLayoutDesigner;