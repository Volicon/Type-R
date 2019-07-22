/// <reference types="react" />
import { Model, Collection, Transactional } from '@type-r/models';
export declare function useModel(Ctor: typeof Model): Model;
export declare const useCollection: {
    of<M extends typeof Model>(Ctor: M): Collection<InstanceType<M>>;
    ofRefs<M extends typeof Model>(Ctor: M): Collection<InstanceType<M>>;
    subsetOf<C extends Collection<Model>>(collection: C): C;
};
export declare function useForceUpdate(): import("react").Dispatch<Transactional>;
