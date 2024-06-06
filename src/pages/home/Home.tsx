import {memo, Suspense} from 'react';
import './Home.less';
import {HomeMenus} from "./menus/HomeMenus";
import {Outlet} from 'react-router-dom';
import Loading from "../../json-schema/ui/loading/Loading.tsx";
import {Avatar, Dropdown, MenuProps} from "antd";

const items: MenuProps['items'] = [
    {
        key: '1',
        label: "个人信息",
    },
    {
        key: '2',
        label: "退出登录",
    },
];

const Home = memo(() => {
    return (
        <div className={'lc-home'}>
            <div className={'lc-home-header'}>
                <div className={'logo'}>LIGHT CHASER 控制台</div>
                <div className={'user-info'}>
                    <Dropdown menu={{items}}>
                        <Avatar style={{background: "#2079ff"}}>普胤禛</Avatar>
                    </Dropdown>
                </div>
            </div>
            <div className={'lc-home-body'}>
                <div className={'lc-home-body-left'}><HomeMenus/></div>
                <div className={'lc-home-body-right'}>
                    <Suspense fallback={<Loading/>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </div>
        </div>
    );
})

export default Home;


