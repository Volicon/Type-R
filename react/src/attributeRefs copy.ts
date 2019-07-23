import { Model, InferAttrs } from '@type-r/models'
import { StateRef } from 'valuelink'

Object.defineProperty( Model.prototype, '$', {
    get(){
        return this._attributeRefs || ( this._attributeRefs = new this.AttributeRefs( this ) )
    }
});

// Override Model.onDefine
const { onDefine } = Model;
Model.onDefine = function( this : typeof Model, definition, BaseClass ){
    onDefine.apply( this, arguments );

    const { prototype } = this;
    const { _attributesArray } = prototype as any;

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

class ModelAttrRef extends StateRef<any> {
    constructor( protected model : Model, protected attr : string ){
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

export type AttributesMixin<M extends { attributes : object }> = InferAttrs<M['attributes']> & { $ : StateRefs<InferAttrs<M['attributes']>>}
type StateRefs<T> = { [ K in keyof T ] : StateRef<T[K]>}
