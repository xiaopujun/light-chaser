import React, {Component} from 'react';
import LCLayoutContent from "./content/DesignerContent";
import DesignerHeader from "./header/DesignerHeader";
import {RouteComponentProps} from "react-router-dom";
import LcHeader from "./structure/LcHeader";
import LcBody from "./structure/LcBody";
import LcLeft from "./structure/LcLeft";
import LcContent from "./structure/LcContent";
import LcRight from "./structure/LcRight";
import LcStructure from "./structure/LcStructure";
import LcFoot from "./structure/LcFoot";
import DesignerLeft from "./left";
import Right from "./right";
import DesignerFooter from "./footer/DesignerFooter";
import lcDesignerContentStore from './store/DesignerStore';
import designerStore from './BootStore';
import {getProjectById} from "../utils/LocalStorageUtil";
import lcRightMenuStore from "./store/LcRightMenuStore";
import shortcutKey from "./event-operate/ShortcutKey";
import eventManager from "../framework/event/EventManager";

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
        const {doInit} = designerStore;
        doInit && doInit();
    }

    componentDidMount() {
        //todo 在设计器加载时，异步注册设计器中所有设计到的操作事件
        const {setPosition, setTargetId, updateVisible} = lcRightMenuStore;
        eventManager.register('click', (e: any) => {
            const {visible, updateVisible} = lcRightMenuStore;
            if (visible && e.button === 0)
                updateVisible(false);
        });
        eventManager.register('contextmenu', (event: any) => {
            event.preventDefault();
            if (event.target.className.indexOf('react-grid-item') > -1) {
                updateVisible && updateVisible(true);
                setPosition([event.clientX, event.clientY]);
                setTargetId && setTargetId(parseInt(event.target.id));
            } else {
                updateVisible && updateVisible(false);
            }
        });
        eventManager.register('keyup', (e: any) => {
            if (e.keyCode === 32)
                shortcutKey._space = false;
        });
        eventManager.register('keydown', (e: any) => {
            if (e.keyCode === 32)
                shortcutKey._space = true;
        });
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
                    activeElem: store.activeElem,
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
                <LcHeader>
                    <DesignerHeader {...this.props}/>
                </LcHeader>
                <LcBody>
                    <LcLeft><DesignerLeft/></LcLeft>
                    <LcContent><LCLayoutContent/></LcContent>
                    <LcRight><Right {...this.props}/></LcRight>
                </LcBody>
                <LcFoot>
                    <DesignerFooter {...this.props}/>
                </LcFoot>
            </LcStructure>
        );
    }
}

export default LCDesigner;