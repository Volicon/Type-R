import { useReducer, useRef, useEffect } from 'react';
import { Collection } from '@type-r/models';
export function useModel(Ctor) {
    var placeholder = useRef(null), instance = placeholder.current || (placeholder.current = new Ctor());
    useChangesAndDispose(instance);
    return instance;
}
export var useCollection = {
    of: function (Ctor) {
        var placeholder = useRef(null), instance = placeholder.current || (placeholder.current = new (Collection.of(Ctor))());
        useChangesAndDispose(instance);
        return instance;
    },
    ofRefs: function (Ctor) {
        var placeholder = useRef(null), instance = placeholder.current || (placeholder.current = new (Collection.ofRefs(Ctor))());
        useChangesAndDispose(instance);
        return instance;
    },
    subsetOf: function (collection) {
        var placeholder = useRef(null), instance = placeholder.current || (placeholder.current = collection.createSubset([]));
        useChangesAndDispose(instance);
        return instance;
    }
};
function useChangesAndDispose(instance) {
    var forceUpdate = useForceUpdate();
    useEffect(function () {
        instance.onChanges(forceUpdate);
        return function () { return instance.dispose(); };
    }, emptyArray);
}
var emptyArray = [];
export function useForceUpdate() {
    return useReducer(transactionalUpdate, null)[1];
}
function transactionalUpdate(_changeToken, modelOrCollection) {
    return modelOrCollection._changeToken;
}
//# sourceMappingURL=state.js.map