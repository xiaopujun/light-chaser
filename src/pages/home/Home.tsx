import React from 'react';
import './Home.less';
import {HomeMenus} from "./menus/HomeMenus";
import {observer} from "mobx-react";
import {Outlet} from 'react-router-dom';

const Home: React.FC = observer(() => {
    return (
        <div className={'lc-home'}>
            <div className={'lc-home-header'}>
                <div className={'logo'}>LIGHT CHASER 控制台</div>
            </div>
            <div className={'lc-home-body'}>
                <div className={'lc-home-body-left'}><HomeMenus/></div>
                <div className={'lc-home-body-right'}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
})

export default Home;


