import {makeAutoObservable} from "mobx";
import {ClassifyEnum} from "./ClassifyEnum";
import icon_all from './icon/icon-all.svg';
import icon_bar from './icon/icon-bar.svg';
import icon_column from './icon/icon-column.svg';
import icon_area from './icon/icon-area.svg';
import icon_pie from './icon/icon-pie.svg';
import icon_scatter from './icon/icon-scatter.svg';
import icon_line from './icon/icon-line.svg';
import icon_loading from './icon/icon-loading.svg';
import icon_flowers from './icon/icon-flowers.svg';
import icon_optimize from './icon/icon-optimize.svg';
import icon_points from './icon/icon-points.svg';

const getClassifyItemInfo = () => {
    return [
        {
            icon: icon_all,
            name: "全部",
            classify: ClassifyEnum.ALL,
        },
        {
            icon: icon_points,
            name: "基础",
            classify: ClassifyEnum.BASE,
        },
        {
            icon: icon_optimize,
            name: "装饰",
            classify: ClassifyEnum.ORNAMENTAL,
        },
        {
            icon: icon_bar,
            name: "条形图",
            classify: ClassifyEnum.BAR,
        },
        {
            icon: icon_column,
            name: "柱状图",
            classify: ClassifyEnum.COLUMN,
        },
        {
            icon: icon_line,
            name: "折线图",
            classify: ClassifyEnum.LINE,
        },
        {
            icon: icon_area,
            name: "面积图",
            classify: ClassifyEnum.AREA,
        },
        {
            icon: icon_pie,
            name: "饼图",
            classify: ClassifyEnum.PIE,
        },
        {
            icon: icon_loading,
            name: "进度图",
            classify: ClassifyEnum.PROGRESS,
        },
        {
            icon: icon_scatter,
            name: "散点图",
            classify: ClassifyEnum.SCATTER,
        },
        {
            icon: icon_flowers,
            name: "玫瑰图",
            classify: ClassifyEnum.ROSE,
        },
        // {
        //     icon: icon_radar,
        //     name: "雷达图",
        //     classify: ClassifyEnum.RADAR,
        // },
        // {
        //     icon: icon_word_cloud,
        //     name: "词云图",
        //     classify: ClassifyEnum.WORD_CLOUD,
        // },
        // {
        //     icon: icon_histogram,
        //     name: "直方图",
        //     classify: ClassifyEnum.HISTOGRAM,
        // },
        // {
        //     icon: icon_sun,
        //     name: "旭日图",
        //     classify: ClassifyEnum.SUNBURST,
        // },
        // {
        //     icon: icon_rectangle,
        //     name: "矩形树图",
        //     classify: ClassifyEnum.TREEMAP,
        // },
    ]
}

/**
 * 左侧分类列表store
 */
class ClassifyListStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 分类列表
     */
    classifies: Array<any> = [];
    /**
     * 分类搜索关键字
     */
    classifyKey: string = 'all';

    /**
     * 初始化
     */
    doInit = () => {
        this.classifies = getClassifyItemInfo();
    }

    /**
     * 清空store
     */
    doClear = () => {
        this.classifies = [];
    }

    setClassifyKey = (key: string) => {
        this.classifyKey = key;
    }
}

const classifyListStore = new ClassifyListStore();
export default classifyListStore;