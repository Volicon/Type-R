!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.localStorageIO={})}(this,function(t){"use strict";function e(t){function e(t){r=t}var o,n,r,i=new Promise(function(r,i){t(o=r,n=i,e)});return i.abort=function(){r?r(o,n):n(new Error("I/O Aborted"))},i}function o(t){return new n(t)}var n=function(){function t(t){this.key=t}return t.prototype.resolve=function(t){return e(function(e,o){setTimeout(function(){e(t)},0)})},t.prototype.reject=function(t){return e(function(e,o){setTimeout(function(){return o(t)},0)})},t.prototype.create=function(t,e){var o=this.index;return o.push(t.id=String(o[0]++)),this.index=o,this.set(t),this.resolve({id:t.id})},t.prototype.set=function(t){localStorage.setItem(this.key+"#"+t.id,JSON.stringify(t))},t.prototype.get=function(t){return JSON.parse(localStorage.getItem(this.key+"#"+t))},t.prototype.update=function(t,e,o){return e.id=t,this.set(e),this.resolve({})},t.prototype.read=function(t,e){var o=this.get(t);return o?this.resolve(o):this.reject("Not found")},t.prototype.destroy=function(t,e){return this.get(t)?(localStorage.removeItem(this.key+"#"+t),this.index=this.index.filter(function(e){return e!==t}),this.resolve({})):this.reject("Not found")},Object.defineProperty(t.prototype,"index",{get:function(){return JSON.parse(localStorage.getItem(this.key))||[0]},set:function(t){localStorage.setItem(this.key,JSON.stringify(t))},enumerable:!0,configurable:!0}),t.prototype.list=function(t){var e=this;return this.resolve(this.index.slice(1).map(function(t){return e.get(t)}))},t.prototype.subscribe=function(t){},t.prototype.unsubscribe=function(t){},t}();t.create=o,t.localStorageIO=o,t.LocalStorageEndpoint=n,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map