import * as tslib_1 from "tslib";
import { define } from 'type-r';
import { RestfulEndpoint } from './restful';
export function fetchModelIO(method, url, options) {
    return new ModelFetchEndpoint(method, url, options);
}
function notSupported(method) {
    throw new ReferenceError("Method " + method + " is not supported. modelFetchIO supports only model.fetch().");
}
var ModelFetchEndpoint = (function (_super) {
    tslib_1.__extends(ModelFetchEndpoint, _super);
    function ModelFetchEndpoint(method, constructUrl, options) {
        var _this = _super.call(this, '', options) || this;
        _this.method = method;
        _this.constructUrl = constructUrl;
        return _this;
    }
    ModelFetchEndpoint.prototype.list = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            notSupported('collection.fetch()');
            return [2];
        }); });
    };
    ModelFetchEndpoint.prototype.destroy = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            notSupported('model.destroy()');
            return [2];
        }); });
    };
    ModelFetchEndpoint.prototype.create = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            notSupported('model.save()');
            return [2];
        }); });
    };
    ModelFetchEndpoint.prototype.update = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            notSupported('model.save()');
            return [2];
        }); });
    };
    ModelFetchEndpoint.prototype.read = function (id, options, model) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.url = this.constructUrl(options.params, model);
                return [2, this.request(this.method, this.getRootUrl(model), options)];
            });
        });
    };
    ModelFetchEndpoint = tslib_1.__decorate([
        define
    ], ModelFetchEndpoint);
    return ModelFetchEndpoint;
}(RestfulEndpoint));
//# sourceMappingURL=fetchModel.js.map