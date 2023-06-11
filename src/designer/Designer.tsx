import React, {Component} from 'react';
import LCLayoutContent from "./canvas/DesignerCanvas";
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
import designerStarter from './DesignerStarter';
import {getProjectById} from "../utils/LocalStorageUtil";
import lcRightMenuStore from "./operate-provider/right-click-menu/ContextMenuStore";
import eventManager from "./operate-provider/core/EventManager";
import movableStore from "../lib/lc-movable/MovableStore";
import eventOperateStore from "./operate-provider/EventOperateStore";

interface LCDesignerProps extends RouteComponentProps {
    LCDesignerStore: LCDesignerProps;
    clearDesignerStore?: (data?: any) => void;
    updateDesignerStore?: (data?: any) => void;
    addItem?: (data?: any) => void;
    delItem?: (data?: any) => void;
    updateLayout?: (data?: any) => void;
    updateActive?: (data?: any) => void;
    updateElemConfig?: (data?: any) => void;
    updateBaseStyle?: (data?: any) => void;
}

class Designer extends Component<LCDesignerProps | any> {

    constructor(props: any) {
        super(props);
        //启动组件自动化扫描
        const {doInit} = designerStarter;
        doInit && doInit();
        //初始化操作类型
        this.initOperateType();
    }

    componentDidMount() {
        //注册右键操作菜单事件
        this.handleContextMenu();

        eventManager.register('mousedown', (e: any) => {
            const {setMouseDownTime} = lcRightMenuStore;
            setMouseDownTime(Date.now());
            let id = e.target.id;
            const {setActiveMovableItemId, activeMovableItemId} = movableStore;
            if (activeMovableItemId !== id)
                setActiveMovableItemId && setActiveMovableItemId(id || '');
        });

        eventManager.register('mouseup', (e: any) => {
            const {setMouseUpTime} = lcRightMenuStore;
            setMouseUpTime(Date.now());
        });
    }

    handleContextMenu = () => {
        //todo 在设计器加载时，异步注册设计器中所有设计到的操作事件
        const {setPosition, setTargetId, updateVisible} = lcRightMenuStore;
        eventManager.register('click', (e: any) => {
            console.log(e)
            const {visible, updateVisible} = lcRightMenuStore;
            if (visible && e.button === 0) {
                //这里添加异步处理的原因：必须要在操作菜单执行点击事件执行之后才能卸载dom元素，不然操作菜单的点击事件会失效。
                setTimeout(() => {
                    updateVisible(false);
                });
            }
        });
        eventManager.register('contextmenu', (event: any) => {
            console.log(event)
            event.preventDefault();
            const {mouseDownTime, mouseUpTime} = lcRightMenuStore;
            if (event.target.className.indexOf('lc-comp-item') > -1 && mouseUpTime - mouseDownTime < 200) {
                updateVisible && updateVisible(true);
                setPosition([event.clientX, event.clientY]);
                setTargetId && setTargetId(parseInt(event.target.id));
            } else {
                updateVisible && updateVisible(false);
            }
        });
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
                    projectConfig: store.projectConfig,
                    elemConfigs: store.elemConfigs,
                    layoutConfigs: store.layoutConfigs,
                    statisticInfo: store.statisticInfo,
                    layers: store.layers,
                    themeConfig: store.theme,
                    group: store.group,
                    linkage: store.linkage,
                    condition: store.condition,
                    extendParams: store.extendParams,
                })
                const {setMinOrder, setMaxOrder} = eventOperateStore;
                setMinOrder(store.extendParams['minOrder']);
                setMaxOrder(store.extendParams['maxOrder']);
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

export default Designer;