import React from 'react';
import {PlusOutlined} from '@ant-design/icons';
import type {RcFile, UploadProps} from 'antd/es/upload';
import './UploadDemo.less';
import Dragger from "antd/es/upload/Dragger";

const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}


export default class UploadDemo extends React.Component<any, any> {
    state = {
        fileList: [],
        previewImage: '',
        previewTitle: '',
        file: null
    }

    uploadButton = (
        <div className={'lc-upload-button'}>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => this.setState({fileList: newFileList});

    beforeUpload = (file: any, fileList: any) => {
        getBase64(file as RcFile).then(value => {
            this.setState({file: value})
            return false;
        })
    }


    render() {
        console.log(this.state)
        return (
            <div className={'lc-bg-upload'}>
                {this.state.file ? <img alt={"bg"} width={'100%'} height={187} src={this.state.file}/> :
                    <Dragger listType={'picture-card'}
                             showUploadList={false}
                             beforeUpload={this.beforeUpload}
                             fileList={this.state.fileList}
                             onChange={this.handleChange}>
                        请上传背景图
                    </Dragger>}
            </div>
        );
    }
}