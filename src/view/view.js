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
var handlerView_1 = require("./handlerView/handlerView");
var trackView_1 = require("./trackView/trackView");
var valueNoteView_1 = require("./valueNoteView/valueNoteView");
var eventObserver_1 = require("../eventObserver/eventObserver");
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(selector) {
        var _this = _super.call(this) || this;
        _this.render(selector);
        return _this;
        // this.valueNote._alignRelHandler(this.handler._getHandlerWidth());
        // this.handler._setMovePosition(this.track.$track);
        // When position of handler is changing - valueNote is changing position too
        // this.handler.eventMousemove.addObserver(this.valueNote._setPosition.bind(this.valueNote));
    }
    View.prototype.render = function (selector) {
        this.$el = document.querySelector(selector);
        if (!this.$el) {
            throw new Error('You do not have this selector in your DOM');
        }
        this.$adslider = document.createElement('div');
        this.$adslider.classList.add('adslider');
        this.$el.append(this.$adslider);
        this.trackView = new trackView_1["default"](this.$adslider);
        this.handlerView = new handlerView_1["default"](this.trackView.$track);
        this.valueNoteView = new valueNoteView_1["default"](this.$adslider);
    };
    View.prototype.getRightEdge = function () {
        var rightEdge = this.trackView.getLength() - this.handlerView.getHandlerWidth();
        return rightEdge;
    };
    View.prototype.setPosition = function (value, limits, rightEdge) {
        var handlerPos = rightEdge * (value - limits.min) / (limits.max - limits.min);
        this.handlerView.$handler.style.left = handlerPos + 'px';
        this.valueNoteView.$note.style.left = handlerPos + this.handlerView.getHandlerWidth() / 2 + 'px';
        this.valueNoteView.setValue(value);
    };
    return View;
}(eventObserver_1["default"]));
exports["default"] = View;
