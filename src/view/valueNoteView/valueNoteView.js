"use strict";
exports.__esModule = true;
var ValueNoteView = /** @class */ (function () {
    function ValueNoteView(parent) {
        this.render(parent);
    }
    ValueNoteView.prototype.render = function (parent) {
        this.$note = document.createElement('div');
        this.$value = document.createElement('p');
        this.$note.classList.add('adslider__note');
        this.$value.classList.add('adslider__value');
        this.$note.append(this.$value);
        parent.append(this.$note);
    };
    ValueNoteView.prototype.alignRelHandler = function (handlerWidth) {
        this.$note.style.left = handlerWidth / 2 + 'px';
    };
    return ValueNoteView;
}());
exports["default"] = ValueNoteView;
