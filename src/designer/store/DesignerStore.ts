import {makeAutoObservable, runInAction, toJS} from "mobx";
import {cloneDeep, isEqual} from "lodash";
import {
    ActiveElem,
    BackgroundColorMode,
    BackgroundImgRepeat,
    BackgroundMode,
    CanvasConfig,
    ElemConfig,
    Layer,
    DesignerType,
    ProjectConfig,
    ProjectState,
    SaveType,
    Statistic,
    ThemeItemType
} from "../DesignerType";
import designerStarter from "../DesignerStarter";
import AbstractBaseStore from "../../framework/core/AbstractBaseStore";
import rightStore from "../right/RightStore";
import {merge} from "../../utils/ObjectUtil";
import {MovableItemType} from "../../lib/lc-movable/types";
import {idGenerate} from "../../utils/IdGenerate";
import eventOperateStore from "../operate-provider/EventOperateStore";

/**
 * 设计器核心状态管理类，记录了设计器中的核心数据。包括组件配置，组件布局。 全局设置等。
 */
class DesignerStore implements DesignerType, AbstractBaseStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 大屏id
     */
    id: string = '';

    /**
     * 画布设置
     */
    canvasConfig: CanvasConfig = {
        rasterize: false, //是否栅格化
        dragStep: 1, //栅格化拖拽步长
        resizeStep: 1, //栅格化缩放步长
        width: 1920,  //画布宽
        height: 1080,  //画布高
    };

    /**
     * 激活状态属性
     */
    activeElem: ActiveElem = {
        id: -999, //元素id
        type: '' //元素类型
    };

    /**
     * 项目设置
     */
    projectConfig: ProjectConfig = {
        name: '',//项目名称
        des: '',//项目描述
        state: ProjectState.DRAFT,//项目状态
        createTime: '',//创建时间
        updateTime: '',//更新时间
        saveType: SaveType.LOCAL,//存储类型
        realTimeRefresh: false,//编辑模式下实时刷新
    };

    /**
     * 组件配置
     */
    elemConfigs: { [key: string]: ElemConfig } = {
        '-1': {
            'background': {
                width: 1920,//背景宽
                height: 1080,//背景高
                bgMode: BackgroundMode.NONE,//背景模式
                bgImg: {
                    bgImgSize: [1920, 1080],//背景图片尺寸
                    bgImgPos: [0, 0],//背景图片位置
                    bgImgRepeat: BackgroundImgRepeat.NO_REPEAT,//背景图片重复方式
                    bgImgUrl: '',//背景图片url地址
                },
                bgColor: {
                    bgColorMode: BackgroundColorMode.SINGLE,//背景图片颜色模式
                    single: {color: '#000000'},
                    linearGradient: {
                        color: 'linear-gradient(0deg, #000000, #000000)',
                        angle: 0,
                        colorArr: ['#000000', '#000000']
                    },
                    radialGradient: {
                        color: 'radial-gradient(circle, #000000, #000000)',
                        colorArr: ['#000000', '#000000']
                    },
                }
            },
        }
    };

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
     * 图层信息
     */
    layers: Layer[] = [];

    /**
     * 主题
     */
    themeConfig: Array<ThemeItemType> | any = [
        {
            id: '0',
            name: '科技风格(默认主题)',
            des: '科技风格(默认主题)',
            colors: {
                main: '#00dfff',
                text: '#62edff',
                background: 'rgba(0,223,255,0.2)',
                auxiliary: '#4ca4b1',
                emphasize: '#38929f',
                supplementary: '#1790a2',
            }
        },
        {
            id: '1',
            name: '红色主题',
            des: '红色主题',
            colors: {
                main: '#ff4d4f',
                text: '#ff7875',
                background: 'rgba(255,77,79,0.2)',
                auxiliary: '#d4380d',
                emphasize: '#cf1322',
                supplementary: '#a8071a',
            }
        }, {
            id: '2',
            name: '绿色主题',
            des: '绿色主题',
            colors: {
                main: '#52c41a',
                text: '#87d068',
                background: 'rgba(82,196,26,0.2)',
                auxiliary: '#389e0d',
                emphasize: '#237804',
                supplementary: '#135200',
            }
        }, {
            id: '3',
            name: '蓝色主题',
            des: '蓝色主题',
            colors: {
                main: '#1890ff',
                text: '#40a9ff',
                background: 'rgba(24,144,255,0.2)',
                auxiliary: '#096dd9',
                emphasize: '#0050b3',
                supplementary: '#003a8c',
            }
        }, {
            id: '4',
            name: '黄色主题',
            des: '黄色主题',
            colors: {
                main: '#faad14',
                text: '#ffc53d',
                background: 'rgba(250,173,20,0.2)',
                auxiliary: '#d48806',
                emphasize: '#fa8c16',
                supplementary: '#ad6800',
            }
        }
    ];

    /**
     * 组合
     */
    group: any = undefined;

    /**
     * 联动器配置
     */
    linkage: any = undefined;

    /**
     * 条件器配置
     */
    condition: any = undefined;

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
    doInit = (store: DesignerType) => {
        this.id = store.id ?? this.id;
        this.canvasConfig = store.canvasConfig ? {...this.canvasConfig, ...store.canvasConfig} : this.canvasConfig;
        this.projectConfig = store.projectConfig ? {...this.projectConfig, ...store.projectConfig} : this.projectConfig;
        this.elemConfigs = store.elemConfigs ? {...this.elemConfigs, ...store.elemConfigs} : this.elemConfigs;
        this.layoutConfigs = store.layoutConfigs || this.layoutConfigs;
        this.statisticInfo = store.statisticInfo ? {...this.statisticInfo, ...store.statisticInfo} : this.statisticInfo;
        this.layers = store.layers || this.layers;
        this.themeConfig = store.themeConfig || this.themeConfig;
        this.group = store.group || this.group;
        this.linkage = store.linkage || this.linkage;
        this.condition = store.condition || this.condition;
        this.extendParams = store.extendParams ? {...this.extendParams, ...store.extendParams} : this.extendParams;
        if (this.elemConfigs['-1']) {
            this.elemConfigs['-1']['background']['width'] = this.canvasConfig.width;
            this.elemConfigs['-1']['background']['height'] = this.canvasConfig.height;
        }
        this.updateActive({id: -1, type: 'LcBg'});
        const {setUpdateConfig} = rightStore;
        setUpdateConfig(this.updateElemConfig);
    }

    getData(): any {
        return {
            id: this.id,
            canvasConfig: toJS(this.canvasConfig),
            activeElem: toJS(this.activeElem),
            projectConfig: toJS(this.projectConfig),
            elemConfigs: toJS(this.elemConfigs),
            layoutConfigs: toJS(this.layoutConfigs),
            statisticInfo: toJS(this.statisticInfo),
            layers: toJS(this.layers),
            theme: toJS(this.themeConfig),
            group: toJS(this.group),
            linkage: toJS(this.linkage),
            condition: toJS(this.condition),
            extendParams: toJS(this.extendParams),
        }
    }

    /**
     * 清空store
     */
    doDestroy = () => {
        this.id = '';
        this.canvasConfig = {};
        this.activeElem = {};
        this.projectConfig = {};
        this.elemConfigs = {};
        this.layoutConfigs = {};
        this.statisticInfo = {};
        this.layers = [];
        this.themeConfig = {};
        this.group = {};
        this.linkage = {};
        this.condition = {};
        this.extendParams = {};
    }

    /**
     * 设置布局id
     */
    setId = (id: string) => {
        runInAction(() => {
            this.id = id;
        })
    }

    getActiveElemConfig = (activeId: number | string) => {
        return this.elemConfigs[activeId + ""];
    }

    /**
     * 添加元素
     */
    addItem = (item: MovableItemType) => {
        this.layoutConfigs[item.id + ''] = item;
        const {customComponentInfoMap} = designerStarter;
        let initObj: any = customComponentInfoMap[item.type + ''];
        let initData: any = initObj.getInitConfig()
        initData.info = {...initData.info, ...{id: item.id}}
        if (this.elemConfigs && this.statisticInfo)
            this.elemConfigs[item.id + ''] = initData;
        if (this.statisticInfo)
            this.statisticInfo.count = Object.keys(this.elemConfigs).length;
    }

    /**
     * 删除元素
     */
    delItem = (ids: string[]) => {
        for (const id of ids) {
            delete this.layoutConfigs[id];
            delete this.elemConfigs[id];
            if (this.activeElem && id as any === this.activeElem.id) {
                this.activeElem.id = -1;
                this.activeElem.type = "";
            }
        }
    }

    /**
     * 更新布局
     */
    updateLayout = (items: MovableItemType[]) => {
        for (const item of items) {
            let oldItem = this.layoutConfigs[item.id + ''];
            if (!isEqual(oldItem, item)) {
                this.layoutConfigs[item.id + ''] = {...merge(oldItem, item)};
            }
        }
    }

    /**
     * 更新激活状态元素
     */
    updateActive = (data: ActiveElem) => {
        if (data.id === this.activeElem.id)
            return;
        this.activeElem = {...this.activeElem, ...data};
        const {setActiveElem, setActiveElemConfig} = rightStore;
        setActiveElem(this.activeElem);
        setActiveElemConfig(this.elemConfigs[this.activeElem?.id + '']);
    }

    /**
     * 更新图表组件配置
     */
    updateElemConfig = (data: any) => {
        let activeConfig: ElemConfig | any = this.elemConfigs[this.activeElem?.id + ''];
        if (activeConfig)
            this.elemConfigs[this.activeElem?.id + ''] = {...merge(activeConfig, data)};
        const {setActiveElemConfig} = rightStore;
        setActiveElemConfig(this.elemConfigs[this.activeElem?.id + '']);
    }

    updateThemeConfig = (data: any) => {
        this.themeConfig = data;
    }

    flashGlobalTheme = (newTheme: ThemeItemType) => {
        const {themeRefresher} = designerStarter;
        this.elemConfigs && Object.keys(this.elemConfigs).forEach((key: string) => {
            let elemConfig: any = this.elemConfigs[key];
            let {info} = elemConfig;
            if (info) {
                const themeFreshFun = themeRefresher[info.type];
                themeFreshFun && themeFreshFun(newTheme, elemConfig);
                this.elemConfigs[key] = {...elemConfig};
            }
        });
    }

    /**
     * 更新画布设置
     */
    updateCanvasConfig = (data: CanvasConfig) => {
        this.canvasConfig = {...this.canvasConfig, ...data};
        this.elemConfigs['-1']['background']['width'] = data.width;
        this.elemConfigs['-1']['background']['height'] = data.height;
    }

    /**
     * 更新项目配置
     */
    updateProjectConfig = (data: ProjectConfig) => {
        this.projectConfig = {...this.projectConfig, ...data};
    }

    copyItem = (ids: string[]) => {
        let newIds = [];
        let {maxOrder, setMaxOrder} = eventOperateStore;
        for (const id of ids) {
            const {[id]: item} = this.elemConfigs;
            if (item) {
                const {[id]: layout} = this.layoutConfigs;
                const newItem = cloneDeep(item);
                const newLayout = cloneDeep(layout);
                const newId = idGenerate.generateId();
                console.log(newId)
                newIds.push(newId);
                newItem.id = newId;
                newLayout.id = newId;
                const [x = 10, y = 10] = (newLayout.position || []).map(p => p + 10);
                newLayout.position = [x, y];
                newLayout.order = ++maxOrder;
                this.elemConfigs[newId] = newItem;
                this.layoutConfigs[newId] = newLayout;
            }
        }
        setMaxOrder(maxOrder);
        return newIds;
    }

}

const designerStore = new DesignerStore();

export default designerStore;
export {
    DesignerStore
};