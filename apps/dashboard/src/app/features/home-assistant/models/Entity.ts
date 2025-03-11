import { ServiceCall } from "./ServiceCall";
import { StateOptions } from "./StateOptions";

export interface Entity {
    entityId: string;
    type: string;
    icon?: string;
    lock?: boolean;
    name?: string;
    state?: string;
    stateOptions: StateOptions;
    service: ServiceCall
}