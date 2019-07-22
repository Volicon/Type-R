import { useReducer, useRef, useEffect } from 'react'
import { Model, Collection, Transactional } from '@type-r/models'

// Use model as local component state. Update the component when model changes.
export function useModel( Ctor : typeof Model ) : Model {
    // Get the model instance.
    const placeholder = useRef( null ),
        instance = placeholder.current || ( placeholder.current = new Ctor() );

    useChangesAndDispose( instance );

    return instance;
}

export const useCollection = {
    of<M extends typeof Model>( Ctor : M ) : Collection<InstanceType<M>> {
        // Get the model instance.
        const placeholder = useRef( null ),
            instance = placeholder.current || ( placeholder.current = new ( Collection.of( Ctor ) )() );
    
        useChangesAndDispose( instance );
    
        return instance;
    },

    ofRefs<M extends typeof Model>( Ctor : M ) : Collection<InstanceType<M>> {
        // Get the model instance.
        const placeholder = useRef( null ),
            instance = placeholder.current || ( placeholder.current = new ( Collection.ofRefs( Ctor ) )() );
    
        useChangesAndDispose( instance );
    
        return instance;
    },

    subsetOf<C extends Collection>( collection : C ) : C {
        const placeholder = useRef( null ),
        instance = placeholder.current || ( placeholder.current = collection.createSubset([]) );

        useChangesAndDispose( instance );

        return instance;
    }
}

function useChangesAndDispose( instance : Transactional ){
    const forceUpdate = useForceUpdate();

    useEffect( () => {
        instance.onChanges( forceUpdate );
        return () => instance.dispose();
    }, emptyArray );
}

const emptyArray = [];

export function useForceUpdate(){
    return useReducer( transactionalUpdate, null )[ 1 ];
}

function transactionalUpdate( _changeToken : object, modelOrCollection : Transactional ){
    return ( modelOrCollection as any )._changeToken;
}
