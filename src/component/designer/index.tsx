import React, {Component} from 'react';
import LCLayoutContent from "./LcDesignerContent";
import DesignerHeader from "./LcDesignerHeader";
import {RouteComponentProps} from "react-router-dom";
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
import lcDesignerContentStore from './store/LcDesignerContentStore';

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
        const {updateProjectConfig, setId, setChartConfigs, setLayoutConfigs} = lcDesignerContentStore;
        const {updateDesignerStore} = this.props;
        const {action, screenName, screenWidth, screenHeight, id} = this.props.location.state;
        switch (action) {
            case 'add':
                updateProjectConfig({
                    screenName: screenName,
                    screenWidth: parseInt(screenWidth),
                    screenHeight: parseInt(screenHeight),
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
                setId(config.screenId);
                updateProjectConfig(config.projectConfig);
                setChartConfigs(JSON.parse(config.chartConfigs));
                setLayoutConfigs(JSON.parse(config.layoutConfigs));
                break;
        }
    }

    render() {
        return (
            <>
                <LcStructure>
                    <LcHeader><DesignerHeader {...this.props}/></LcHeader>
                    <LcBody>
                        <LcLeft><LcDesignerLeft/></LcLeft>
                        <LcContent><LCLayoutContent/></LcContent>
                        <LcRight><LcDesignerRight {...this.props}/></LcRight>
                    </LcBody>
                    <LcFoot>
                        <LcDesignerFooter {...this.props}/>
                    </LcFoot>
                </LcStructure>
            </>
        );
    }
}

export default LCDesigner;

// export default connect(
//     (state: any) => ({LCDesignerStore: state?.LCDesignerStore || {}}),
//     {
//         updateActive,
//         addItem,
//         clearDesignerStore,
//         delItem,
//         updateBaseStyle,
//         updateChartProps,
//         updateLayout,
//         updateDesignerStore,
//         updateBaseInfo,
//         updateCanvasConfig,
//         updateBgConfig
//     }
// )(withRouter(LCDesigner))