import './ComponentList.less';
import {FileTextFilled, InsertRowAboveOutlined, MinusOutlined, PieChartFilled} from "@ant-design/icons";
import {Tooltip} from "antd";
import CompList from "./list/CompList";
import designerLeftStore from "../DesignerLeftStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {componentCategorize, componentSubCategorize} from "./ComponentCategorize";
import componentListStore from "./ComponentListStore";
import {observer} from "mobx-react";

const classifyLevelOne = [
    {
        icon: <PieChartFilled/>,
        name: '图表'
    },
    {
        icon: <FileTextFilled/>,
        name: '文本'
    },
    {
        icon: <InsertRowAboveOutlined/>,
        name: '表格'
    }
]

const classifyLevelTwo = [
    {
        key: '1',
        name: '柱状图'
    },
    {
        key: '2',
        name: '折线图'
    },
    {
        key: '3',
        name: '饼图'
    },
    {
        key: '4',
        name: '散点图'
    },
    {
        key: '5',
        name: '雷达图'
    }
]

export const ComponentList: React.FC = observer(() => {
    const {categories, subCategories, setCategories, setSubCategories} = componentListStore;
    return <div className={'dl-component-list'}>
        <div className={'dl-cl-header'}>
            <div className={'dl-cl-header-title'}>组件列表</div>
            <div className={'dl-cl-header-operate'}><MinusOutlined onClick={() => {
                const {setKey} = designerLeftStore;
                setKey("");
                const {rulerRef} = eventOperateStore;
                rulerRef?.ruleWheel();
            }}/></div>
        </div>
        <div className={'dl-cl-body'}>
            <div className={'classify-level-one'}>
                {
                    componentCategorize.map((item, index) => {
                        const {icon: Icon, name, key} = item;
                        return <Tooltip key={index}
                                        className={`clo-item ${categories === key ? "clo-item-active" : ""}`}
                                        placement={'right'}
                                        title={name}><Icon onClick={() => {
                            setCategories(key);
                            setSubCategories('all');
                        }}/></Tooltip>
                    })
                }
            </div>
            <div className={'classify-level-two'}>
                {
                    componentSubCategorize.map((item, index) => {
                        const {name, key, parentKey} = item;
                        if (categories === 'all' || key === 'all' || parentKey === categories) {
                            return <div key={index}
                                        onClick={() => setSubCategories(key)}
                                        className={`clt-item ${subCategories === key ? "clt-item-active" : ""}`}>{name}</div>
                        }
                    })
                }
            </div>
            <div className={'component-list'}>
                <CompList/>
            </div>
        </div>
    </div>;
})