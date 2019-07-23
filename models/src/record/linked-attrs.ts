import { Record } from './record'
import { ValueLink } from '@linked/value'

export function addAttributeLinks( Model : typeof Record ){
    const { prototype } = Model;
    const { _attributesArray } = prototype;

    const AttributeRefs = new Function('model', `
        this._model = model;
        ${ _attributesArray.map( ({ name }) => `this.$${name} = void 0; `).join( '\n' )}
    `)

    AttributeRefs.prototype.__ModelAttrRef = ModelAttrRef;

    for( let attr of _attributesArray ){
        const { name } = attr;
        
        Object.defineProperty( AttributeRefs.prototype, name, {
            get : new Function(`
                var x = this.$${name};
                return x && x.value === this._parent.${name} ?
                    x :
                    ( this.$${name} = new this.__ModelAttrRef( this._model, ${name} ) );
            `) as any
        });
    }

    ( prototype as any ).AttributeRefs = AttributeRefs;
}

export type LinkedAttributes<T> = {
    readonly [ K in keyof T ] : ValueLink<T[K]>
}

export class ModelAttrRef extends ValueLink<any> {
    constructor( protected model : Record, protected attr : string ){
        super( model[ attr ] );
    }

    set( x : any ){
        this.model[ this.attr ] = x;
    }

    _error : any

    get error(){
        return this._error || ( this._error = this.model.getValidationError( this.attr ) );
    }

    set error( x : any ){
        this._error = x;
    }
}