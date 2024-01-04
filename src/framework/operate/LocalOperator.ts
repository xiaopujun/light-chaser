import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";
import localforage from "localforage";
import {AbstractOperator} from "./AbstractOperator";
import {cloneDeep} from "lodash";
import IdGenerate from "../../utils/IdGenerate";
import ObjectUtil from "../../utils/ObjectUtil";
import {globalMessage} from "../message/GlobalMessage";
import FileUtil from "../../utils/FileUtil";
import imageSourceCache from "../cache/ImageSourceCache";
import AbstractConvert from "../convert/AbstractConvert";
import DesignerLoaderFactory from "../../designer/loader/DesignerLoaderFactory";
import URLUtil from "../../utils/URLUtil";
import {IImageData} from "../../comps/lc/base-image/BaseImageComponent";

/**
 * 本地项目数据操作实现
 */
class LocalOperator extends AbstractOperator {

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
        //获取项目数据
        const dataJson = await localforage.getItem(id);
        if (!dataJson) return null;

        /**
         * 本地项目中所有涉及需要转换，缓存的数据都应该在加载项目数据的时候一次性完成，避免后续反复读取indexDB,同时做不必要的资源链接转换
         * 包括如下数据：
         * 1.图片资源数据
         */
        const imageHashList: string[] = await localforage.getItem('image-source-' + id) || [];
        for (const hash of imageHashList) {
            const imageInfo: IImageData | null = await localforage.getItem(hash);
            if (imageInfo) {
                const {blob, name} = imageInfo;
                const url = URL.createObjectURL(blob!);
                imageSourceCache.addCache(hash, {url, name, hash});
            }
        }
        const projectData = JSON.parse(dataJson as string) as ProjectDataType;
        const {elemConfigs} = projectData;
        const {convertMap} = DesignerLoaderFactory.getLoader();
        //特殊配置数据转换
        if (elemConfigs) {
            for (const item of Object.values(elemConfigs!)) {
                const {type} = item?.base;
                if (type && convertMap[type]) {
                    const convert = convertMap[type] as AbstractConvert;
                    await convert.convertBack(item);
                }
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

    public async uploadImage(file: File): Promise<IImageData | boolean> {
        return new Promise<IImageData | boolean>(resolve => {
            let url = null;
            FileUtil.getFileHash(file).then(hashCode => {
                if (imageSourceCache.isExistCache(hashCode)) {
                    url = imageSourceCache.getCache(hashCode)?.url;
                    if (url && url !== '')
                        resolve({url: url!, hash: hashCode});
                    else
                        resolve(false);
                } else {
                    //存入indexDB
                    const fileReader = new FileReader();
                    fileReader.onload = async (event: ProgressEvent<FileReader>) => {
                        const blob = new Blob([event.target!.result!], {type: file.type});
                        localforage.setItem(hashCode, {name: file.name, blob});
                        const {id} = URLUtil.parseUrlParams();
                        const imageSourceKey = "image-source-" + id;
                        const imageSourceMap: string[] = await localforage.getItem(imageSourceKey) || [];
                        imageSourceMap.push(hashCode);
                        localforage.setItem(imageSourceKey, imageSourceMap);
                        url = URL.createObjectURL(blob);
                        //设置图片缓存
                        imageSourceCache.addCache(hashCode, {url, name: file.name, hash: hashCode});
                        resolve({url, hash: hashCode});
                        //默认情况下，URL.createObjectURL(blob)创建的资源链接所关联的内存，默认生命周期是跟随页面的，页面关闭后，内存才会被释放。
                        //手动调用URL.revokeObjectURL可直接释放对应资源的内存空间，因此请适当合理的调用该方法
                        //URL.revokeObjectURL(bgImgUrl);
                    };
                    //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
                    fileReader.readAsArrayBuffer(file);
                }
            });
        });
    }

    /**
     * 对于本地项目，考虑到频繁通过URL.createObjectURL(blob)的方式创建图片资源链接。如果控制不好，会导致内存的浪费甚至内存泄漏
     * 说明：URL.createObjectURL(blob)创建的资源链接所关联的内存，默认生命周期是跟随页面的，页面关闭后，内存才会被释放。除非手动调用URL.revokeObjectURL释放内存
     *
     * 因此，对于本地项目，获取图片资源链接的方式为从缓存中获取。（在本地项目加载之初，会统一获取一次当前项目涉及到的所有图片资源，并将其全部转换为可访问的资源链接地址，放在缓存中）
     * 后续的操作都应该通过缓存获取本地的图片资源，而不是重新读取二进制数据再进行转换
     *
     * 其涉及的典型场景为：本地项目的资源库列表
     */
    getImageSourceList(projectId: string): Promise<IImageData[]> {
        return new Promise<IImageData[]>(resolve => {
            resolve(imageSourceCache.getAllImageCache());
        })
    }

}

export default LocalOperator;
