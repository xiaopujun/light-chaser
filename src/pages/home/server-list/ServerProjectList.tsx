import {memo} from "react";
import ProjectList from "../project-list/ProjectList";
import {SaveType} from "../../../designer/DesignerType";
import ProjectGroup from "../project-group/ProjectGroup";

const ServerProjectList = memo(() => {
    return (
        <div style={{display:"flex"}}>
            <ProjectGroup/>
            <ProjectList saveType={SaveType.SERVER}/>
        </div>
    )
})

export default ServerProjectList;
