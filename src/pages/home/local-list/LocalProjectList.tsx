import {memo, useEffect} from "react";
import ProjectList from "../project-list/ProjectList";
import {SaveType} from "../../../designer/DesignerType";
import localCoverCache from "../../../framework/cache/LocalCoverCache";
import ProjectGroup from "../project-group/ProjectGroup";

const LocalProjectList = memo(() => {

    useEffect(() => {
        return () => {
            //卸载组件时，清理本地项目封面的图片缓存，释放内存
            localCoverCache.clearCoverCache();
        }
    }, []);

    return (
        <div style={{display:"flex"}}>
            <ProjectGroup/>
            <ProjectList saveType={SaveType.LOCAL}/>
        </div>
    )
})

export default LocalProjectList
