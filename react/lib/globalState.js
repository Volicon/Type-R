import { useEffect } from 'react';
import { useForceUpdate } from './state';
export function useChanges(instance) {
    var forceUpdate = useForceUpdate();
    useEffect(function () {
        instance.onChanges(forceUpdate);
        return function () { return instance.offChanges(forceUpdate); };
    }, emptyArray);
}
var emptyArray = [];
//# sourceMappingURL=globalState.js.map