import React from 'react';
import './ProjectList.less';
import {message} from "antd";

import {CopyFilled, DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";
import EditorDesignerLoader from "../../../designer/loader/EditorDesignerLoader";
import {IProjectInfo, ProjectState, SaveType} from "../../../designer/DesignerType";
import AddNewProjectDialog, {NewProjectInfoType} from "../../list/AddNewProjectDialog";
import URLUtil from "../../../utils/URLUtil";
import Button from "../../../ui/button/Button";
import Dialog from "../../../ui/dialog/Dialog";
import Input from "../../../ui/input/Input";
import homeStore from "../HomeStore";
import operatorMap from "../../../framework/operate";

export const ProjectList: React.FC = () => {

    const [addDialog, setAddDialog] = React.useState(false);
    const [delDialog, setDelDialog] = React.useState(false);
    const [cloneDialog, setCloneDialog] = React.useState(false);
    const [addNewData, setAddNewData] = React.useState({});
    const [data, setData] = React.useState([]);
    let toBeDelId: string = '';
    let toBeCloneId: string = '';
    const {currentMenu} = homeStore;
    const saveType = currentMenu === 'local' ? SaveType.LOCAL : SaveType.SERVER;
    operatorMap[saveType].getProjectList().then((data: any) => {
        if (data && data.length > 0)
            setData(data);
    })

    const toggleNewProVisible = () => setAddDialog({addNewScreen: !addDialog});

    const onOk = (data: NewProjectInfoType) => {
        if (data.saveType === SaveType.SERVER) {
            //保存到服务器
            const project: IProjectInfo = {
                name: data.name,
                des: data.description,
                saveType: SaveType.SERVER,
            };
            EditorDesignerLoader.getInstance().operatorMap[SaveType.SERVER].createProject(project).then((id) => {
                console.log('create project success, id: ', id);
            });
        }
        // let urlParams = URLUtil.buildUrlParams({...data, ...{action: 'create'}});
        // this.setState({addNewScreen: false});
        // window.open(`/designer?${urlParams}`, '_blank');
    }

    const onCancel = () => setAddDialog(false);

    const operateHandler = (e: any) => {
        const {type, savetype} = e.target.dataset
        if (!type) return;
        let id = e.currentTarget.id;
        switch (type) {
            case 'edit':
                let params = URLUtil.buildUrlParams({
                    id: id,
                    action: 'edit'
                });
                window.open(`/designer?${params}`, '_blank');
                break;
            case 'show':
                window.open(`/view?id=${id}&saveType=${savetype}&action=view`, '_blank');
                break;
            case 'del':
                toBeDelId = id;
                setDelDialog(true);
                break;
            case 'clone':
                toBeCloneId = id;
                setCloneDialog(true);
                break;
        }
    }

    const cancelDel = () => setDelDialog(false);

    const confirmClone = (name: string) => {
        const operator = EditorDesignerLoader.getInstance().operatorMap[SaveType.LOCAL];
        operator.copyProject(this.toBeCloneId, name).then((id) => {
            //重新加载项目列表
            operator.getProjectList().then((simpleInfoList: any) => {
                setData(simpleInfoList);
                setCloneDialog(false);
                message.success('克隆成功');
            })
        });
    }

    const cancelClone = () => setCloneDialog(false);

    const confirmDel = () => {
        operatorMap[SaveType.LOCAL].deleteProject(this.toBeDelId);
        let {data} = this.state;
        data = data.filter((item: any) => item.id !== this.toBeDelId);
        setDelDialog(false);
        setData(data);
    }

    let width = (window.innerWidth - 230 - (5 * 20)) / 5;
    let height = width * (9 / 16);
    return (
        <>
            <div className={'project-list'}>
                <div style={{width: width, height: height, margin: '0 20px 20px 0'}}>
                    <Button onClick={toggleNewProVisible}
                            style={{width: width, height: height, fontSize: 20}}>+ 新建项目</Button>
                </div>
                {data && data.map((item: any) => {
                    let stateText, stateColor;
                    if (item.state === ProjectState.DRAFT) {
                        stateText = '草稿';
                        stateColor = '#FFB800';
                    } else if (item.state === ProjectState.PUBLISH) {
                        stateText = '已发布';
                        stateColor = '#00CC66';
                    }
                    return (
                        <div key={item.id + ''}
                             style={{
                                 width: width,
                                 height: height,
                                 // backgroundImage: bgImgUrl && `url(${bgImgUrl})`,
                             }}
                             onClick={operateHandler}
                             id={item.id + ''}
                             className={'project-item'}>
                            <div className={'pro-list-content'} style={{zIndex: 1}}>
                                <div className={'pro-content-title'}>{item?.name}</div>
                                <div className={'pro-content-operates'}>
                                    <div className={'operate-item'} data-type={'edit'}>
                                        <EditFilled/>
                                    </div>
                                    <div className={'operate-item'} data-type={'show'}
                                         data-savetype={item.saveType}><EyeFilled/>
                                    </div>
                                    <div className={'operate-item'} data-type={'del'}>
                                        <DeleteFilled/>
                                    </div>
                                    <div className={'operate-item'} data-type={'clone'}>
                                        <CopyFilled/>
                                    </div>
                                </div>
                            </div>
                            <div className={'pro-content-footer'}>
                                <div className={'state-point'} style={{backgroundColor: stateColor}}/>
                                <div className={'state-text'}
                                     style={{color: stateColor}}>{stateText}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <AddNewProjectDialog onOk={onOk} onCancel={onCancel} visible={addDialog}/>
            <DeleteDialog visible={delDialog} onOk={confirmDel} onCancel={cancelDel}/>
            <CloneDialog onOk={(name) => confirmClone(name)} onCancel={cancelClone}
                         visible={cloneDialog}/>
        </>
    );

}

export default ProjectList;


interface DelDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const DeleteDialog = (props: DelDialogProps) => {

    const {onOk, onCancel, visible} = props;

    return (
        <Dialog title={'删除确认'} visible={visible} onClose={onCancel}>
            <div style={{color: '#aeaeae', padding: 10}}>确定要删除该项目吗？</div>
            <div className={'del-pro-confirm'} style={{
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '2px solid #272b34',
                paddingTop: 5
            }}>
                <Button onClick={onOk}>确认</Button>
                <Button onClick={onCancel}>取消</Button>
            </div>
        </Dialog>
    )
}

interface CloneDialogProps {
    onOk: (cloneName: string) => void;
    onCancel: () => void;
    visible: boolean;
}

const CloneDialog = (props: CloneDialogProps) => {

    const {onOk, onCancel, visible} = props;

    let cloneName = "";

    const onSubmit = (event: any) => {
        console.log(cloneName)
        event.preventDefault();
        onOk(cloneName)
    }

    return (
        <Dialog title={'克隆项目'} visible={visible} onClose={onCancel}>
            <form onSubmit={onSubmit}>
                <Input label={'项目名称'} required={true} defaultValue={cloneName}
                       onChange={(name) => cloneName = name as string}/>
                <div className={'del-pro-confirm'} style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    borderTop: '2px solid #272b34',
                    paddingTop: 10
                }}>
                    <Button type={'submit'}>确认</Button>
                    <Button onClick={onCancel}>取消</Button>
                </div>
            </form>
        </Dialog>
    )
}