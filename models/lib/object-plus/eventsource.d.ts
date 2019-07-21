export interface EventsDefinition {
    [events: string]: Function | string | boolean;
}
export declare class EventMap {
    handlers: EventDescriptor[];
    constructor(map?: EventsDefinition | EventMap);
    merge(map: EventMap): void;
    addEventsMap(map: EventsDefinition): void;
    bubbleEvents(names: string): void;
    addEvent(names: string, callback: Function | string | boolean): void;
    subscribe(target: {}, source: EventSource): void;
    unsubscribe(target: {}, source: EventSource): void;
}
export declare class EventDescriptor {
    name: string;
    callback: Function;
    constructor(name: string, callback: Function | string | boolean);
}
export interface HandlersByEvent {
    [name: string]: EventHandler;
}
export declare class EventHandler {
    callback: Callback;
    context: any;
    next: any;
    constructor(callback: Callback, context: any, next?: any);
}
export interface Callback extends Function {
    _callback?: Function;
}
export interface EventSource {
}
