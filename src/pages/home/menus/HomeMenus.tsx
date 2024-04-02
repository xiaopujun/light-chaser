import {CloudServerOutlined, DatabaseOutlined, HomeOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import {MenuItemType} from "antd/es/menu/hooks/useItems";
import {useLocation, useNavigate} from "react-router-dom";

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

export const HomeMenus = () => {

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
                  style={{width: 256}}
                  defaultSelectedKeys={[currentMenu]}
                  mode="inline"
                  items={menus}
            />
        </div>
    );
}