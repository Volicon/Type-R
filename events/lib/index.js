"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eventsApi = tslib_1.__importStar(require("./eventsource"));
exports.eventsApi = eventsApi;
var eventsource_1 = require("./eventsource");
exports.EventMap = eventsource_1.EventMap;
var mixins_1 = require("type-r/mixins");
var tools_1 = require("type-r/tools");
var strings = eventsApi.strings, on = eventsApi.on, off = eventsApi.off, once = eventsApi.once, trigger5 = eventsApi.trigger5, trigger2 = eventsApi.trigger2, trigger3 = eventsApi.trigger3;
var _idCount = 0;
function uniqueId() {
    return 'l' + _idCount++;
}
var Messenger = (function () {
    function Messenger() {
        this._events = void 0;
        this._listeningTo = void 0;
        this.cid = uniqueId();
        this.initialize.apply(this, arguments);
    }
    Messenger.onDefine = function (_a, BaseClass) {
        var localEvents = _a.localEvents, _localEvents = _a._localEvents, properties = _a.properties;
        if (localEvents || _localEvents) {
            var eventsMap = new eventsource_1.EventMap(this.prototype._localEvents);
            localEvents && eventsMap.addEventsMap(localEvents);
            _localEvents && eventsMap.merge(_localEvents);
            this.prototype._localEvents = eventsMap;
        }
        if (properties) {
            Object.defineProperties(this.prototype, tools_1.transform({}, properties, toPropertyDescriptor));
        }
    };
    Messenger.prototype.initialize = function () { };
    Messenger.prototype.on = function (events, callback, context) {
        if (typeof events === 'string')
            strings(on, this, events, callback, context);
        else
            for (var name_1 in events)
                strings(on, this, name_1, events[name_1], context || callback);
        return this;
    };
    Messenger.prototype.once = function (events, callback, context) {
        if (typeof events === 'string')
            strings(once, this, events, callback, context);
        else
            for (var name_2 in events)
                strings(once, this, name_2, events[name_2], context || callback);
        return this;
    };
    Messenger.prototype.off = function (events, callback, context) {
        if (!events)
            off(this, void 0, callback, context);
        else if (typeof events === 'string')
            strings(off, this, events, callback, context);
        else
            for (var name_3 in events)
                strings(off, this, name_3, events[name_3], context || callback);
        return this;
    };
    Messenger.prototype.trigger = function (name, a, b, c, d, e) {
        if (d !== void 0 || e !== void 0)
            trigger5(this, name, a, b, c, d, e);
        else if (c !== void 0)
            trigger3(this, name, a, b, c);
        else
            trigger2(this, name, a, b);
        return this;
    };
    Messenger.prototype.listenTo = function (source, a, b) {
        if (source) {
            addReference(this, source);
            source.on(a, !b && typeof a === 'object' ? this : b, this);
        }
        return this;
    };
    Messenger.prototype.listenToOnce = function (source, a, b) {
        if (source) {
            addReference(this, source);
            source.once(a, !b && typeof a === 'object' ? this : b, this);
        }
        return this;
    };
    Messenger.prototype.stopListening = function (a_source, a, b) {
        var _listeningTo = this._listeningTo;
        if (_listeningTo) {
            var removeAll = !(a || b), second = !b && typeof a === 'object' ? this : b;
            if (a_source) {
                var source = _listeningTo[a_source.cid];
                if (source) {
                    if (removeAll)
                        delete _listeningTo[a_source.cid];
                    source.off(a, second, this);
                }
            }
            else if (a_source == null) {
                for (var cid in _listeningTo)
                    _listeningTo[cid].off(a, second, this);
                if (removeAll)
                    (this._listeningTo = void 0);
            }
        }
        return this;
    };
    Messenger.prototype.dispose = function () {
        if (this._disposed)
            return;
        this.stopListening();
        this.off();
        this._disposed = true;
    };
    Messenger = tslib_1.__decorate([
        mixins_1.define,
        mixins_1.definitions({
            properties: mixins_1.mixinRules.merge,
            localEvents: mixins_1.mixinRules.merge
        })
    ], Messenger);
    return Messenger;
}());
exports.Messenger = Messenger;
exports.Events = tools_1.omit(Messenger.prototype, 'constructor', 'initialize');
function toPropertyDescriptor(x) {
    if (x) {
        return typeof x === 'function' ? { get: x, configurable: true } : x;
    }
}
function addReference(listener, source) {
    var listeningTo = listener._listeningTo || (listener._listeningTo = Object.create(null)), cid = source.cid || (source.cid = uniqueId());
    listeningTo[cid] = source;
}
//# sourceMappingURL=index.js.map