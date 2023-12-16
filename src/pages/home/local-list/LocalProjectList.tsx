import React from "react";
import ProjectList from "../project-list/ProjectList";
import {SaveType} from "../../../designer/DesignerType";

export const LocalProjectList: React.FC = () => {
    return (
        <ProjectList saveType={SaveType.LOCAL}/>
    )
}