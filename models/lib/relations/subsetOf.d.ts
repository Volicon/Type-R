import { Collection, CollectionConstructor, ElementsArg, CollectionOptions } from '../collection';
import { ChainableAttributeSpec, Record } from '../record';
import { CollectionReference } from './commons';
export declare function subsetOf<X extends CollectionConstructor<R>, R extends Record>(this: void, masterCollection: CollectionReference, T?: X): ChainableAttributeSpec<SubsetCollectionConstructor<R>>;
declare type subsetOfType = typeof subsetOf;
declare module "../collection" {
    namespace Collection {
        const subsetOf: subsetOfType;
    }
}
export interface SubsetCollection<M extends Record> extends Collection<M> {
    getModelIds(): string[];
    toggle(modelOrId: string | M, val: boolean): boolean;
    addAll(): M[];
    toggleAll(): M[];
    resolve(baseCollection: Collection<M>): this;
}
export interface SubsetCollectionConstructor<R extends Record = Record> {
    new (records?: ElementsArg<R> | string[], options?: CollectionOptions): SubsetCollection<R>;
    prototype: SubsetCollection<R>;
}
export {};
