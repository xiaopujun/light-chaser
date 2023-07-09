import React, {Component} from 'react';
import ConfigItem from "../../../../lib/config-item/ConfigItem";
import Dialog from "../../../../lib/lc-dialog/Dialog";
import headerStore from "../../HeaderStore";
import UnderLineInput from "../../../../lib/lc-input/UnderLineInput";
import Radio from "../../../../lib/lc-radio/Radio";
import LcButton from "../../../../lib/lc-button/LcButton";
import './ProjectHdItemImpl.less';
import designerStore from "../../../store/DesignerStore";
import {ProjectConfig} from "../../../DesignerType";
import LcSwitch from "../../../../lib/lc-switch/LcSwitch";

class ProjectHdItemImpl extends Component {

    config: ProjectConfig | any = {}

    constructor(props: any) {
        super(props);
        const {projectConfig} = designerStore;
        this.config = projectConfig;
    }

    componentWillUnmount() {
        this.config = {};
    }

    onClose = () => {
        const {setProjectVisible} = headerStore;
        setProjectVisible(false);
    }

    doSave = (e: any) => {
        e.preventDefault();
        const {name, state, saveType} = this.config;
        if (name === '')
            alert('项目名称不能为空');
        if (state === '')
            alert('项目状态不能为空');
        if (saveType === '')
            alert('存储类型不能为空');
        const {updateProjectConfig} = designerStore;
        updateProjectConfig(this.config);
        this.onClose();
    }

    render() {
        const {projectVisible} = headerStore;
        const {projectConfig: {name, des, state, saveType, realTimeRefresh}} = designerStore;
        return (
            <Dialog title={'项目设置'} className={'lc-header-project-set'} visible={projectVisible} onClose={this.onClose}>
                <form onSubmit={this.doSave}>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <ConfigItem title={'项目名称'} contentStyle={{width: 120}}>
                            <UnderLineInput defaultValue={name} onChange={(value) => this.config.name = value}
                                            required={true} maxLength={20}/>
                        </ConfigItem>
                        <ConfigItem title={'项目描述'} contentStyle={{width: 140}}>
                            <UnderLineInput defaultValue={des} onChange={(value) => this.config.des = value}
                                            maxLength={60}/>
                        </ConfigItem>
                        <ConfigItem title={'项目状态'} contentStyle={{width: 190}}>
                            <Radio onChange={value => this.config.state = value} defaultValue={state} options={[
                                {label: '草稿', value: '0'},
                                {label: '发布', value: '1'},
                                {label: '封存', value: '2'}
                            ]}/>
                        </ConfigItem>
                        <ConfigItem title={'存储类型'} contentStyle={{width: 190}}>
                            <div style={{color: '#c6c9cd'}}>{saveType==='0'?'本地(local)':'服务端(server)'}</div>
                        </ConfigItem>
                        <ConfigItem title={'草稿状态数据实时刷新'} contentStyle={{width: 190}}>
                            <LcSwitch defaultValue={realTimeRefresh}
                                      onChange={value => this.config.realTimeRefresh = value}/>
                        </ConfigItem>
                    </div>
                    <p style={{padding: '5px 7px', color: '#989898'}}>说明：数据实时刷新开启后，草稿状态下组件数据也会根据配置实时更新</p>
                    <div className={'lc-header-project-footer'}>
                        <LcButton type={'submit'}>保存</LcButton>
                        <LcButton type={'button'} onClick={this.onClose}>取消</LcButton>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default ProjectHdItemImpl;