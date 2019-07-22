import { useEffect } from 'react'
import { useForceUpdate } from './state'
import { Transactional } from '@type-r/models';

// Force component update when some global model or collection change.
export function useChanges( instance : Transactional ){
    const forceUpdate = useForceUpdate();

    useEffect( () => {
        instance.onChanges( forceUpdate );
        return () => instance.offChanges( forceUpdate );
    }, emptyArray );
}

const emptyArray = [];