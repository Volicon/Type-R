import { callbackify } from 'util';

export interface IONode {
    _endpoint : IOEndpoint
    _ioPromise : IOPromise< this >
}

/**
 * JSON data service.
 */

export interface IOOptions {
    ioUpdate? : boolean
}

export interface CollectionFetchOptions extends IOOptions {
    filter? : string
    params? : object
}

/**
 * IOEndpoint is the JSON persistent service.
 */
export interface IOEndpoint {
    // List collection models.
    list?( options? : CollectionFetchOptions, collection? : any ) : Promise<any>

    // Custom collection methods.
    collection? : {
        [ method : string ] : ( ...args : any[] ) => Promise<any>
    }

    // CRUD model methods.
    create?( json : any, options? : IOOptions, record? : any ) : Promise<any>
    update?( id : string, json : any, options? : IOOptions, record? : any ) : Promise<any>
    read?( id : string, options? : IOOptions, record? : any ) : Promise<any>
    destroy?( id : string, options? : IOOptions, record? : any ) : Promise<any>

    // Custom model methods.
    model? : {
        [ method : string ] : ( id : string, ...args : any[] ) => Promise<any>
    }

    // Events
    on?( events : IOEvents, listener? : any ) : Promise<this>
    off?( events : IOEvents, listener? : any ) : this
}

export interface PersistentCollection {
    liveUpdates( value? : boolean ) : boolean
    fetch( options? : CollectionFetchOptions ) : Promise<this>
    endpointCall( name : string, ...args : any[] ) : Promise<any>
}

export interface PersistentModel {
    fetch( options? : IOOptions ) : Promise<this>
    save( options? : IOOptions ) : Promise<this>
    destroy( options? : IOOptions ) : Promise<this>
    endpointCall( name : string, ...args : any[] ) : Promise<any>
}

export interface IOEvents {
    updated?( json : any ) : void
    removed?( id : string ) : void
}

export function getOwnerEndpoint( self ) : IOEndpoint {
    // Check if we are the member of the collection...
    const { collection } = self;
    if( collection ){
        return getOwnerEndpoint( collection );
    }

    // Now, if we're the member of the model...
    if( self._owner ){
        const { _endpoints } = self._owner;
        return _endpoints && _endpoints[ self._ownerKey ];
    }
}

/**
 * Create abortable promise.
 * Adds `promise.abort()` function which rejects the promise by default
 * initialize() function takes third optional argument `abort : ( resolve, reject ) => void`,
 * which can be used to add custom abort handling.
 */
export class IOPromise<T> extends Promise<T> {
    constructor(
        initialize : (
            resolve : ( x : T ) => void,
            reject? : ( x : any ) => void,
            onAbort? : ( abort : () => void ) => void
        ) => void
    ){
        let abort : () => void;

        super(( resolve, reject ) =>{
            initialize( resolve, reject, fn => abort = fn );

            abort || ( abort = () => reject( new Error( "I/O aborted" ) ));
        });

        this.abort = abort;
    }

    abort(){}
}

//TODO: rejection mechanic without abort??
export function startIO( self : IONode, promise : IOPromise<any>, options : IOOptions, thenDo : ( json : any ) => any ) : IOPromise<any> {
    // Stop pending I/O first...
    abortIO( self );

    // Mark future update transaction as IO transaction.
    options.ioUpdate = true;

    self._ioPromise = promise
        .then( resp => {
            self._ioPromise = null;
    
            const result = thenDo ? thenDo( resp ) : resp;
                
            triggerAndBubble( self, 'sync', self, resp, options );
                
            return result;
        } )  
        .catch( err => {
            self._ioPromise = null;
            
            // Overlaps with a new `error` event.
            triggerAndBubble( self, 'error', self, err, options );
            
            throw err;
        } ) as IOPromise<any>;

    self._ioPromise.abort = promise.abort;

    return self._ioPromise;
}

export function abortIO( self : IONode ){
    if( self._ioPromise && self._ioPromise.abort ){
        self._ioPromise.abort();
        self._ioPromise = null;
    }
}

export function triggerAndBubble( eventSource, ...args ){
    eventSource.trigger.apply( eventSource, args );
    const { collection } = eventSource;
    collection && collection.trigger.apply( collection, args ); 
}