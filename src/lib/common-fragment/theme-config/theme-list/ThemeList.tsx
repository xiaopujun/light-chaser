import React, {Component} from 'react';
import {ThemeItemType} from "../../../../designer/DesignerType";
import ThemeItem from "../theme-item/ThemeItem";
import designerStore from "../../../../designer/store/DesignerStore";
import {observer} from "mobx-react";

interface ThemeListProps {
    data?: ThemeItemType[];
    onChange?: (data: ThemeItemType) => void;
    showOperator?: boolean;
    onUpd?: (data: ThemeItemType) => void;
    onDel?: (id: string) => void;
}

class ThemeList extends Component<ThemeListProps> {

    state: any = {
        activeId: '',
    }

    onDel = (id: string) => {
        const {onDel} = this.props;
        const {themeConfig, updateThemeConfig} = designerStore;
        let newThemes = themeConfig.filter((item: any) => item.id !== id);
        updateThemeConfig(newThemes);
        onDel && onDel(id);
    }


    onSelected = (id: string) => {
        console.log(id)
        const {onChange} = this.props;
        const themeConfig = designerStore.themeConfig;
        this.setState({activeId: id})
        onChange && onChange(themeConfig.find((item: any) => parseInt(item.id) === parseInt(id)));
    }

    render() {
        const {activeId} = this.state;
        const {showOperator, onUpd} = this.props;
        const themeConfig = designerStore.themeConfig;
        let themeList = [];
        for (let i = 0; i < themeConfig.length; i++) {
            themeList.push(<ThemeItem key={i} id={themeConfig[i].id} selected={themeConfig[i].id === activeId}
                                      name={themeConfig[i].name}
                                      showOperator={showOperator}
                                      onDel={this.onDel}
                                      onUpd={onUpd}
                                      onSelected={this.onSelected}
                                      colors={themeConfig[i].colors}/>)
        }
        return (
            <div className={'lc-theme-list'} style={{width: '100%'}}>
                {themeList}
            </div>
        );
    }
}

export default observer(ThemeList);