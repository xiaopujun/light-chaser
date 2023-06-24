import React, {Component} from 'react';
import {ThemeItemType} from "../../../../designer/DesignerType";
import ThemeItem from "../theme-item/ThemeItem";
import designerStore from "../../../../designer/store/DesignerStore";
import {observer} from "mobx-react";

interface ThemeListProps {
    data?: ThemeItemType[];
    onChange?: (data: ThemeItemType) => void;
}

class ThemeList extends Component<ThemeListProps> {

    state: any = {
        activeId: '',
    }


    onClick = (data: any) => {
        const {onChange} = this.props;
        const themeConfig = designerStore.themeConfig;
        this.setState({activeId: data.target.id})
        onChange && onChange(themeConfig.find((item: any) => parseInt(item.id) === parseInt(data.target.id)));
    }

    render() {
        const {activeId} = this.state;
        const themeConfig = designerStore.themeConfig;
        let themeList = [];
        for (let i = 0; i < themeConfig.length; i++) {
            themeList.push(<ThemeItem key={i} id={themeConfig[i].id} selected={themeConfig[i].id === activeId}
                                      name={themeConfig[i].name}
                                      colors={themeConfig[i].colors}/>)
        }
        return (
            <div className={'lc-theme-list'} style={{width: '100%'}} onClick={this.onClick}>
                {themeList}
            </div>
        );
    }
}

export default observer(ThemeList);