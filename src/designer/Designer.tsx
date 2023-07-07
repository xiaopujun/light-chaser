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
import DesignerFooter from "./footer/DesignerFooter";
import {loadDesigner} from "./LoadDesigner";
import {registerEventOnDesignerLoaded} from "./RegisterEvent";
import CompList from "./left/comp-list/CompList";
import compListStore from "./left/comp-list/CompListStore";
import {observer} from "mobx-react";

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
        const {visible} = compListStore;
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
                    <DesignerFooter/>
                </LcFoot>
                {visible && <CompList/>}
            </LcStructure>
        );
    }
}

export default observer(Designer);