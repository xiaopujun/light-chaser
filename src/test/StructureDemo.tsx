import React, {Component} from 'react';
import LcHeader from "../designer/structure/LcHeader";
import LcBody from "../designer/structure/LcBody";
import LcLeft from "../designer/structure/LcLeft";
import LcContent from "../designer/structure/LcContent";
import LcRight from "../designer/structure/LcRight";
import LcFoot from "../designer/structure/LcFoot";
import LcStructure from "../designer/structure/LcStructure";
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