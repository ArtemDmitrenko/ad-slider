"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Model = void 0;
var eventObserver_1 = require("../eventObserver/eventObserver");
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(options) {
        var _this = _super.call(this) || this;
        _this.limits = (options.limits) ? options.limits : { min: 0, max: 100 };
        _this.curValue = (options.curValue) ? options.curValue : 50;
        _this.showValueNote = (typeof options.showValueNote === 'boolean') ? options.showValueNote : true;
        return _this;
    }
    Model.prototype.setValue = function (value) {
        if (typeof value !== 'number') {
            throw new Error('Value must be a number');
        }
        else if (value < this.limits.min || value > this.limits.max) {
            throw new Error('Value must be in range of min and max limits');
        }
        this.curValue = value;
        // this.eventUpdateValue.broadcast(this.defValue);
    };
    Model.prototype.setLimits = function (values) {
        if (typeof values !== 'object') {
            throw new Error('Limits must be object');
        }
        else if (values.min >= values.max) {
            throw new Error('Min can not be more than Max');
        }
        this.limits = { min: values.min, max: values.max };
    };
    return Model;
}(eventObserver_1["default"]));
exports.Model = Model;
// constructor(options) {
//   this.limits = (options.limits) ? options.limits : { min: 0, max: 100 };
//   this.defValue = (options.defValue) ? options.defValue : 50;
//   this.showValueNote = (typeof options.showValueNote === 'boolean') ? options.showValueNote : true;
//   // Event to update value on handler when defvalue in Model is changed
//   this.eventUpdateValue = new EventObserver();
//   this.setValue(this.defValue);
//   this.setLimits(this.limits);
// }
//   getValueFromHandlerPos(data) {
//     this.defValue = Math.round(this.limits.min + (this.limits.max - this.limits.min) * (parseInt(data.newLeft, 10) / data.rightEdge));
//     this.eventUpdateValue.broadcast(this.defValue);
//   }
//   getHandlerPosFromValue(rightEdge) {
//     const newLeft = Math.round(rightEdge * (this.defValue - this.limits.min) / (this.limits.max - this.limits.min));
//     return newLeft;
//   }
