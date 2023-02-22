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
import {localQuery} from "../../local/LocalStorageUtil";

export const lcComps: { [key: string]: React.FunctionComponent } = {};
export const lcCompInits: { [key: string]: () => any } = {};
export const lcCompConfigs: { [key: string]: React.FunctionComponent } = {};

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
        //todo 扫描组件，要优化为异步扫描
        this.scanComponent();

    }

    componentDidMount() {
        //初始化操作类型
        this.initOperateType();
    }

    componentWillUnmount() {
        //清空状态
        const {clearDesignerStore} = this.props;
        clearDesignerStore && clearDesignerStore();
    }


    /**
     * 扫描组件
     */
    scanComponent = () => {
        const context = require.context('../charts', true, /\.(tsx|ts)$/);
        context.keys().forEach(key => {
            const componentName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            if (componentName.match("Set$"))
                lcCompConfigs[componentName] = context(key).default;
            else if (componentName.match("Init$")) {
                const CompInit = context(key).default;
                if (CompInit !== undefined) {
                    lcCompInits[componentName] = new CompInit();
                }
            } else
                lcComps[componentName] = context(key).default;
        });
    }

    /**
     * 初始化项目操作类型。新增 / 更新
     */
    initOperateType = () => {
        const {action} = this.props.location.state;
        switch (action) {
            case 'create':
                this.initCreateInfo();
                break;
            case 'edit':
                this.initEditInfo();
                break;
        }
    }

    /**
     * 初始化以创建方式打开时项目信息
     */
    initCreateInfo = () => {
        const {updateProjectConfig} = lcDesignerContentStore;
        const {screenName, screenWidth, screenHeight} = this.props.location.state;
        updateProjectConfig({
            screenName: screenName,
            screenWidth: parseInt(screenWidth),
            screenHeight: parseInt(screenHeight),
        })
    }

    /**
     * 初始化以更新方式打开时项目信息
     */
    initEditInfo = () => {
        const {
            updateProjectConfig,
            setId,
            setChartConfigs,
            setLayoutConfigs,
            setBgConfig,
            setExtendParams
        } = lcDesignerContentStore;
        const {id} = this.props.location.state;
        localQuery(id).then((config: any) => {
            if (config) {
                setId(config.id);
                updateProjectConfig(config.projectConfig);
                setChartConfigs(config.chartConfigs);
                setLayoutConfigs(config.layoutConfigs);
                setBgConfig(config.bgConfig);
                setExtendParams(config.extendParams);
            }
        })
    }


    render() {
        return (
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
        );
    }
}

export default LCDesigner;