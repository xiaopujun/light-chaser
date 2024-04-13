import ReactDOM from "react-dom";
import {lazy, ReactElement, Suspense} from "react";
import Loading from "../../../../json-schema/ui/loading/Loading.tsx";

const BluePrint = lazy(() => import("../../../blueprint/BluePrint.tsx"));

export default function BluePrintHdImpl() {
    return ReactDOM.createPortal(
        <div style={{
            position: 'relative',
            top: -window.innerHeight,
            zIndex: 2,
            width: '100%',
            height: '100%',
            backgroundColor: '#151515'
        }}>
            <Suspense fallback={<Loading/>}>
                <BluePrint/>
            </Suspense>
        </div>, document.body)! as ReactElement;
}
