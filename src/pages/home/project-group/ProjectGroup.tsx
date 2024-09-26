import React, {FC} from 'react';
import './ProjectGroup.less';
import {Input, Button, Pagination} from "antd";
import {Add} from "@icon-park/react";


interface IProps {
    // 在这里定义组件的props类型
}

const {Search} = Input;

const ProjectGroup: FC<IProps> = (props) => {
    // 在这里编写组件的逻辑和渲染内容

    const onKeyDown = () => {

    }

    const doSearch = () => {

    }

    const toggleNewGroupVisible = () => {

    }

    return (
        <div className="project-group-container">
            <div className="project-group-header">
                <Search placeholder="搜索项目" size={"middle"}
                        className={'project-list-search'}
                        onKeyDown={onKeyDown}
                        onSearch={doSearch}
                        style={{width: '100%'}}/>
                <Button size={'middle'} type={"text"} onClick={toggleNewGroupVisible}>
                    <Add style={{position: 'relative', top: 3, marginRight: 3}}/>创建项目</Button>
            </div>
            <div className="project-group-scroll">中间内容</div>
            <div className="project-group-footer">
                <Button size={'middle'} type={"text"} onClick={toggleNewGroupVisible}>
                    <Add style={{position: 'relative', top: 3, marginRight: 3}}/>项目分组管理</Button>
            </div>
        </div>
    );
};

export default ProjectGroup;
