import React from 'react';
import './Home.less';
import {HomeMenus} from "./menus/HomeMenus";
import homeStore from "./HomeStore";
import {homePageMap} from "./index";
import {observer} from "mobx-react";
import Loading from "../../json-schema/ui/loading/Loading";

const Home: React.FC = observer(() => {
    const {currentMenu} = homeStore;
    const Content = homePageMap[currentMenu];
    return (
        <div className={'lc-home'}>
            <div className={'lc-home-header'}>
                <div className={'logo'}>LIGHT CHASER 控制台</div>
            </div>
            <div className={'lc-home-body'}>
                <div className={'lc-home-body-left'}><HomeMenus/></div>
                <div className={'lc-home-body-right'}>
                    <React.Suspense fallback={<Loading/>}>
                        {Content && <Content/>}
                    </React.Suspense>
                </div>
            </div>
        </div>
    );
})

export default Home;


