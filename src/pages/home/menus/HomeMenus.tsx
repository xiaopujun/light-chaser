import {Menu} from "antd";
import {MenuItemType} from "antd/es/menu/hooks/useItems";
import {useLocation, useNavigate} from "react-router-dom";
import {memo} from "react";
import {Data, LocalPin, NetworkDrive, System} from "@icon-park/react";

const menus: MenuItemType[] = [
    {
        key: 'server',
        icon: <NetworkDrive size={16}/>,
        label: '在线项目'
    },
    {
        key: 'local',
        icon: <LocalPin size={16}/>,
        label: '本地项目'
    },
    {
        key: 'datasource',
        icon: <Data size={16}/>,
        label: '数据源管理'
    },
    {
        key: 'more',
        icon: <System size={16}/>,
        label: '更多'
    },
    // {
    //     key: 'template',
    //     icon: <ShoppingOutlined/>,
    //     label: '模板市场'
    // }
]

export const HomeMenus = memo(() => {

    const navigate = useNavigate();
    const location = useLocation();
    const changeMenu = (menu: MenuItemType) => {
        navigate(`${menu.key}`);
    }
    const {pathname} = location;
    const currentMenu = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
    return (
        <div className={'lc-home-menus'}>
            <Menu onClick={changeMenu}
                  style={{width: 220}}
                  defaultSelectedKeys={[currentMenu]}
                  mode="inline"
                  items={menus}
            />
        </div>
    );
})