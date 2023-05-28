import React, {Component} from 'react';
import ConfigItem from "../../../lib/config-item/ConfigItem";
import Dialog from "../../../lib/lc-dialog/Dialog";
import headerStore from "../HeaderStore";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import Radio from "../../../lib/lc-radio/Radio";

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
                        <Radio options={[
                            {label: '草稿', value: '0'},
                            {label: '发布', value: '1'},
                            {label: '封存', value: '2'}
                        ]}/>
                    </ConfigItem>
                    <ConfigItem title={'存储类型'} contentStyle={{width: 190}}>
                        <Radio options={[
                            {label: '本地', value: '0'},
                            {label: '服务端', value: '1'},
                            {label: '封存', value: '2'}
                        ]}/>
                    </ConfigItem>
                </div>
            </Dialog>
        );
    }
}

export default ProjectHdItemImpl;