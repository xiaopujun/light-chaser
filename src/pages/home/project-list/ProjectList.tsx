import React, {useEffect, useRef} from 'react';
import './ProjectList.less';
import {message} from "antd";

import {CopyFilled, DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";
import {ProjectState, SaveType} from "../../../designer/DesignerType";
import {AddNewProjectDialog, INewProjectInfo} from "./AddNewProjectDialog";
import URLUtil from "../../../utils/URLUtil";
import Button from "../../../ui/button/Button";
import Dialog from "../../../ui/dialog/Dialog";
import operatorMap from "../../../framework/operate";

export interface ProjectListProps {
    saveType: SaveType;
}

export const ProjectList: React.FC<ProjectListProps> = (props) => {

    const [addDialog, setAddDialog] = React.useState(false);
    const [delDialog, setDelDialog] = React.useState(false);
    const [cloneDialog, setCloneDialog] = React.useState(false);
    const [data, setData] = React.useState([]);
    let delIdRef = useRef<string>("");
    let cloneIdRef = useRef<string>("");

    useEffect(() => {
        getProjectList();
    }, []);

    const toggleNewProVisible = () => setAddDialog(!addDialog);

    const onOk = (data: INewProjectInfo) => {
        const {saveType} = props;
        operatorMap[saveType].createProject(data).then((id) => {
            let urlParams = URLUtil.buildUrlParams({...data, ...{action: 'create', id}});
            setAddDialog(false);
            window.open(`/designer?${urlParams}`, '_blank');
            getProjectList();
        });
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
                delIdRef.current = id;
                setDelDialog(true);
                break;
            case 'clone':
                cloneIdRef.current = id;
                setCloneDialog(true);
                break;
        }
    }

    const cancelDel = () => setDelDialog(false);

    const confirmClone = () => {
        const {saveType} = props;
        operatorMap[saveType].copyProject(cloneIdRef.current).then((id) => {
            if (id) {
                setCloneDialog(false);
                getProjectList();
                message.success('克隆成功');
            }
        });
    }

    const cancelClone = () => setCloneDialog(false);

    const getProjectList = () => {
        const {saveType} = props;
        operatorMap[saveType].getProjectList().then((data: any) => setData(data));
    }

    const confirmDel = () => {
        const {saveType} = props;
        operatorMap[saveType].deleteProject(delIdRef.current).then((res) => {
            if (res) {
                setDelDialog(false);
                getProjectList();
            } else {
                message.error('删除失败');
            }
        });

    }

    return (
        <>
            <div className={'project-list'}>
                <div style={{width: '100%', height: '100%'}} className={'create-new-btn'}>
                    <Button onClick={toggleNewProVisible}
                            style={{fontSize: 20, width: '100%', height: '100%'}}>+ 新建项目</Button>
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
                                         data-savetype={item.saveType}>
                                        <EyeFilled/>
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
            <CloneDialog onOk={() => confirmClone()} onCancel={cancelClone}
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
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const CloneDialog = (props: CloneDialogProps) => {

    const {onOk, onCancel, visible} = props;


    const onSubmit = (event: any) => {
        event.preventDefault();
        onOk()
    }

    return (
        <Dialog title={'克隆项目'} visible={visible} onClose={onCancel}>
            <div style={{color: '#a7a7a7', padding: 10}}>确认复制吗？</div>
            <div className={'del-pro-confirm'} style={{
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '2px solid #272b34',
                paddingTop: 10
            }}>
                <Button onClick={onSubmit}>确认</Button> &nbsp;&nbsp;
                <Button onClick={onCancel}>取消</Button>
            </div>
        </Dialog>
    )
}