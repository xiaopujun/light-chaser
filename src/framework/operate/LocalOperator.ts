import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";
import localforage from "localforage";
import {AbstractOperator, IImageData} from "./AbstractOperator";
import {cloneDeep} from "lodash";
import IdGenerate from "../../utils/IdGenerate";
import ObjectUtil from "../../utils/ObjectUtil";
import {globalMessage} from "../message/GlobalMessage";
import FileUtil from "../../utils/FileUtil";
import ImageCache from "../cache/ImageCache";
import AbstractConvert from "../convert/AbstractConvert";
import DesignerLoaderFactory from "../../designer/loader/DesignerLoaderFactory";

/**
 * 本地项目数据操作实现
 */
class LocalOperator extends AbstractOperator {
    getImageSourceList(projectId: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    public async uploadImage(file: File): Promise<IImageData | boolean> {
        return new Promise<IImageData | boolean>(resolve => {
            let url = null;
            FileUtil.getFileHash(file).then(hashCode => {
                if (ImageCache.isExistImageCache(hashCode)) {
                    url = ImageCache.getImageCache(hashCode);
                    if (!url && url !== '')
                        resolve({url: url!, hash: hashCode});
                    else
                        resolve(false);
                } else {
                    //存入indexDB
                    const fileReader = new FileReader();
                    fileReader.onload = (event: ProgressEvent<FileReader>) => {
                        const blob = new Blob([event.target!.result!], {type: file.type});
                        localforage.setItem(hashCode, blob);
                        url = URL.createObjectURL(blob);
                        //设置图片缓存
                        ImageCache.addImageCache(hashCode, url);
                        resolve({url, hash: hashCode});
                        //todo 更换图片的时候要释放链接和内存的关联，可以提高部分性能
                        // URL.revokeObjectURL(bgImgUrl);
                    };
                    //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
                    fileReader.readAsArrayBuffer(file);
                }
            });
        });
    }

    public async createProject(project: IProjectInfo): Promise<string> {
        //生成项目id
        project.id = IdGenerate.generateId();
        const projectData = project.dataJson;
        let list: IProjectInfo[] = await localforage.getItem('light-chaser-project-list') || [];
        project.dataJson = undefined;
        list.push(project);
        await localforage.setItem('light-chaser-project-list', list);
        await localforage.setItem(project.id, projectData);
        return Promise.resolve(project.id);
    }

    public async updateProject(project: IProjectInfo): Promise<void> {
        project = cloneDeep(project);
        const data = project.dataJson;
        delete project.dataJson;
        let list: IProjectInfo[] = await localforage.getItem('light-chaser-project-list') || [];
        const index = list.findIndex((item: IProjectInfo) => item.id === project.id);
        if (index === -1) {
            globalMessage.messageApi?.error('项目不存在');
            return;
        }
        const oldProject = list[index];
        project = ObjectUtil.merge(oldProject, project);
        list[index] = project;
        await localforage.setItem('light-chaser-project-list', list);
        if (data)
            await localforage.setItem(project.id!, data);
        globalMessage.messageApi?.success('保存成功');
    }

    public async deleteProject(id: string): Promise<boolean> {
        const list: IProjectInfo[] = await localforage.getItem('light-chaser-project-list') || [];
        const index = list.findIndex((item: IProjectInfo) => item.id === id);
        if (index === -1) return false;
        list.splice(index, 1);
        await localforage.setItem('light-chaser-project-list', list);
        await localforage.removeItem(id);
        return true;
    }

    public async getProjectData(id: string): Promise<ProjectDataType | null> {
        const dataJson = await localforage.getItem(id);
        if (!dataJson) return null;
        const projectData = JSON.parse(dataJson as string) as ProjectDataType;
        const {elemConfigs} = projectData;
        const {convertMap} = DesignerLoaderFactory.getLoader();
        for (const item of Object.values(elemConfigs!)) {
            const {type} = item?.base;
            if (type && convertMap[type]) {
                const convert = convertMap[type] as AbstractConvert;
                await convert.convertBack(item);
            }
        }
        return projectData;
    }

    public async getProjectInfoList(): Promise<IProjectInfo[]> {
        return await localforage.getItem('light-chaser-project-list') || [];
    }

    public async copyProject(id: string, name?: string): Promise<string> {
        const list: IProjectInfo[] = await localforage.getItem('light-chaser-project-list') || [];
        const index = list.findIndex((item: IProjectInfo) => item.id === id);
        if (index === -1) return '';
        const project = list[index];
        const newProject: IProjectInfo = cloneDeep(project);
        newProject.id = IdGenerate.generateId();
        newProject.name = name || newProject.name + '-副本';
        newProject.createTime = new Date().getTime() + '';
        newProject.updateTime = new Date().getTime() + '';
        list.push(newProject);
        await localforage.setItem('light-chaser-project-list', list);
        const dataJson = await localforage.getItem(id);
        if (dataJson)
            await localforage.setItem(newProject.id, dataJson);
        return newProject.id;
    }

}

export default LocalOperator;
