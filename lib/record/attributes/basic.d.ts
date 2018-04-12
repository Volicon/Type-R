import { AttributeType } from './any';
import { AttributesContainer } from './updates';
import { TransactionOptions } from '../../transactions';
export declare class ImmutableClassType extends AttributeType {
    type: new (value?: any) => {};
    create(): {};
    convert(next: any): any;
    toJSON(value: any): any;
    clone(value: any): {};
    isChanged(a: any, b: any): boolean;
}
export declare class PrimitiveType extends AttributeType {
    type: NumberConstructor | StringConstructor | BooleanConstructor;
    dispose(): void;
    create(): string | number | boolean;
    toJSON(value: any): any;
    convert(next: any): any;
    isChanged(a: any, b: any): boolean;
    clone(value: any): any;
    doInit(value: any, record: AttributesContainer, options: TransactionOptions): any;
    doUpdate(value: any, record: any, options: any, nested: any): boolean;
    initialize(): void;
}
export declare class NumericType extends PrimitiveType {
    type: NumberConstructor;
    create(): number;
    convert(next: any, prev?: any, record?: any): any;
    validate(model: any, value: any, name: any): string;
}
declare global  {
    interface NumberConstructor {
        integer: Function;
    }
    interface Window {
        Integer: Function;
    }
}
export declare function Integer(x: any): number;
export declare class ArrayType extends AttributeType {
    toJSON(value: any): any;
    dispose(): void;
    create(): any[];
    convert(next: any, prev: any, record: any): any;
    clone(value: any): any;
}
export declare class ObjectType extends AttributeType {
    create(): {};
    convert(next: any, prev: any, record: any): any;
}
export declare function doNothing(): void;
export declare class FunctionType extends AttributeType {
    toJSON(value: any): any;
    create(): typeof doNothing;
    dispose(): void;
    convert(next: any, prev: any, record: any): any;
    clone(value: any): any;
}
