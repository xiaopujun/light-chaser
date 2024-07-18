import './ProjectItem.less';
import {Copy, Delete, Edit, PreviewOpen} from "@icon-park/react";
import {Input, Popover} from "antd";
import {useState} from "react";
import {IProjectInfo, SaveType} from "../../../designer/DesignerType.ts";
import operatorMap from "../../../framework/operate";

export interface ProjectItemProps {
    id: string;
    name: string;
    cover?: string;
    saveType: SaveType;
    doOperate: (id: string, type: string) => void;
}

export default function ProjectItem(props: ProjectItemProps) {
    const {cover, id, saveType, doOperate} = props;
    const [rename, setRename] = useState(false);
    const [name, setName] = useState(props.name);

    const updateName = () => {
        if (name !== props.name) {
            const data: IProjectInfo = {id, name};
            operatorMap[saveType].updateProject(data);
        }
    }

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
            <div className="project-item-content">
                <div className="project-name">
                    {rename ?
                        <Input className={'project-rename-input'} type="text" autoFocus={true} value={name}
                               onBlur={() => {
                                   setRename(false);
                                   updateName();
                               }}
                               onKeyDown={(event) => {
                                   if (event.key === 'Enter') {
                                       setRename(false);
                                       updateName();
                                   }
                               }}
                               onChange={(event) => setName(event.target.value)}/> :
                        <div className="project-name-content">{name}</div>
                    }
                </div>
                <div className="rename-icon" onClick={() => setRename(true)}>
                    {rename || <Popover content={'重命名'}><Edit/></Popover>}
                </div>
            </div>
        </div>
    )
}