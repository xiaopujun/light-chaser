import './DemoMain.less';
import "@amap/amap-jsapi-types";
import ProjectItem from "../pages/home/project-list/ProjectItem.tsx";


export default function Demo() {

    return (
        <ProjectItem id={'22'} name={'使得开发商积分'} doOperate={(id: string, type: string) => {
        }}
                     cover={'blob:http://localhost:5173/9fdc377b-540b-4fa2-a9fd-8d33b6b5735b'}/>
    );
}
