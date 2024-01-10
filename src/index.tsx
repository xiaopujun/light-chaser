import MainRouter from './MainRouter';
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";
import './index.less';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <MainRouter/>
    </BrowserRouter>
);