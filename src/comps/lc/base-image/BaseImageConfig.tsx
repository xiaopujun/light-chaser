import React, {useState} from "react";
import {ConfigType} from "../../../designer/right/ConfigType";
import BaseImage from "./BaseImage";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import Select from "../../../lib/lc-select/Select";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {Button, Upload} from "antd";
import {BaseImageComponentStyle} from "./BaseImageComponent";
import {UploadOutlined} from "@ant-design/icons";

export const BaseImageStyleConfig: React.FC<ConfigType<BaseImage>> = ({instance}) => {

    const [source, setSource] = useState("link");

    const beforeUpload = (file: any) => {
        const fileReader = new FileReader();
        //文件读取完毕后会的处理事件
        fileReader.onload = (event: any) => {
            const blob = new Blob([event.target.result], {type: file.type});
            const url = URL.createObjectURL(blob);
            instance.update({style: {src: url}});
            //todo 更换图片的时候要释放链接和内存的关联，可以提高部分性能
            // URL.revokeObjectURL(bgImgUrl);
        };
        //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
        fileReader.readAsArrayBuffer(file);
        return false;
    }

    return (
        <>
            <ConfigItem title={'图片来源'}>
                <Select options={[
                    {label: '在线', value: 'link'},
                    {label: '本地', value: 'local'}
                ]} defaultValue={"link"} onChange={(value => {
                    setSource(value);
                    instance.update({style: {source: value as BaseImageComponentStyle['source']}})
                })}/>
            </ConfigItem>
            {source === 'link' && <ConfigItem title={'图片链接'} contentStyle={{width: '80%'}}>
                <UnderLineInput type={"url"} onChange={(event) => instance.update({style: {src: event.target.value}})}/>
            </ConfigItem>}
            {source === 'local' && <div className={'lc-upload-content'}>
                <Upload showUploadList={false} listType={"picture"} beforeUpload={beforeUpload}>
                    <Button icon={<UploadOutlined/>}>上传图片</Button>
                </Upload>
            </div>}
        </>
    )
}
