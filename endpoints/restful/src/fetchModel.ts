import { Model, define } from 'type-r';
import { RestfulFetchOptions, RestfulEndpoint, RestfulIOOptions, HttpMethod } from './restful';

export type ConstructUrl = ( params : { [ key : string ] : any }, model? : Model ) => string;

/**
 * Implement custom model.fetch() according to the given rules.
 * All other I/O methods are not supported, this is read-only model.
 * 
 * @param method HTTP Method to use
 * @param url template function to generate the URL
 * @param options options coming from `model.fetch( options )`
 */
export function fetchModelIO( method : HttpMethod, url : ConstructUrl, options? : RestfulFetchOptions ){
    return new ModelFetchEndpoint( method, url, options );
}

function notSupported( method ){
    throw new ReferenceError( `Method ${method} is not supported. modelFetchIO supports only model.fetch().` );
} 

@define class ModelFetchEndpoint extends RestfulEndpoint {
    constructor(
        public method : HttpMethod,
        public constructUrl : ConstructUrl,
        { mockData, ...options } : RestfulFetchOptions = {}
    ){
        super( '', mockData ? { mockData : [ mockData ], ...options } : options );
    }

    async list(){ notSupported( 'collection.fetch()') }
    async destroy(){ notSupported( 'model.destroy()') }
    async create(){ notSupported( 'model.save()') }
    async update(){ notSupported( 'model.save()') }

    async read( id, options : RestfulIOOptions, model : Model ){
        if( this.memoryIO ){
            return ( await this.memoryIO.list( options ) )[ 0 ];
        }
        else{
            this.url = this.constructUrl( options.params, model );
            return this.request( this.method, this.getRootUrl( model ), options );    
        }
    }
}