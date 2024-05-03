import React, {memo, useEffect, useRef} from 'react';
import './ProjectList.less';
import {Card, Pagination} from "antd";
import defaultSnapshot from '../image/default-snapshot.jpg';

import {CopyFilled, DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";
import {DesignerMode, IPage, IProjectInfo, SaveType} from "../../../designer/DesignerType";
import {AddNewProjectDialog, INewProjectInfo} from "./AddNewProjectDialog";
import Button from "../../../json-schema/ui/button/Button";
import Dialog from "../../../json-schema/ui/dialog/Dialog";
import operatorMap from "../../../framework/operate";
import {globalMessage} from "../../../framework/message/GlobalMessage";
import Input from "../../../json-schema/ui/input/Input.tsx";
import {Copy, CopyOne, Delete, Edit, PreviewOpen} from "@icon-park/react";

export interface ProjectListProps {
    saveType: SaveType;
}

export const ProjectList = memo((props: ProjectListProps) => {
    const {saveType} = props;
    const [addDialog, setAddDialog] = React.useState(false);
    const [delDialog, setDelDialog] = React.useState(false);
    const [cloneDialog, setCloneDialog] = React.useState(false);
    const delIdRef = useRef<string>("");
    const cloneIdRef = useRef<string>("");
    const [pageData, setPageData] = React.useState<IPage<IProjectInfo>>({
        records: [],
        total: 0,
        current: 1,
        size: 24
    });

    const getProjectPageList = (current: number, size: number, searchValue?: string) => {
        operatorMap[saveType].getProjectInfoPageList({
            current,
            size,
            searchValue
        }).then((data: IPage<IProjectInfo>) => setPageData(data));
    }


    const toggleNewProVisible = () => setAddDialog(!addDialog);

    const onOk = (data: INewProjectInfo) => {
        const {name, des, width, height} = data;
        const project: IProjectInfo = {
            name: name,
            des: des,
            saveType: saveType,
            dataJson: JSON.stringify({canvasManager: {width, height}}),
        }
        operatorMap[saveType].createProject(project).then((id) => {
            if (id === "")
                globalMessage.messageApi?.error('创建失败');
            else {
                setAddDialog(false);
                window.open(`/designer?id=${id}&saveType=${saveType}&mode=${DesignerMode.EDIT}`, '_blank');
                getProjectPageList(pageData.current, pageData.size)
            }
        });
    }

    const onCancel = () => setAddDialog(false);

    const operateHandler = (id: string, type: string) => {
        switch (type) {
            case 'edit':
                window.open(`/designer?id=${id}&saveType=${saveType}&mode=${DesignerMode.EDIT}`, '_blank');
                break;
            case 'show':
                window.open(`/view?id=${id}&saveType=${saveType}&mode=${DesignerMode.VIEW}`, '_blank');
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
        operatorMap[saveType].copyProject(cloneIdRef.current).then((id) => {
            if (id !== "") {
                setCloneDialog(false);
                getProjectPageList(pageData.current, pageData.size);
                globalMessage.messageApi?.success('克隆成功');
            } else {
                globalMessage.messageApi?.error('克隆失败');
            }
        });
    }

    const cancelClone = () => setCloneDialog(false);

    const confirmDel = () => {
        operatorMap[saveType].deleteProject(delIdRef.current).then((res) => {
            if (res) {
                setDelDialog(false);
                getProjectPageList(pageData.current, pageData.size);
            } else {
                globalMessage.messageApi?.error('删除失败');
            }
        });

    }

    const pageChange = (page: number, size: number) => {
        operatorMap[saveType].getProjectInfoPageList({
            current: page,
            size: size
        }).then((data: IPage<IProjectInfo>) => setPageData(data));
    }

    const doSearch = (event: React.KeyboardEvent) => {
        if (event.key !== 'Enter')
            return;
        operatorMap[saveType].getProjectInfoPageList({
            current: pageData.current,
            size: pageData.size,
            searchValue: (event.target as HTMLInputElement).value
        }).then((data: IPage<IProjectInfo>) => setPageData(data));
    }

    useEffect(() => {
        getProjectPageList(pageData.current, pageData.size);
    }, []);

    return (
        <div className={'project-list-container'}>
            <div className={'project-list-header'}>
                <div className={'project-list-header-left'}>
                    <Input className={'list-search'} placeholder={'搜索项目'} onKeyDown={doSearch}/>
                </div>
                <div className={'project-list-header-right'}>
                    <Button onClick={toggleNewProVisible}>+ 创建</Button>
                </div>
            </div>
            <div className={'project-list'}>
                {pageData && pageData.records.map((item: IProjectInfo, index) => {
                    return (
                        <div key={index} className={'project-item'}>
                            <Card style={{padding: 2}} cover={<div className={'project-cover'}
                                                                   style={{backgroundImage: `url(${item.cover || defaultSnapshot})`}}>
                                <div className={'project-info'}>
                                    {item.name}
                                </div>
                            </div>}
                                  bodyStyle={{padding: 0}}
                                  bordered={true}
                                  hoverable={true}
                                  size={'small'}
                                  actions={[
                                      <Edit key={'edit'} onClick={() => operateHandler(item.id!, "edit")}/>,
                                      <PreviewOpen key={'show'} onClick={() => operateHandler(item.id!, "show")}/>,
                                      <Delete key={'del'} onClick={() => operateHandler(item.id!, "del")}/>,
                                      <Copy key={'clone'} onClick={() => operateHandler(item.id!, "clone")}/>,
                                  ]}>
                            </Card>
                        </div>
                    )
                })}
            </div>
            <Pagination rootClassName={'project-list-page'} defaultCurrent={pageData?.current}
                        pageSize={pageData?.size} total={pageData?.total} onChange={pageChange}/>
            <AddNewProjectDialog onOk={onOk} onCancel={onCancel} visible={addDialog}/>
            <DeleteDialog visible={delDialog} onOk={confirmDel} onCancel={cancelDel}/>
            <CloneDialog onOk={() => confirmClone()} onCancel={cancelClone}
                         visible={cloneDialog}/>
        </div>
    );
})

export default ProjectList;


interface DelDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const DeleteDialog = memo((props: DelDialogProps) => {

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
                <Button onClick={onOk}>确认</Button>&nbsp;&nbsp;
                <Button onClick={onCancel}>取消</Button>
            </div>
        </Dialog>
    )
})

interface CloneDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const CloneDialog = (props: CloneDialogProps) => {

    const {onOk, onCancel, visible} = props;


    const onClick = (event: React.MouseEvent): void => {
        event.preventDefault();
        onOk();
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
                <Button onClick={onClick}>确认</Button> &nbsp;&nbsp;
                <Button onClick={onCancel}>取消</Button>
            </div>
        </Dialog>
    )
}