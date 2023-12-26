import React from "react";
import {CloudServerOutlined, DatabaseOutlined, HomeOutlined, ShoppingOutlined} from "@ant-design/icons";
import homeStore from "../HomeStore";
import {Menu} from "antd";
import {MenuItemType} from "antd/es/menu/hooks/useItems";
import {MenuInfo} from "../../../designer/right/MenuType";

export interface IHomeMenu {
    key: string;
    icon: React.ReactNode;
    text: string;
}

const menus: MenuItemType[] = [
    {
        key: 'local',
        icon: <HomeOutlined/>,
        label: '本地项目'
    },
    {
        key: 'server',
        icon: <CloudServerOutlined/>,
        label: '在线项目'
    },
    {
        key: 'datasource',
        icon: <DatabaseOutlined/>,
        label: '数据源管理'
    },
    {
        key: 'template',
        icon: <ShoppingOutlined/>,
        label: '模板市场'
    }
]

export const HomeMenus: React.FC = () => {

    const changeMenu = (menu: MenuInfo) => {
        const {setCurrentMenu} = homeStore;
        setCurrentMenu(menu.key);
    }

    return (
        <div className={'lc-home-menus'}>
            <Menu onClick={changeMenu}
                  style={{width: 256}}
                  defaultSelectedKeys={['local']}
                  mode="inline"
                  items={menus}
            />
        </div>
    );
}