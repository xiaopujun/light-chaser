import './ProjectItem.less';
import {Copy, Delete, Edit, PreviewOpen} from "@icon-park/react";
import {Popover} from "antd";

export interface ProjectItemProps {
    id: string;
    name: string;
    cover?: string;
    doOperate: (id: string, type: string) => void;
}

export default function ProjectItem(props: ProjectItemProps) {
    const {name, cover, id, doOperate} = props;

    return (
        <div className="project-list-item">
            <div className="project-item-cover" style={{backgroundImage: `url(${cover})`}}>
                <div className="operate-icon-list">
                    <div className="operate-icon"><Popover content={'编辑项目'}><Edit
                        onClick={() => doOperate(id, "edit")}/></Popover></div>
                    <div className="operate-icon"><Popover content={'预览项目'}><PreviewOpen
                        onClick={() => doOperate(id, "show")}/></Popover></div>
                    <div className="operate-icon"><Popover content={'删除项目'}><Delete
                        onClick={() => doOperate(id, "del")}/></Popover></div>
                    <div className="operate-icon"><Popover content={'复制项目'}><Copy
                        onClick={() => doOperate(id, "clone")}/></Popover></div>
                </div>
            </div>
            <div className="project-item-content">{name}</div>
        </div>
    )
}