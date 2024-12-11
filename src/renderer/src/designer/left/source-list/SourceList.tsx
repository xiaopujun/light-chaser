import './SourceList.less';
import {lazy, Suspense} from "react";
import Loading from "../../../json-schema/ui/loading/Loading.tsx";

const ImageSource = lazy(() => import('./image-source/ImageSource'));

export default function SourceList() {
    return <div className={'source-library'}>
        <div className={'source-categorize'}>
            <div className={'categorize-item'}>图片</div>
        </div>
        <div className={'source-library-content'}>
            <Suspense fallback={<Loading/>}>
                <ImageSource/>
            </Suspense>
        </div>
    </div>;
}
