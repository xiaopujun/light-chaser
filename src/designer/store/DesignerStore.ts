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
    LCDesigner,
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
import {snowflake} from "../../utils/IdGenerate";
import eventOperateStore from "../operate-provider/EventOperateStore";

class DesignerStore implements LCDesigner, AbstractBaseStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 大屏id
     */
    id: number = -1;

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
                main: '#00b7ff',
                text: '#00cfff',
                background: 'rgba(0,137,183,0.24)',
                auxiliary: '#0077a3',
                emphasize: '#00a7e6',
                supplementary: '#005e7a',
            }
        }
    ];

    /**
     * 编组
     */
    group: any = undefined;

    /**
     * 联动配置
     */
    linkage: any = undefined;

    /**
     * 条件配置
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
    doInit = (store: LCDesigner) => {
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
        this.id = -1;
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
    setId = (id: number) => {
        runInAction(() => {
            this.id = id;
        })
    }

    /**
     * 设置图表配置
     */
    setChartConfigs = (elemConfigs: { [key: string]: ElemConfig }) => {
        runInAction(() => {
            this.elemConfigs = elemConfigs;
        });
    }

    /**
     * 设置扩展临时属性
     */
    setExtendParams = (extendParams: any) => this.extendParams = extendParams;

    getActiveElemConfig = (activeId: number | string) => {
        if (activeId >= -1)
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
        console.log(toJS(this.layoutConfigs))
    }

    /**
     * 删除元素
     */
    delItem = (id: string | number) => {
        delete this.layoutConfigs[id + ''];
        delete this.elemConfigs[id + ''];
        if (this.activeElem && id === this.activeElem.id) {
            this.activeElem.id = -1;
            this.activeElem.type = "";
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
        console.log(toJS(data))
        let activeConfig: ElemConfig | any = this.elemConfigs[this.activeElem?.id + ''];
        if (activeConfig)
            this.elemConfigs[this.activeElem?.id + ''] = {...merge(activeConfig, data)};
        console.log(toJS(activeConfig))
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

    copyItem = (id: string) => {
        const {[id]: item} = this.elemConfigs;
        if (item) {
            const {[id]: layout} = this.layoutConfigs;
            const newItem = cloneDeep(item);
            const newLayout = cloneDeep(layout);
            const newId = snowflake.generateId() + '';
            newItem.id = newId;
            newLayout.id = newId;
            const [x = 10, y = 10] = (newLayout.position || []).map(p => p + 10);
            newLayout.position = [x, y];
            let {maxOrder, setMaxOrder} = eventOperateStore;
            newLayout.order = ++maxOrder;
            setMaxOrder(maxOrder);
            this.elemConfigs[newId] = newItem;
            this.layoutConfigs[newId] = newLayout;
        }
    }

}

const designerStore = new DesignerStore();

export default designerStore;
export {
    DesignerStore
};