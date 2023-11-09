import {Component} from 'react';
import {ThemeColors, ThemeItemType} from "../../../../designer/DesignerType";
import ThemeItem from "../theme-item/ThemeItem";
import designerStore from "../../../../designer/store/DesignerStore";
import {observer} from "mobx-react";

interface ThemeListProps {
    data?: ThemeItemType[];
    onSelected?: (data: ThemeItemType) => void;
    showOperator?: boolean;
    onDel?: (id: string) => void;
}

class ThemeList extends Component<ThemeListProps> {

    state: any = {
        activeId: '',
    }

    onDel = (id: string) => {
        const {onDel} = this.props;
        const {themeConfig, updateThemeConfig} = designerStore;
        let newThemes = themeConfig!.filter((item: any) => item.id !== id);
        updateThemeConfig(newThemes);
        onDel && onDel(id);
    }


    onSelected = (data: ThemeItemType) => {
        this.setState({activeId: data.id})
        const {onSelected} = this.props;
        onSelected && onSelected(data);
    }

    render() {
        const {activeId} = this.state;
        const {showOperator} = this.props;
        const themeConfig = designerStore.themeConfig;
        let themeList = [];
        for (let i = 0; i < themeConfig!.length; i++) {
            themeList.push(<ThemeItem key={i} id={themeConfig![i].id} selected={themeConfig![i].id === activeId}
                                      name={themeConfig![i].name}
                                      showOperator={showOperator}
                                      onDel={this.onDel}
                                      onSelected={this.onSelected}
                                      colors={themeConfig![i].colors as ThemeColors}/>)
        }
        return (
            <div className={'lc-theme-list'} style={{width: '100%'}}>
                {themeList}
            </div>
        );
    }
}

export default observer(ThemeList);