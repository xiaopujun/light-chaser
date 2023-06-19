import {HandlerMapping, TriggerType} from "./HotKey";
import {doScale} from "../scale/Scale";

export const operateEventMapping: HandlerMapping = {
    'alt + wheel': {
        handler: doScale,
        triggerType: TriggerType.COILED
    },
}