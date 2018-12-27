"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events_1 = require("type-r/events");
var mixins_1 = require("type-r/mixins");
exports.isProduction = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production', exports.logEvents = exports.isProduction ?
    ['error', 'info'] :
    ['error', 'warn', 'debug', 'info', 'log'];
var Logger = (function (_super) {
    tslib_1.__extends(Logger, _super);
    function Logger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.counter = {};
        return _this;
    }
    Logger.prototype.logToConsole = function (level, filter) {
        return this.on(level, function (topic, msg, props) {
            if (!filter || filter.test(topic)) {
                var args = ["[" + topic + "] " + msg];
                for (var name_1 in props) {
                    args.push("\n\t" + name_1 + ":", toString(props[name_1]));
                }
                console[level].apply(console, args);
            }
        });
    };
    Logger.prototype.throwOn = function (level, filter) {
        return this.on(level, function (topic, msg, props) {
            if (!filter || filter.test(topic)) {
                throw new Error("[" + topic + "] " + msg);
            }
        });
    };
    Logger.prototype.count = function (level, filter) {
        var _this = this;
        return this.on(level, function (topic, msg, props) {
            if (!filter || filter.test(topic)) {
                _this.counter[level] = (_this.counter[level] || 0) + 1;
            }
        });
    };
    Logger.prototype.on = function (a, b) {
        return _super.prototype.on.call(this, a, b);
    };
    Logger = tslib_1.__decorate([
        mixins_1.define
    ], Logger);
    return Logger;
}(events_1.Messenger));
exports.Logger = Logger;
var toString = typeof window === 'undefined' ?
    function (something) {
        if (something && typeof something === 'object') {
            var __inner_state__ = something.__inner_state__, value = __inner_state__ || something, isArray = Array.isArray(value);
            var body = isArray ? "[ length = " + value.length + " ]" : "{ " + Object.keys(value).join(', ') + " }";
            return something.constructor.name + ' ' + body;
        }
        return JSON.stringify(something);
    }
    : function (x) { return x; };
exports.logger = new Logger();
if (typeof console !== 'undefined') {
    for (var _i = 0, logEvents_1 = exports.logEvents; _i < logEvents_1.length; _i++) {
        var event_1 = logEvents_1[_i];
        exports.logger.logToConsole(event_1);
    }
}
exports.throwingLogger = new Logger();
exports.throwingLogger.throwOn('error').throwOn('warn');
exports.log = exports.logger.trigger.bind(exports.logger);
//# sourceMappingURL=index.js.map