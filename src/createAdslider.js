"use strict";
exports.__esModule = true;
var model_1 = require("./model/model");
var view_1 = require("./view/view");
var presenter_1 = require("./presenter/presenter");
function createAdslider(selector, userOptions) {
    var view = new view_1["default"](selector);
    var model = new model_1.Model(userOptions);
    var presenter = new presenter_1["default"](model, view);
}
exports["default"] = createAdslider;
createAdslider('.container', {
    limits: { min: 50, max: 150 },
    curValue: 100,
    showValueNote: true
});
