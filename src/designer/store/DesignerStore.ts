import {action, makeObservable, observable, runInAction, toJS} from "mobx";
import {cloneDeep, isEqual} from "lodash";
import {
    CanvasConfig,
    ProjectConfig,
    ProjectDataType,
    ProjectState,
    SaveType,
    Statistic,
    ThemeItemType,
} from "../DesignerType";
import designerStarter from "../DesignerStarter";
import AbstractBaseStore from "../../framework/core/AbstractBaseStore";
import {merge} from "../../utils/ObjectUtil";
import {MovableItemType} from "../../lib/lc-movable/types";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {idGenerate} from "../../utils/IdGenerate";
import AbstractComponent from "../../framework/core/AbstractComponent";

/**
 * 设计器核心状态管理类，记录了设计器中的核心数据。包括组件配置，组件布局。 全局设置等。
 */
class DesignerStore implements AbstractBaseStore {
    constructor() {
        makeObservable(this, {
            canvasConfig: observable,
            // activeElem: observable,
            projectConfig: observable,
            layoutConfigs: observable,
            statisticInfo: observable,
            themeConfig: observable,
            extendParams: observable,
            // backgroundConfig: observable,
            doInit: action,
            addItem: action,
            delItem: action,
            // setBackgroundConfig: action,
            updateLayout: action,
            // updateActive: action,
            updateElemConfig: action,
            updateThemeConfig: action,
            flashGlobalTheme: action,
            updateCanvasConfig: action,
            updateProjectConfig: action,
            copyItem: action,
        });
    }

    /**
     * 大屏id
     */
    id: string = "";

    /**
     * 画布设置
     */
    canvasConfig: CanvasConfig = {
        rasterize: false, //是否栅格化
        dragStep: 1, //栅格化拖拽步长
        resizeStep: 1, //栅格化缩放步长
        width: 1920, //画布宽
        height: 1080, //画布高
    };

    /**
     * 激活状态属性
     */
    // activeElem: ActiveElem = {
    //     id: -999, //元素id
    //     type: "", //元素类型
    // };

    /**
     * 项目设置
     */
    projectConfig: ProjectConfig = {
        name: "", //项目名称
        des: "", //项目描述
        state: ProjectState.DRAFT, //项目状态
        createTime: "", //创建时间
        updateTime: "", //更新时间
        saveType: SaveType.LOCAL, //存储类型
        realTimeRefresh: false, //编辑模式下实时刷新
    };

    /**
     * 背景设置
     */
    // backgroundConfig: BackgroundConfigType = {
    //     width: 1920, //背景宽
    //     height: 1080, //背景高
    //     bgMode: BackgroundMode.NONE, //背景模式
    //     bgImg: {
    //         bgImgSize: [1920, 1080], //背景图片尺寸
    //         bgImgPos: [0, 0], //背景图片位置
    //         bgImgRepeat: BackgroundImgRepeat.NO_REPEAT, //背景图片重复方式
    //         bgImgUrl: "", //背景图片url地址
    //     },
    //     bgColor: {
    //         bgColorMode: BackgroundColorMode.SINGLE, //背景图片颜色模式
    //         single: {color: "#000000"},
    //         linearGradient: {
    //             color: "linear-gradient(0deg, #000000, #000000)",
    //             angle: 0,
    //             colorArr: ["#000000", "#000000"],
    //         },
    //         radialGradient: {
    //             color: "radial-gradient(circle, #000000, #000000)",
    //             colorArr: ["#000000", "#000000"],
    //         },
    //     },
    // }

    /**
     * 画布上组件id与其实例对象的映射
     */
    compInstances: { [key: string]: AbstractComponent } = {};

    /**
     * 布局配置
     */
    layoutConfigs: { [key: string]: MovableItemType } = {};

    /**
     * 统计信息
     */
    statisticInfo: Statistic = {
        //元素个数
        count: 0,
    };

    /**
     * 主题
     */
    themeConfig: Array<ThemeItemType> | any = [
        {
            id: "0",
            name: "科技风格(默认主题)",
            des: "科技风格(默认主题)",
            colors: {
                main: "#00dfff",
                text: "#62edff",
                background: "rgba(0,223,255,0.2)",
                auxiliary: "#4ca4b1",
                emphasize: "#38929f",
                supplementary: "#1790a2",
            },
        },
    ];

    /**
     * 扩展参数
     */
    extendParams: any = {
        maxOrder: 0,
        minOrder: 0,
    };

    /**
     * 初始化store
     */
    doInit = (store: ProjectDataType) => {
        this.id = store.id ?? this.id;
        this.canvasConfig = store.canvasConfig
            ? {...this.canvasConfig, ...store.canvasConfig}
            : this.canvasConfig;
        this.projectConfig = store.projectConfig
            ? {...this.projectConfig, ...store.projectConfig}
            : this.projectConfig;
        // this.elemConfigs = store.elemConfigs
        //     ? {...this.elemConfigs, ...store.elemConfigs}
        //     : this.elemConfigs;
        this.layoutConfigs = store.layoutConfigs || this.layoutConfigs;
        this.statisticInfo = store.statisticInfo
            ? {...this.statisticInfo, ...store.statisticInfo}
            : this.statisticInfo;
        this.themeConfig = store.themeConfig || this.themeConfig;
        this.extendParams = store.extendParams
            ? {...this.extendParams, ...store.extendParams}
            : this.extendParams;
        // if (this.elemConfigs["-1"]) {
        //     this.elemConfigs["-1"]["background"]["width"] = this.canvasConfig.width;
        //     this.elemConfigs["-1"]["background"]["height"] = this.canvasConfig.height;
        // }
        // this.updateActive({id: -1, type: "LcBg"});
        // const {setUpdateConfig} = rightStore;
        // setUpdateConfig(this.updateElemConfig);
    };

    /**
     * 获取store数据
     */
    getData(): ProjectDataType {
        return {
            id: this.id,
            canvasConfig: toJS(this.canvasConfig),
            // activeElem: toJS(this.activeElem),
            projectConfig: toJS(this.projectConfig),
            // elemConfigs: toJS(this.elemConfigs),
            layoutConfigs: toJS(this.layoutConfigs),
            statisticInfo: toJS(this.statisticInfo),
            themeConfig: toJS(this.themeConfig),
            extendParams: toJS(this.extendParams),
        };
    }

    /**
     * 清空store
     */
    doDestroy = () => {
        this.id = "";
        this.canvasConfig = {};
        // this.activeElem = {};
        this.projectConfig = {};
        // this.elemConfigs = {};
        this.layoutConfigs = {};
        this.statisticInfo = {};
        this.themeConfig = {};
        this.extendParams = {};
    };

    /**
     * 设置布局id
     */
    setId = (id: string) => {
        runInAction(() => {
            this.id = id;
        });
    };

    // setBackgroundConfig = (config: BackgroundConfigType, upOp?: UpdateOptions) => {
    //     this.backgroundConfig = {...merge(this.backgroundConfig, config)};
    // }

    getActiveElemConfig = (activeId: number | string) => {
        // return this.elemConfigs[activeId + ""];
    };

    /**
     * 添加元素
     */
    addItem = (item: MovableItemType) => {
        this.layoutConfigs[item.id + ""] = item;
        // if (this.statisticInfo)
        //     this.statisticInfo.count = Object.keys(this.elemConfigs).length;
    };

    /**
     * 删除元素
     */
    delItem = (ids: string[]) => {
        for (const id of ids) {
            delete this.layoutConfigs[id];
            // delete this.elemConfigs[id];
            // if (this.activeElem && (id as any) === this.activeElem.id) {
            //     this.activeElem.id = -1;
            //     this.activeElem.type = "";
            // }
        }
    };

    /**
     * 更新布局
     */
    updateLayout = (items: MovableItemType[]) => {
        for (const item of items) {
            let oldItem = this.layoutConfigs[item.id + ""];
            if (!isEqual(oldItem, item)) {
                this.layoutConfigs[item.id + ""] = {...merge(oldItem, item)};
            }
        }
    };

    /**
     * 更新激活状态元素
     */
    // updateActive = (data: ActiveElem) => {
    //     if (data.id === this.activeElem.id) return;
    //     this.activeElem = {...this.activeElem, ...data};
    //     const {setActiveElem, setActiveElemConfig} = rightStore;
    //     setActiveElem(this.activeElem);
    //     setActiveElemConfig(this.elemConfigs[this.activeElem?.id + ""]);
    // };

    /**
     * 更新图表组件配置
     */
    updateElemConfig = (data: any) => {
        // let activeConfig: ElemConfig | any =
        //     this.elemConfigs[this.activeElem?.id + ""];
        // if (activeConfig)
        //     this.elemConfigs[this.activeElem?.id + ""] = {
        //         ...merge(activeConfig, data),
        //     };
        // const {setActiveElemConfig} = rightStore;
        // setActiveElemConfig(this.elemConfigs[this.activeElem?.id + ""]);
    };

    updateThemeConfig = (data: any) => {
        this.themeConfig = data;
    };

    flashGlobalTheme = (newTheme: ThemeItemType) => {
        const {themeRefresher} = designerStarter;
        // this.elemConfigs &&
        // Object.keys(this.elemConfigs).forEach((key: string) => {
        //     let elemConfig: any = this.elemConfigs[key];
        //     let {info} = elemConfig;
        //     if (info) {
        //         const themeFreshFun = themeRefresher[info.type];
        //         themeFreshFun && themeFreshFun(newTheme, elemConfig);
        //         this.elemConfigs[key] = {...elemConfig};
        //     }
        // });
    };

    /**
     * 更新画布设置
     */
    updateCanvasConfig = (data: CanvasConfig) => {
        this.canvasConfig = {...this.canvasConfig, ...data};
        // this.elemConfigs["-1"]["background"]["width"] = data.width;
        // this.elemConfigs["-1"]["background"]["height"] = data.height;
    };

    /**
     * 更新项目配置
     */
    updateProjectConfig = (data: ProjectConfig) => {
        this.projectConfig = {...this.projectConfig, ...data};
    };

    copyItem = (ids: string[]) => {
        let newIds: any = [];
        let {maxLevel, setMaxLevel} = eventOperateStore;
        for (const id of ids) {
            //获取被复制元素布局
            const {[id]: layout} = this.layoutConfigs;
            if (layout) {
                const newLayout = cloneDeep(layout);
                const newId = idGenerate.generateId();
                newIds.push(newId);
                newLayout.id = newId;
                const [x = 10, y = 10] = (newLayout.position || []).map((p) => p + 10);
                newLayout.position = [x, y];
                newLayout.order = ++maxLevel;
                this.layoutConfigs[newId] = newLayout;
            }
        }
        setMaxLevel(maxLevel);
        return newIds;
    };
}

const designerStore = new DesignerStore();

export default designerStore;
export {DesignerStore};
