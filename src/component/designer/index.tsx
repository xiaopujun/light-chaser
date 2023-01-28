import React, {Component} from 'react';
import {connect} from "react-redux";
import LCLayoutContent from "./LcDesignerContent";

import {
    addItem,
    clearDesignerStore,
    delItem,
    updateActive,
    updateBaseInfo,
    updateBaseStyle,
    updateCanvasConfig,
    updateChartProps,
    updateDesignerStore,
    updateLayout,
} from "../../redux/actions/LCDesignerAction";
import DesignerHeader from "./LcDesignerHeader";
import {RouteComponentProps, withRouter} from "react-router-dom";
import LcHeader from "./structure/LcHeader";
import LcBody from "./structure/LcBody";
import LcLeft from "./structure/LcLeft";
import LcContent from "./structure/LcContent";
import LcRight from "./structure/LcRight";
import LcStructure from "./structure/LcStructure";
import LcFoot from "./structure/LcFoot";
import LcDesignerLeft from "./LcDesignerLeft";
import LcDesignerRight from "./LcDesignerRight";
import LcDesignerFooter from "./LcDesignerFooter";

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
    updateChartProps?: (data?: any) => void;
    updateBaseStyle?: (data?: any) => void;
}

class LCDesigner extends Component<LCDesignerProps | any> {

    constructor(props: any) {
        super(props);
        this.doInit();
    }


    componentWillUnmount() {
        //清空状态
        const {clearDesignerStore} = this.props;
        clearDesignerStore && clearDesignerStore();
    }

    doInit = () => {
        console.log('doinit')
        //动态加载图表组件及图表配置组件
        context.keys().forEach(key => {
            const componentName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            if (componentName.match("Set$"))
                lcCompSets[componentName] = context(key).default;
            else if (componentName.match("Init$")) {
                const CompInit = context(key).default;
                if (CompInit !== undefined) {
                    lcCompInits[componentName] = new CompInit();
                }
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
                    projectConfig: {
                        screenName,
                        screenWidth: parseInt(screenWidth),
                        screenHeight: parseInt(screenHeight),
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
                updateDesignerStore({
                    id: config.screenId,
                    projectConfig: config.projectConfig,
                    screenName: config.name,
                    screenWidth: config.width,
                    screenHeight: config.height,
                    chartConfigs: JSON.parse(config.chartConfigs),
                    layoutConfigs: JSON.parse(config.layoutConfigs)
                })
                break;
        }
    }

    render() {
        return (
            <>
                <LcStructure>
                    <LcHeader><DesignerHeader {...this.props}/></LcHeader>
                    <LcBody>
                        <LcLeft>
                            <LcDesignerLeft/>
                        </LcLeft>
                        <LcContent><LCLayoutContent {...this.props}/></LcContent>
                        {/*<LcRight><LcDesignerRight {...this.props}/></LcRight>*/}
                        <LcRight><LcDesignerRight {...this.props}/></LcRight>
                    </LcBody>
                    <LcFoot>
                        <LcDesignerFooter {...this.props}/>
                    </LcFoot>
                </LcStructure>


                {/*<div className={'light_chaser-designer'}>*/}
                {/*    <Layout>*/}
                {/*        <Header>*/}
                {/*            /!*设计器头部*!/*/}
                {/*            <DesignerHeader {...this.props}/>*/}
                {/*        </Header>*/}
                {/*        <Layout>*/}
                {/*            <Sider width={300}>*/}
                {/*                /!*设计器左侧*!/*/}
                {/*                /!*<LcDesignerLeft/>*!/*/}
                {/*                <LcDesignerLeft/>*/}
                {/*            </Sider>*/}
                {/*            <Content>*/}
                {/*                /!*设计器中间内容*!/*/}
                {/*                <LCLayoutContent {...this.props}/>*/}
                {/*            </Content>*/}
                {/*            <Sider width={300}>*/}
                {/*                /!*设计器右侧配置*!/*/}
                {/*                <LcDesignerRight {...this.props}/>*/}
                {/*            </Sider>*/}
                {/*        </Layout>*/}
                {/*    </Layout>*/}
                {/*</div>*/}
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
        updateBaseStyle,
        updateChartProps,
        updateLayout,
        updateDesignerStore,
        updateBaseInfo,
        updateCanvasConfig
    }
)(withRouter(LCDesigner))