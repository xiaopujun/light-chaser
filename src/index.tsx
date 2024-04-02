import MainRouter from './router/MainRouter.tsx';
import {createRoot} from "react-dom/client";
import './index.less';

createRoot(document.getElementById('root')!).render(
    <MainRouter/>
);
