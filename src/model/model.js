"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const eventObserver_1 = __importDefault(require("../eventObserver/eventObserver"));
class Model extends eventObserver_1.default {
    constructor(options) {
        super();
        this.limits = options.limits;
        this.curValue = options.curValue;
        this.showValueNote = true;
        this.init(options);
    }
    setLimits(limits) {
        if (limits.min >= limits.max) {
            throw new Error('Min can not be the same or more than Max');
        }
        this.limits = { min: limits.min, max: limits.max };
    }
    setValue(value) {
        if (value < this.limits.min || value > this.limits.max) {
            throw new Error('Value must be in range of min and max limits');
        }
        this.curValue = value;
    }
    setShowValueNote(value) {
        this.showValueNote = value;
    }
    init(options) {
        this.setLimits(options.limits);
        this.setValue(options.curValue);
        this.setShowValueNote(options.showValueNote);
    }
    setValueFromHandlerPos(data) {
        const value = Math.round(this.limits.min + (this.limits.max - this.limits.min) * (data.newLeft / data.rightEdge));
        this.setValue(value);
        this.broadcast(this.curValue);
    }
}
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
