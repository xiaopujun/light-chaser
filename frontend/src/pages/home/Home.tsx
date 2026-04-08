/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {memo, Suspense, useEffect, useMemo, useState} from 'react';
import './Home.less';
import {Outlet, useLocation} from 'react-router-dom';
import {HomeMenus} from "./menus/HomeMenus";
import Loading from "../../json-schema/ui/loading/Loading.tsx";
import logo from '../../images/logo.png';

const Home = memo(() => {
    const location = useLocation();
    const [routeStage, setRouteStage] = useState<'idle' | 'leaving' | 'entering'>('idle');

    useEffect(() => {
        const onLeave = () => {
            setRouteStage('leaving');
            window.setTimeout(() => {
                setRouteStage((current) => current === 'leaving' ? 'idle' : current);
            }, 220);
        };

        window.addEventListener('lc-home-route-leave', onLeave);
        return () => window.removeEventListener('lc-home-route-leave', onLeave);
    }, []);

    useEffect(() => {
        setRouteStage('entering');
        const timer = window.setTimeout(() => setRouteStage('idle'), 260);
        return () => window.clearTimeout(timer);
    }, [location.key]);

    const routeInnerClassName = useMemo(() => {
        if (routeStage === 'leaving') return 'home-route-inner is-leaving';
        if (routeStage === 'entering') return 'home-route-inner is-entering';
        return 'home-route-inner';
    }, [routeStage]);

    return (
        <div className="lc-home">
            <div className="home-left">
                <div className="home-side-card">
                    <div className="home-logo-container">
                        <div className="home-logo">
                            <img src={logo} alt="LIGHT CHASER"/>
                        </div>
                    </div>
                    <div className="lc-home-body-left">
                        <HomeMenus/>
                    </div>
                </div>
            </div>
            <div className="home-right">
                <div className="home-main-card">
                    <div className="home-content">
                        <div className="home-route">
                            <div key={location.key} className={routeInnerClassName}>
                                <Suspense fallback={<Loading/>}>
                                    <Outlet/>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default Home;

