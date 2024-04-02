import {createRoot} from "react-dom/client";
import './index.less';
import {lazy, Suspense} from "react";
import Loading from "./json-schema/ui/loading/Loading.tsx";

const MainRouter = lazy(() => import('./router/MainRouter.tsx'))

createRoot(document.getElementById('root')!).render(
    <Suspense fallback={<Loading/>}>
        <MainRouter/>
    </Suspense>
);
