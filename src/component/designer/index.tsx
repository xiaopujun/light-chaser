import React, {Component} from 'react';
import {Layout} from 'antd';
import {connect} from "react-redux";
import LcDesignerLeft from "./left/LcDesignerLeft";
import LCLayoutContent from "./LcDesignerContent";

import {
    addItem,
    clearDesignerStore,
    delItem,
    updateActive,
    updateBaseInfo,
    updateBaseStyle,
    updateChartProps,
    updateDesignerStore,
    updateGlobalSet,
    updateLayout,
    updateRightVisible
} from "../../redux/actions/LCDesignerAction";
import DesignerHeader from "./LcDesignerHeader";
import {RouteComponentProps, withRouter} from "react-router-dom";
import LcDesignerRight from "./LcDesignerRight";
import LcHeader from "./structure/LcHeader";
import LcBody from "./structure/LcBody";
import LcLeft from "./structure/LcLeft";
import LcContent from "./structure/LcContent";
import LcRight from "./structure/LcRight";
import LcStructure from "./structure/LcStructure";
import LcFoot from "./structure/LcFoot";
import LcDesignerLeftTemp from "./LcDesignerLeftTemp";

import BaseInit from '../../component/charts/interface/BaseInit';

const {Header, Sider, Content} = Layout;

const context = require.context('../charts', true, /\.(tsx|ts)$/);
export const lcComps: { [key: string]: React.FunctionComponent } = {};
export const lcCompInits: { [key: string]: () => any } = {};
export const lcCompSets: { [key: string]: React.FunctionComponent } = {};

interface LCDesignerProps extends RouteComponentProps {
    LCDesignerStore: LCDesignerProps;
    clearDesignerStore?: (data?: any) => void;
    updateDesignerStore?: (data?: any) => void;
    addItem?: (data?: any) => void;
    delItem?: (data?: any) => void;
    updateLayout?: (data?: any) => void;
    updateActive?: (data?: any) => void;
    updateRightVisible?: (data?: any) => void;
    updateChartProps?: (data?: any) => void;
    updateBaseStyle?: (data?: any) => void;
}

class LCDesigner extends Component<LCDesignerProps | any> {

    componentWillUnmount() {
        //清空状态
        const {clearDesignerStore} = this.props;
        clearDesignerStore && clearDesignerStore();
    }

    doInit = () => {
        //动态加载图表组件及图表配置组件
        context.keys().forEach(key => {
            const componentName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            if (componentName.match("Set$"))
                lcCompSets[componentName] = context(key).default;
            else if (componentName.match("Init$")) {
                // let isInit = context(key).default instanceof BaseInit;
                // console.log(`componentName${componentName},${}`,)
                lcCompInits[componentName] = context(key).default;
            } else
                lcComps[componentName] = context(key).default;
        });
    }

    componentDidMount() {
        const {updateDesignerStore} = this.props;
        const {action, screenName, screenWidth, screenHeight, id} = this.props.location.state;
        switch (action) {
            case 'add':
                updateDesignerStore({
                    globalSet: {
                        screenName,
                        screenWidth: parseInt(screenWidth),
                        screenHeight: parseInt(screenHeight),
                        saveType: 'local'
                    },
                    chartConfigs: {},
                    layoutConfigs: []
                })
                break;
            case 'update':
                let configList = JSON.parse(window.localStorage.lightChaser), config;
                for (let i = 0; i < configList.length; i++) {
                    if (configList[i].id === id) {
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
                    chartConfigs,
                    layoutConfigs
                } = config;
                updateDesignerStore({
                    id: screenId,
                    globalSet,
                    screenName: name,
                    screenWidth: width,
                    screenHeight: height,
                    chartConfigs: JSON.parse(chartConfigs),
                    layoutConfigs: JSON.parse(layoutConfigs)
                })
                break;
        }
        this.doInit();
    }

    render() {
        return (
            <>
                {/*<LcStructure>*/}
                {/*    <LcHeader><DesignerHeader {...this.props}/></LcHeader>*/}
                {/*    <LcBody>*/}
                {/*        <LcLeft>*/}
                {/*            <LcDesignerLeftTemp/>*/}
                {/*        </LcLeft>*/}
                {/*        <LcContent>/!*<LCLayoutContent {...this.props}/>*!/</LcContent>*/}
                {/*        <LcRight>/!*<LcDesignerRight {...this.props}/>*!/</LcRight>*/}
                {/*    </LcBody>*/}
                {/*    <LcFoot></LcFoot>*/}
                {/*</LcStructure>*/}


                <div className={'light_chaser-designer'}>
                    <Layout>
                        <Header>
                            {/*设计器头部*/}
                            <DesignerHeader {...this.props}/>
                        </Header>
                        <Layout>
                            <Sider width={300}>
                                {/*设计器左侧*/}
                                {/*<LcDesignerLeftTemp/>*/}
                                <LcDesignerLeft/>
                            </Sider>
                            <Content>
                                {/*设计器中间内容*/}
                                <LCLayoutContent {...this.props}/>
                            </Content>
                            <Sider width={300}>
                                {/*设计器右侧配置*/}
                                <LcDesignerRight {...this.props}/>
                            </Sider>
                        </Layout>
                    </Layout>
                </div>
            </>

        )
            ;
    }
}

export default connect(
    (state: any) => ({LCDesignerStore: state?.LCDesignerStore || {}}),
    {
        updateActive,
        addItem,
        clearDesignerStore,
        delItem,
        updateRightVisible,
        updateBaseStyle,
        updateChartProps,
        updateLayout,
        updateDesignerStore,
        updateBaseInfo,
        updateGlobalSet
    }
)(withRouter(LCDesigner))