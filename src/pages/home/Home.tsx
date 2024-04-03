import {memo} from 'react';
import './Home.less';
import {HomeMenus} from "./menus/HomeMenus";
import {Outlet} from 'react-router-dom';

const Home = memo(() => {
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


