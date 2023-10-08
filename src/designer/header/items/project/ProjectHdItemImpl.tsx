import React, {Component} from 'react';
import ConfigItem from "../../../../lib/lc-config-item/ConfigItem";
import Dialog from "../../../../lib/lc-dialog/Dialog";
import headerStore from "../../HeaderStore";
import UnderLineInput from "../../../../lib/lc-input/UnderLineInput";
import Radio from "../../../../lib/lc-radio/Radio";
import LcButton from "../../../../lib/lc-button/LcButton";
import './ProjectHdItemImpl.less';
import designerStore from "../../../store/DesignerStore";
import {ProjectConfig, ProjectState} from "../../../DesignerType";

class ProjectHdItemImpl extends Component {

    config: ProjectConfig | null = null;

    constructor(props: any) {
        super(props);
        const {projectConfig} = designerStore;
        //使用副本而不是原对象
        this.config = {...projectConfig};
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
        const {updateProjectConfig} = designerStore;
        console.log(this.config)
        updateProjectConfig(this.config!);
        this.onClose();
    }

    render() {
        const {projectVisible} = headerStore;
        const {name, des, state, saveType} = this.config!;
        return (
            <Dialog title={'项目设置'} className={'lc-header-project-set'} visible={projectVisible} onClose={this.onClose}>
                <form onSubmit={this.doSave}>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <ConfigItem title={'项目名称'} contentStyle={{width: 120}}>
                            <UnderLineInput defaultValue={name}
                                            onChange={(event) => this.config!.name = event.target.value}
                                            required={true} maxLength={20}/>
                        </ConfigItem>
                        <ConfigItem title={'项目描述'} contentStyle={{width: 140}}>
                            <UnderLineInput defaultValue={des}
                                            onChange={(event) => this.config!.des = event.target.value}
                                            maxLength={60}/>
                        </ConfigItem>
                        <ConfigItem title={'项目状态'} contentStyle={{width: 190}}>
                            <Radio onChange={value => this.config!.state = value as ProjectState}
                                   defaultValue={state} options={[
                                {label: '草稿', value: ProjectState.DRAFT},
                                {label: '发布', value: ProjectState.PUBLISH},
                                {label: '封存', value: ProjectState.SEALED}
                            ]}/>
                        </ConfigItem>
                        <ConfigItem title={'存储类型'} contentStyle={{width: 190}}>
                            <div style={{color: '#c6c9cd'}}>{saveType === '0' ? '本地(local)' : '服务端(server)'}</div>
                        </ConfigItem>
                    </div>
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