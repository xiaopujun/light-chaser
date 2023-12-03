import {Component} from 'react';
import Dialog from "../../../../ui/dialog/Dialog";
import headerStore from "../../HeaderStore";
import './ProjectHdItemImpl.less';
import designerStore from "../../../store/DesignerStore";
import {ProjectConfig, ProjectState} from "../../../DesignerType";
import {Grid} from "../../../../ui/grid/Grid";
import Input from "../../../../ui/input/Input";
import Radio from "../../../../ui/radio/Radio";
import Select from "../../../../ui/select/Select";
import Button from "../../../../ui/button/Button";

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
                        <Grid gridGap={'15px'} columns={2}>
                            <Input label={'项目名称'} required={true} maxLength={20} defaultValue={name}
                                   onChange={(name) => this.config!.name = name as string}/>
                            <Input label={'项目描述'} required={true} maxLength={60} defaultValue={des}
                                   onChange={(des) => this.config!.des = des as string}/>
                            <Radio label={'项目状态'} onChange={value => this.config!.state = value as ProjectState}
                                   gridColumn={'1/3'}
                                   defaultValue={state}
                                   options={[
                                       {label: '草稿', value: ProjectState.DRAFT},
                                       {label: '发布', value: ProjectState.PUBLISH},
                                       {label: '封存', value: ProjectState.SEALED}
                                   ]}/>
                            <Select label={'存储类型'} options={[{value: '1', label: '本地存储'}]} defaultValue={saveType}/>
                        </Grid>

                    </div>
                    <div className={'lc-header-project-footer'}>
                        <Button type={'submit'}>保存</Button>
                        <Button type={'button'} onClick={this.onClose}>取消</Button>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default ProjectHdItemImpl;