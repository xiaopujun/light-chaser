import LeftMenus from "./designer-left-menus/LeftMenus";
import {observer} from "mobx-react";
import designerLeftStore from "./DesignerLeftStore";
import {ComponentList} from "./compoent-lib/ComponentList";
import './DesignerLeft.less';
import {LayerList} from "./layer-list/LayerList";
import {SourceList} from "./source-list/SourceList";
import {useEffect, useRef} from "react";

export const DesignerLeft: React.FC = observer(() => {

    const {key, setDesignerLeftRef} = designerLeftStore;
    const leftDomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setDesignerLeftRef(leftDomRef.current);
    }, []);

    return (
        <div className={'designer-left'} ref={leftDomRef}>
            <LeftMenus/>
            {key === 'components' && <ComponentList/>}
            {key === 'layer-list' && <LayerList/>}
            {key === 'source-list' && <SourceList/>}
        </div>
    );
})

export default DesignerLeft;