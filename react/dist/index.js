!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("react"),require("@type-r/models")):"function"==typeof define&&define.amd?define(["exports","react","@type-r/models"],n):n((e=e||self).Nested={},e.React,e.Nested)}(this,function(e,t,u){"use strict";var n={of:function(e){var n=t.useRef(null),r=n.current||(n.current=new(u.Collection.of(e)));return o(r),r},ofRefs:function(e){var n=t.useRef(null),r=n.current||(n.current=new(u.Collection.ofRefs(e)));return o(r),r},subsetOf:function(e){var n=t.useRef(null),r=n.current||(n.current=e.createSubset([]));return o(r),r}};function o(e){var n=f();t.useEffect(function(){return e.onChanges(n),function(){return e.dispose()}},r)}var r=[];function f(){return t.useReducer(c,null)[1]}function c(e,n){return n._changeToken}var s=[];e.useChanges=function(e){var n=f();t.useEffect(function(){return e.onChanges(n),function(){return e.offChanges(n)}},s)},e.useCollection=n,e.useForceUpdate=f,e.useModel=function(e){var n=t.useRef(null),r=n.current||(n.current=new e);return o(r),r},Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
