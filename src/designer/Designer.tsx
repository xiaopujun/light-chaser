import React, {Component} from 'react';
import DesignerCanvas from "./canvas/DesignerCanvas";
import DesignerHeader from "./header/DesignerHeader";
import LcHeader from "./structure/LcHeader";
import LcBody from "./structure/LcBody";
import LcLeft from "./structure/LcLeft";
import LcContent from "./structure/LcContent";
import LcRight from "./structure/LcRight";
import LcStructure from "./structure/LcStructure";
import LcFoot from "./structure/LcFoot";
import DesignerLeft from "./left";
import Right from "./right";
import Footer from "./footer/Footer";
import {loadDesigner} from "./LoadDesigner";
import {registerEventOnDesignerLoaded} from "./RegisterEvent";
import FloatConfigs from "./float-configs/FloatConfigs";

class Designer extends Component<any> {

    constructor(props: any) {
        super(props);
        //加载设计器
        loadDesigner();
    }

    componentDidMount() {
        //注册设计器加载完成事件
        registerEventOnDesignerLoaded();
    }

    render() {
        return (
            <LcStructure>
                <LcHeader>
                    <DesignerHeader/>
                </LcHeader>
                <LcBody>
                    <LcLeft><DesignerLeft/></LcLeft>
                    <LcContent><DesignerCanvas/></LcContent>
                    <LcRight><Right/></LcRight>
                </LcBody>
                <LcFoot>
                    <Footer/>
                </LcFoot>
                <FloatConfigs/>
            </LcStructure>
        );
    }
}

export default Designer;