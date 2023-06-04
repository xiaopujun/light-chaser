import React, {Component} from 'react';
import {ThemeItemType} from "../../../../framework/types/DesignerType";
import ThemeItem from "../theme-item/ThemeItem";
import designerStore from "../../../../designer/store/DesignerStore";

interface ThemeListProps {
    data?: ThemeItemType[];
    onChange?: (data: ThemeItemType) => void;
}

class ThemeList extends Component<ThemeListProps> {

    data: any = []

    state: any = {
        activeId: '0',
    }

    constructor(props: ThemeListProps) {
        super(props);
        const {list} = designerStore.themeConfig;
        this.data = list || [];
    }

    onClick = (data: any) => {
        const {onChange} = this.props;
        this.setState({activeId: data.target.id})
        onChange && onChange(this.data.find((item: any) => parseInt(item.id) === parseInt(data.target.id)));
    }

    render() {
        const {activeId} = this.state;
        let themeList = [];
        for (let i = 0; i < this.data.length; i++) {
            themeList.push(<ThemeItem key={i} id={this.data[i].id} selected={this.data[i].id == activeId}
                                      name={this.data[i].name}
                                      colors={this.data[i].colors}/>)
        }
        return (
            <div className={'lc-theme-list'} onClick={this.onClick}>
                {themeList}
            </div>
        );
    }
}

export default ThemeList;