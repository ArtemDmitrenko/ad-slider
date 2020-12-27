"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model/model");
const view_1 = __importDefault(require("./view/view"));
const presenter_1 = __importDefault(require("./presenter/presenter"));
function createAdslider(selector, userOptions) {
    const view = new view_1.default(selector);
    const model = new model_1.Model(userOptions);
    const presenter = new presenter_1.default(model, view);
}
exports.default = createAdslider;
createAdslider('.container', {
    limits: { min: 50, max: 150 },
    curValue: 50,
    showValueNote: true,
});
