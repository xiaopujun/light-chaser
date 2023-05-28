import React, {Component} from 'react';
import ConfigItem from "../../../lib/config-item/ConfigItem";
import Dialog from "../../../lib/lc-dialog/Dialog";
import headerStore from "../HeaderStore";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {Radio} from "antd";
import LcRadio from "../../../lib/lc-radio/LcRadio";

class ProjectHdItemImpl extends Component {

    onClose = () => {
        const {setProjectVisible} = headerStore;
        setProjectVisible(false);
    }

    render() {
        const {projectVisible} = headerStore;
        return (
            <Dialog title={'项目设置'} visible={projectVisible} onClose={this.onClose}>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <ConfigItem title={'项目名称'} contentStyle={{width: 120}}>
                        <UnderLineInput/>
                    </ConfigItem>
                    <ConfigItem title={'项目描述'} contentStyle={{width: 140}}>
                        <UnderLineInput/>
                    </ConfigItem>
                    <ConfigItem title={'项目状态'} contentStyle={{width: 190}}>
                        <LcRadio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>发布</Radio>
                            <Radio value={2}>封存</Radio>
                        </LcRadio>
                    </ConfigItem>
                    <ConfigItem title={'存储类型'} contentStyle={{width: 190}}>
                        <LcRadio>
                            <Radio value={0}>本地</Radio>
                            <Radio value={1}>服务端</Radio>
                        </LcRadio>
                    </ConfigItem>
                </div>
            </Dialog>
        );
    }
}

export default ProjectHdItemImpl;