import {observer} from "mobx-react";
import designerLeftStore from "./DesignerLeftStore";
import './DesignerLeft.less';
import {useEffect, useRef} from "react";
import LeftMenus from "./designer-left-menus/LeftMenus.tsx";
import {ComponentList} from "./compoent-lib/ComponentList.tsx";
import LayerList from "./layer-list/LayerList.tsx";
import SourceList from "./source-list/SourceList.tsx";

export const DesignerLeft = observer(() => {

    const {menu, setDesignerLeftRef} = designerLeftStore;
    const leftDomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setDesignerLeftRef(leftDomRef.current);
    }, []);

    return (
        <div className={'designer-left'} ref={leftDomRef}>
            <LeftMenus/>
            {menu === 'components' && <ComponentList/>}
            {menu === 'layer-list' && <LayerList/>}
            {menu === 'source-list' && <SourceList/>}
        </div>
    );
})

export default DesignerLeft;