import { ServiceCall } from "./ServiceCall";
import { StateOptions } from "./StateOptions";

export interface HassEntity {
    attributes: Record<string, unknown>;
    context: object;
    entity_id: string;
    last_changed: string;
    last_updated: string;
    state: string;
}

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