"use strict";
exports.__esModule = true;
var HandlerView = /** @class */ (function () {
    function HandlerView($parent) {
        this.render($parent);
    }
    HandlerView.prototype.render = function ($parent) {
        this.$parent = $parent;
        this.$handler = document.createElement('div');
        this.$handler.classList.add('adslider__handler');
        $parent.append(this.$handler);
    };
    HandlerView.prototype.setPos = function (pos) {
        this.$handler.style.left = (pos / this.$parent.offsetWidth) * 100 + '%';
    };
    HandlerView.prototype.getHandlerWidth = function () {
        return this.$handler.offsetWidth;
    };
    return HandlerView;
}());
exports["default"] = HandlerView;
