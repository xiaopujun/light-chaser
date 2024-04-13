import {memo} from "react";
import ProjectList from "../project-list/ProjectList";
import {SaveType} from "../../../designer/DesignerType";

const ServerProjectList = memo(() => {
    return (
        <ProjectList saveType={SaveType.SERVER}/>
    )
})

export default ServerProjectList;