import './ComponentList.less';
import {MinusOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import CompList from "./list/CompList";
import designerLeftStore from "../DesignerLeftStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {componentCategorize, componentSubCategorize} from "./ComponentCategorize";
import componentListStore from "./ComponentListStore";
import {observer} from "mobx-react";

export const ComponentList: React.FC = () => {
    return <div className={'dl-component-list'}>
        <div className={'dl-cl-header'}>
            <div className={'dl-cl-header-title'}>组件列表</div>
            <div className={'dl-cl-header-operate'}><MinusOutlined onClick={() => {
                const {setMenu} = designerLeftStore;
                setMenu("");
                const {rulerRef} = eventOperateStore;
                rulerRef?.ruleWheel();
            }}/></div>
        </div>
        <div className={'dl-cl-body'}>
            <div className={'main-categories'}><CategoryList/></div>
            <div className={'sub-categories'}><SubCategoryList/></div>
            <div className={'component-list'}><CompList/></div>
        </div>
    </div>;
}

export const CategoryList: React.FC = observer(() => {
    const {categories, setCategories, setSubCategories} = componentListStore;
    return (
        <>
            {
                componentCategorize.map((item, index) => {
                    const {icon, name, key} = item;
                    const Icon = icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
                    return <Tooltip key={index}
                                    className={`clo-item ${categories === key ? "clo-item-active" : ""}`}
                                    placement={'right'}
                                    title={name}><Icon onClick={() => {
                        setCategories(key);
                        setSubCategories('all');
                    }}/></Tooltip>
                })
            }
        </>
    )
});

export const SubCategoryList: React.FC = observer(() => {
    const {categories, subCategories, setSubCategories} = componentListStore;
    return (
        <>
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
        </>
    )
});