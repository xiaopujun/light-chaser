import React, {Component} from 'react';
import LcHeader from "../component/designer/structure/LcHeader";
import LcBody from "../component/designer/structure/LcBody";
import LcLeft from "../component/designer/structure/LcLeft";
import LcContent from "../component/designer/structure/LcContent";
import LcRight from "../component/designer/structure/LcRight";
import LcFoot from "../component/designer/structure/LcFoot";
import LcStructure from "../component/designer/structure/LcStructure";
import {Drawer} from "antd";

class StructureDemo extends Component {


    state = {
        structureContent: document.getElementsByTagName('body')[0]
    }

    componentDidMount() {
        let dom = document.getElementById('structureContent');
        this.setState({
            structureContent: dom
        })
    }

    render() {
        let {structureContent} = this.state;
        return (
            <LcStructure>
                <LcHeader/>
                <LcBody>
                    <LcLeft>
                        <div>列表</div>
                        <div style={{
                            position: "absolute",
                            top: '60px',
                            left: '60px',
                            backgroundColor: '#a3a3a3',
                            width: '300px',
                            height: 'calc(100% - 100px)'
                        }}>弹框
                        </div>
                    </LcLeft>
                    <LcContent>


                    </LcContent>
                    <LcRight/>
                </LcBody>
                <LcFoot/>
            </LcStructure>
        );
    }
}

export default StructureDemo;