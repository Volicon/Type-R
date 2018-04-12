import { setAttribute } from './updates';
import { tools } from '../../object-plus';
import { getBaseClass } from '../../object-plus/tools';
var _metatypes = new Map();
var notEqual = tools.notEqual, assign = tools.assign;
var emptyOptions = {};
var AttributeType = (function () {
    function AttributeType(name, a_options) {
        this.name = name;
        this.getHook = null;
        this.options = a_options;
        var options = assign({ getHooks: [], transforms: [], changeHandlers: [] }, a_options);
        options.getHooks = options.getHooks.slice();
        options.transforms = options.transforms.slice();
        options.changeHandlers = options.changeHandlers.slice();
        var value = options.value, type = options.type, parse = options.parse, toJSON = options.toJSON, changeEvents = options.changeEvents, validate = options.validate, getHooks = options.getHooks, transforms = options.transforms, changeHandlers = options.changeHandlers;
        this.value = value;
        this.type = type;
        if (!options.hasCustomDefault && type) {
            this.defaultValue = this.create;
        }
        else if (tools.isValidJSON(value)) {
            this.defaultValue = new Function("return " + JSON.stringify(value) + ";");
        }
        else {
            this.defaultValue = this.defaultValue;
        }
        this.propagateChanges = changeEvents !== false;
        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;
        this.validate = validate || this.validate;
        if (options.isRequired) {
            this.validate = wrapIsRequired(this.validate);
        }
        transforms.unshift(this.convert);
        this.parse = parse || this.parse;
        if (this.get)
            getHooks.unshift(this.get);
        this.initialize.call(this, options);
        if (getHooks.length) {
            var getHook_1 = this.getHook = getHooks.reduce(chainGetHooks);
            var validate_1 = this.validate;
            this.validate = function (record, value, key) {
                return validate_1.call(this, record, getHook_1.call(record, value, key), key);
            };
        }
        this.transform = transforms.length ? transforms.reduce(chainTransforms) : this.transform;
        this.handleChange = changeHandlers.length ? changeHandlers.reduce(chainChangeHandlers) : this.handleChange;
    }
    AttributeType.register = function () {
        var ctors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ctors[_i] = arguments[_i];
        }
        for (var _a = 0, ctors_1 = ctors; _a < ctors_1.length; _a++) {
            var Ctor = ctors_1[_a];
            _metatypes.set(Ctor, this);
        }
    };
    AttributeType.getFor = function (Ctor) {
        for (var BaseClass = Ctor; BaseClass; BaseClass = getBaseClass(BaseClass)) {
            var Attr_1 = _metatypes.get(BaseClass);
            if (Attr_1)
                return Attr_1;
        }
        return AttributeType;
    };
    AttributeType.create = function (options, name) {
        var AttributeCtor = options._attribute || this.getFor(options.type);
        return new AttributeCtor(name, options);
    };
    AttributeType.prototype.canBeUpdated = function (prev, next, options) { };
    AttributeType.prototype.transform = function (next, prev, model, options) { return next; };
    AttributeType.prototype.convert = function (next, prev, model, options) { return next; };
    AttributeType.prototype.isChanged = function (a, b) {
        return notEqual(a, b);
    };
    AttributeType.prototype.handleChange = function (next, prev, model, options) { };
    AttributeType.prototype.create = function () { return void 0; };
    AttributeType.prototype.clone = function (value, record) {
        return value;
    };
    AttributeType.prototype.dispose = function (record, value) {
        this.handleChange(void 0, value, record, emptyOptions);
    };
    AttributeType.prototype.validate = function (record, value, key) { };
    AttributeType.prototype.toJSON = function (value, key) {
        return value && value.toJSON ? value.toJSON() : value;
    };
    AttributeType.prototype.createPropertyDescriptor = function () {
        var _a = this, name = _a.name, getHook = _a.getHook;
        if (name !== 'id') {
            return {
                set: function (value) {
                    setAttribute(this, name, value);
                },
                get: (getHook ?
                    function () {
                        return getHook.call(this, this.attributes[name], name);
                    } :
                    function () { return this.attributes[name]; })
            };
        }
    };
    AttributeType.prototype.initialize = function (name, options) { };
    AttributeType.prototype.doInit = function (value, record, options) {
        var v = value === void 0 ? this.defaultValue() : value, x = this.transform(v, void 0, record, options);
        this.handleChange(x, void 0, record, options);
        return x;
    };
    AttributeType.prototype.doUpdate = function (value, record, options, nested) {
        var name = this.name, attributes = record.attributes, prev = attributes[name];
        var next = this.transform(value, prev, record, options);
        attributes[name] = next;
        if (this.isChanged(next, prev)) {
            this.handleChange(next, prev, record, options);
            return true;
        }
        return false;
    };
    AttributeType.prototype._log = function (level, text, value, record) {
        tools.log(level, "[Attribute Update Error] " + record.getClassName() + "." + this.name + ": " + text, {
            'Record': record,
            'Attribute definition': this,
            'Prev. value': record.attributes[this.name],
            'New value': value
        });
    };
    AttributeType.prototype.defaultValue = function () {
        return this.value;
    };
    return AttributeType;
}());
export { AttributeType };
function chainGetHooks(prevHook, nextHook) {
    return function (value, name) {
        return nextHook.call(this, prevHook.call(this, value, name), name);
    };
}
function chainTransforms(prevTransform, nextTransform) {
    return function (next, prev, record, options) {
        return nextTransform.call(this, prevTransform.call(this, next, prev, record, options), prev, record, options);
    };
}
function chainChangeHandlers(prevHandler, nextHandler) {
    return function (next, prev, record, options) {
        prevHandler.call(this, next, prev, record, options);
        nextHandler.call(this, next, prev, record, options);
    };
}
function wrapIsRequired(validate) {
    return function (record, value, key) {
        return value ? validate.call(this, record, value, key) : 'Required';
    };
}
//# sourceMappingURL=any.js.map