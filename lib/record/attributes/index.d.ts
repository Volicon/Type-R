import { eventsApi } from '../../object-plus';
export * from './any';
export * from './owned';
export * from './date';
export * from './basic';
export * from './shared';
export * from './updates';
export * from './attrDef';
import { AttributeType } from './any';
import { ConstructorsMixin } from './updates';
import { IOEndpoint } from '../../io-tools';
export interface ParseMixin {
    _parse?: (json: any) => object;
}
export interface RecordAttributesMixin extends ConstructorsMixin, ParseMixin {
    _attributes: AttributeDescriptors;
    _attributesArray: AttributeType[];
    properties: PropertyDescriptorMap;
    _toJSON(): any;
    _localEvents?: eventsApi.EventMap;
    _endpoints: {
        [name: string]: IOEndpoint;
    };
}
export interface AttributeDescriptors {
    [name: string]: AttributeType;
}
export default function (attributesDefinition: object, baseClassAttributes: AttributeDescriptors): RecordAttributesMixin;
export declare function createAttribute(spec: any, name: string): AttributeType;
export declare function createSharedTypeSpec(Constructor: Function, Attribute: typeof AttributeType): void;
