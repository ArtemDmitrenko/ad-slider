"use strict";
// declare var $: any;
// var jquery = require("jquery");
// window.$ = window.jQuery = jquery;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model/model");
const view_1 = __importDefault(require("./view/view"));
const presenter_1 = __importDefault(require("./presenter/presenter"));
(function ($) {
    $.fn.adslider = function (userOptions) {
        this.each(() => {
            const view = new view_1.default(this[0]);
            const model = new model_1.Model(userOptions);
            const presenter = new presenter_1.default(model, view);
        });
        return this;
    };
}(jQuery));
