import React, {Component} from 'react';
import {ThemeItemType} from "../../../../framework/types/DesignerType";
import ThemeItem from "../theme-item/ThemeItem";

interface ThemeListProps {
    data?: ThemeItemType[];
    onChange?: (data: ThemeItemType) => void;
}

class ThemeList extends Component<ThemeListProps> {

    state = {
        activeId: '0'
    }

    data: any = [
        {
            id: '0',
            name: '主题1',
            colors: {
                main: '#ff5300',
                text: '#ff854b',
                background: '#FFAA5929',
                auxiliary: '#9b714b',
                emphasize: '#d59455',
                supplementary: '#9f724d'
            }
        },
        {
            id: '1',
            name: '主题2',
            colors: {
                main: '#ffcb00',
                text: '#ffd441',
                background: 'rgba(255,212,65,0.2)',
                auxiliary: '#cbb25c',
                emphasize: '#c79500',
                supplementary: '#b9a768'
            }
        }
    ]

    onClick = (data: any) => {
        const {onChange} = this.props;
        this.setState({activeId: data.target.id})
        onChange && onChange(this.data[data.target.id])
    }

    render() {
        const {activeId} = this.state;
        let themeList = [];
        for (let i = 0; i < this.data.length; i++) {
            themeList.push(<ThemeItem key={i} id={this.data[i].id} selected={this.data[i].id === activeId}
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