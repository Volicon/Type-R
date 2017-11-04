!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.memoryIO={})}(this,function(t){"use strict";function e(t){function e(t){o=t}var n,i,o,r=new Promise(function(o,r){t(n=o,i=r,e)});return r.abort=function(){o?o(n,i):i(new Error("I/O Aborted"))},r}function n(t){return void 0===t&&(t=1e3),new i(t)}var i=function(){function t(t){this.delay=t,this.index=[0],this.items={}}return t.create=function(t){return void 0===t&&(t=1e3),new this(t)},t.prototype.resolve=function(t){var n=this;return e(function(e,i){setTimeout(function(){return e(t)},n.delay)})},t.prototype.reject=function(t){var n=this;return e(function(e,i){setTimeout(function(){return i(t)},n.delay)})},t.prototype.generateId=function(){return this.index[0]++},t.prototype.create=function(t,e){var n=t.id=this.generateId();return this.index.push(n),this.items[n]=t,this.resolve({id:n})},t.prototype.update=function(t,e,n){return this.items[t]?(this.items[t]=e,this.resolve({})):this.reject("Not found")},t.prototype.read=function(t,e){var n=this.items[t];return n?this.resolve(n):this.reject("Not found")},t.prototype.destroy=function(t,e){return this.items[t]?(delete this.items[t],this.index=this.index.filter(function(e){return e!==t}),this.resolve({})):this.reject("Not found")},t.prototype.list=function(t){return this.resolve(this.index)},t.prototype.subscribe=function(t){},t.prototype.unsubscribe=function(t){},t}();t.create=n,t.memoryIO=n,t.MemoryEndpoint=i,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
