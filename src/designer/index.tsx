import React, {Component} from 'react';
import LCLayoutContent from "./content/LcDesignerContent";
import DesignerHeader from "./header";
import {RouteComponentProps} from "react-router-dom";
import LcHeader from "./structure/LcHeader";
import LcBody from "./structure/LcBody";
import LcLeft from "./structure/LcLeft";
import LcContent from "./structure/LcContent";
import LcRight from "./structure/LcRight";
import LcStructure from "./structure/LcStructure";
import LcFoot from "./structure/LcFoot";
import LcDesignerLeft from "./left/LcDesignerLeft";
import LcDesignerRight from "./right/LcDesignerRight";
import LcDesignerFooter from "./footer/LcDesignerFooter";
import lcDesignerContentStore from './store/LcDesignerContentStore';
import {getProjectById} from "../local/LocalStorageUtil";
import {doScanInit} from "./Scanner";

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
        doScanInit();

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
        const {doInit} = lcDesignerContentStore;
        const {screenName, screenWidth, screenHeight} = this.props.location.state;
        doInit({
            canvasConfig: {
                width: parseInt(screenWidth),
                height: parseInt(screenHeight),
            },
            projectConfig: {
                name: screenName
            },
            bgConfig: {
                width: parseInt(screenWidth),
                height: parseInt(screenHeight),
                bgColor: '#031419',
            }
        })
    }

    /**
     * 初始化以更新方式打开时项目信息
     */
    initEditInfo = () => {
        const {doInit} = lcDesignerContentStore;
        const {id} = this.props.location.state;
        getProjectById(id).then((store: any) => {
            if (store) {
                doInit({
                    id: store.id,
                    canvasConfig: store.canvasConfig,
                    activated: store.activated,
                    bgConfig: store.bgConfig,
                    projectConfig: store.projectConfig,
                    elemConfigs: store.elemConfigs,
                    layoutConfigs: store.layoutConfigs,
                    statisticInfo: store.statisticInfo,
                    layers: store.layers,
                    theme: store.theme,
                    group: store.group,
                    linkage: store.linkage,
                    condition: store.condition,
                    extendParams: store.extendParams,
                })
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