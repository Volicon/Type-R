import { Record } from './record';
import { ValueLink } from '@linked/value';
export declare function addAttributeLinks(Model: typeof Record): void;
export declare type LinkedAttributes<T> = {
    readonly [K in keyof T]: ValueLink<T[K]>;
};
export declare class ModelAttrRef extends ValueLink<any> {
    protected model: Record;
    protected attr: string;
    constructor(model: Record, attr: string);
    set(x: any): void;
    _error: any;
    error: any;
}
