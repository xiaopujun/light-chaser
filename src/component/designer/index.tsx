import React, {Component} from 'react';
import {Layout} from 'antd';
import {connect} from "react-redux";
import LayoutTools from "./left/Tools";
import LCLayoutContent from "./Content";
import {
    activeElem,
    addItem,
    deleteItem,
    updateLCDesignerStore,
    updateDrawerVisible,
    updateElemBaseSet,
    updateElemChartSet,
    updateItemLayout
} from "../../redux/actions/LayoutDesigner";
import DesignerHeader from "./Head";
import RightSlideBox from "./Right";
import {withRouter} from "react-router-dom";
import {objToMap} from "../../utils/DateUtil";


const {Header, Sider, Content} = Layout;

class LCDesigner extends Component<any> {

    constructor(props: any) {
        super(props);

    }

    componentWillUnmount() {
        // window.removeEventListener("beforeunload", () => {
        // })
    }

    componentDidMount() {
        // window.addEventListener("beforeunload", (event) => {
        //     event.preventDefault();
        //     event.returnValue = '';
        // })
        const {updateLCDesignerStore} = this.props;
        const {action, screenName, screenWidth, screenHeight, id} = this.props.location.state;
        switch (action) {
            case 'add':
                updateLCDesignerStore({
                    screenName,
                    screenWidth: parseInt(screenWidth),
                    screenHeight: parseInt(screenHeight)
                })
                break;
            case 'update':
                let configList = JSON.parse(window.localStorage.lightChaser), config;
                for (let i = 0; i < configList.length; i++) {
                    if (configList[i].id == id) {
                        config = configList[i];
                        break
                    }
                }
                let {
                    id: screenId,
                    screenName: name,
                    screenWidth: width,
                    screenHeight: height,
                    globalSet,
                    chartConfigMap,
                    layoutConfig
                } = config;
                updateLCDesignerStore({
                    id: screenId,
                    globalSet,
                    screenName: name,
                    screenWidth: width,
                    screenHeight: height,
                    chartConfigMap: objToMap(JSON.parse(chartConfigMap)),
                    layoutConfig: JSON.parse(layoutConfig)
                })
                break;
        }
    }

    render() {
        return (
            <div className={'light_chaser-designer'}>
                <Layout>
                    <Header><DesignerHeader {...this.props}/></Header>
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
    (state: any) => ({LCDesignerStore: state?.LCDesignerStore || {}}),
    {
        updateLCDesignerStore,
        addItem,
        deleteItem,
        updateItemLayout,
        activeElem,
        updateDrawerVisible,
        updateElemChartSet,
        updateElemBaseSet
    }
)(withRouter(LCDesigner))