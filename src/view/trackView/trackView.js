"use strict";
exports.__esModule = true;
var TrackView = /** @class */ (function () {
    function TrackView($parent) {
        this.render($parent);
    }
    TrackView.prototype.render = function ($parent) {
        this.$track = document.createElement('div');
        this.$track.classList.add('adslider__track');
        $parent.append(this.$track);
    };
    return TrackView;
}());
exports["default"] = TrackView;
