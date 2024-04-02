import React from "react";
import ProjectList from "../project-list/ProjectList";
import {SaveType} from "../../../designer/DesignerType";

const ServerProjectList: React.FC = () => {
    return (
        <ProjectList saveType={SaveType.SERVER}/>
    )
}

export default ServerProjectList;