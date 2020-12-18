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
        this.setMovePosition();
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
    View.prototype.setMovePosition = function () {
        var _this = this;
        this.handlerView.$handler.addEventListener('mousedown', function (e) {
            e.preventDefault();
            var shiftX = e.clientX - _this.handlerView.$handler.getBoundingClientRect().left;
            var mouseMove = function (e) {
                var newLeft = e.clientX - shiftX - _this.trackView.$track.getBoundingClientRect().left;
                var rightEdge = _this.getRightEdge();
                if (newLeft < 0) {
                    newLeft = 0;
                }
                else if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }
                _this.handlerView.$handler.style.left = newLeft + 'px';
                _this.valueNoteView.$note.style.left = newLeft + _this.handlerView.getHandlerWidth() / 2 + 'px';
                var data = { newLeft: newLeft, rightEdge: rightEdge };
                _this.broadcast(data);
            };
            function mouseUp() {
                document.removeEventListener('mouseup', mouseUp);
                document.removeEventListener('mousemove', mouseMove);
            }
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        });
        document.addEventListener('dragstart', function () { return false; });
    };
    return View;
}(eventObserver_1["default"]));
exports["default"] = View;
