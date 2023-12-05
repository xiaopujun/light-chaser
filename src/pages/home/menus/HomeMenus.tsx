import React from "react";
import './HomeMenus.less';
import {CodeSandboxSquareFilled, DatabaseFilled, HomeFilled, ShopFilled} from "@ant-design/icons";
import homeStore from "../HomeStore";

export interface IHomeMenu {
    key: string;
    icon: React.ReactNode;
    text: string;
}

const menus: IHomeMenu[] = [
    {
        key: 'local',
        icon: <HomeFilled/>,
        text: '本地项目'
    },
    {
        key: 'server',
        icon: <DatabaseFilled/>,
        text: '在线项目'
    },
    {
        key: 'datasource',
        icon: <CodeSandboxSquareFilled/>,
        text: '数据源管理'
    },
    {
        key: 'template',
        icon: <ShopFilled/>,
        text: '模板市场'
    }
]

export const HomeMenus: React.FC = () => {

    const changeMenu = (key: string) => {
        const {setCurrentMenu} = homeStore;
        setCurrentMenu(key);
    }

    return (
        <div className={'lc-home-menus'}>
            {
                menus.map((menu, index) => {
                    return (
                        <div className={'lc-home-menu'} key={index} onClick={() => changeMenu(menu.key)}>
                            <div className={'lc-home-menu-icon'}>{menu.icon}</div>
                            <div className={'lc-home-menu-text'}>{menu.text}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}