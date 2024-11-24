import {memo, Suspense} from 'react';
import './Home.less';
import {HomeMenus} from "./menus/HomeMenus";
import {Outlet} from 'react-router-dom';
import Loading from "../../json-schema/ui/loading/Loading.tsx";
import logo from '../../images/logo.png';

const Home = memo(() => {
    return (
        <div className={'lc-home'}>
            <div className={'lc-home-header'}>
                <div className={'logo'}><img style={{width: '70%'}} src={logo} alt={'logo'}/></div>
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


