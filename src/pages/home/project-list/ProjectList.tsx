import React, {memo, useEffect, useRef} from 'react';
import './ProjectList.less';
import {Input, Button, Pagination, Breadcrumb} from "antd";
import defaultSnapshot from '../image/default-snapshot.jpg';
import {DesignerMode, IPage, IProjectInfo, SaveType} from "../../../designer/DesignerType";
import {INewProjectInfo, NewProjectDialog} from "./NewProjectDialog.tsx";
import operatorMap from "../../../framework/operate";
import {globalMessage} from "../../../framework/message/GlobalMessage";
import DelProjectDialog from "./DelProjectDialog.tsx";
import CloneProjectDialog from "./CloneProjectDialog.tsx";
import ProjectItem from "./ProjectItem.tsx";
import {Add} from "@icon-park/react";

const {Search} = Input;

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

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key !== 'Enter')
            return;
        doSearch((event.target as any).value);
    }

    const doSearch = (value: string) => {
        operatorMap[saveType].getProjectInfoPageList({
            current: pageData.current,
            size: pageData.size,
            searchValue: value
        }).then((data: IPage<IProjectInfo>) => setPageData(data));
    }

    useEffect(() => {
        getProjectPageList(pageData.current, pageData.size);
    }, []);

    return (
        <div className={'project-list-container'}>
            <div className={'project-list-header'}>
                <div className={'project-list-header-left'}>
                    <Breadcrumb
                        items={[
                            {
                                title: '我的文件',
                            },
                            {
                                title: <a href="">宝洁有限公司</a>,
                            }
                        ]}
                    />
                </div>
                <div className={'project-list-header-right'}>
                    <Search placeholder="搜索大屏" size={"middle"}
                            className={'project-list-search'}
                            onKeyDown={onKeyDown}
                            onSearch={doSearch}
                            style={{width: 350}}/>
                    <span>&nbsp;</span>
                    <Button size={'middle'} type={"primary"} onClick={toggleNewProVisible}>
                        <Add style={{position: 'relative', top: 3, marginRight: 3}}/>新建大屏</Button>
                </div>
            </div>
            <div className={'project-list'}>
                {pageData && pageData.records.map((item: IProjectInfo, index) => {
                    return (
                        <ProjectItem key={item.id} id={item.id!} name={item.name!} cover={item.cover || defaultSnapshot}
                                     saveType={saveType}
                                     doOperate={operateHandler}/>
                    )
                })}
            </div>
            <Pagination rootClassName={'project-list-page'} defaultCurrent={pageData?.current}
                        pageSize={pageData?.size} total={pageData?.total} onChange={pageChange}/>
            <NewProjectDialog onOk={onOk} onCancel={onCancel} visible={addDialog}/>
            <DelProjectDialog visible={delDialog} onOk={confirmDel} onCancel={cancelDel}/>
            <CloneProjectDialog onOk={() => confirmClone()} onCancel={cancelClone}
                                visible={cloneDialog}/>
        </div>
    );
})

export default ProjectList;


