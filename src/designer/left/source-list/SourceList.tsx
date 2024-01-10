import './SourceList.less';
import {ImageSource} from "./image-source/ImageSource";

export const SourceList: React.FC = () => {
    return <div className={'source-library'}>
        <div className={'source-categorize'}>
            <div className={'categorize-item'}>图片</div>
        </div>
        <div className={'source-library-content'}>
            <ImageSource/>
        </div>
    </div>;
}
