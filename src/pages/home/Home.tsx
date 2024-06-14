import {memo, Suspense} from 'react';
import './Home.less';
import {HomeMenus} from "./menus/HomeMenus";
import {Outlet, useNavigate} from 'react-router-dom';
import Loading from "../../json-schema/ui/loading/Loading.tsx";
import {Avatar, Dropdown, MenuProps} from "antd";
import {Logout, User} from "@icon-park/react";
import AuthTools from "../../utils/AuthTools.ts";
import AuthFetchUtil from "../../utils/AuthFetchUtil.ts";


const Home = memo(() => {

    const navigate = useNavigate();

    let username = AuthTools.getUserInfo()?.name || '';
    if (username && username.length > 1)
        username = username?.substring(username?.length - 1, username?.length);

    const items: MenuProps['items'] = [
        {
            key: 'user-info',
            label: <span onClick={() => navigate('userInfo')}><User style={{position: 'relative', top: 2}}/>&nbsp;用户信息</span>,
        },
        {
            key: 'logout',
            label: <span onClick={() => {
                AuthFetchUtil.post('/api/authenticate/logout',
                    {token: AuthTools.getToken()},
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(() => {
                    AuthTools.removeUser();
                    navigate('/login');
                })
            }}><Logout style={{position: 'relative', top: 2}}/>&nbsp;退出登录</span>,
        },
    ];

    return (
        <div className={'lc-home'}>
            <div className={'lc-home-header'}>
                <div className={'logo'}>LIGHT CHASER 控制台</div>
                <div className={'user-info'}>
                    <Dropdown menu={{items}}>
                        <Avatar style={{background: "#2079ff"}}>{username?.toUpperCase()}</Avatar>
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


