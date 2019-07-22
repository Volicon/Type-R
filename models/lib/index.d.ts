import { Mixable as Class } from '@type-r/mixture';
import { Record as Model } from './record';
export * from './collection';
export * from './io-tools';
export * from '@type-r/mixture';
export * from './record';
export * from './relations';
export * from './transactions';
export { Model, Class };
export declare const on: any, off: any, trigger: any, once: any, listenTo: any, stopListening: any, listenToOnce: any;
export declare function transaction<F extends Function>(method: F): F;