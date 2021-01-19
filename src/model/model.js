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
        this.showValueNote = options.showValueNote;
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
    init(options) {
        this.setLimits(options.limits);
        this.setValue(options.curValue);
    }
    // Под вопросом, что этот метод должен быть в модели
    setValueFromHandlerPos(data) {
        const odds = this.limits.max - this.limits.min;
        const value = Math.round(this.limits.min + odds * (data.newLeft / data.rightEdge));
        this.setValue(value);
        this.broadcast('handlerMove', this.curValue);
    }
}
exports.Model = Model;
