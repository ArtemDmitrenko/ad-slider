"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrackView {
    constructor($parent) {
        this.render($parent);
    }
    render($parent) {
        this.$track = document.createElement('div');
        this.$track.classList.add('adslider__track');
        $parent.append(this.$track);
    }
    getLength() {
        return this.$track.offsetWidth;
    }
}
exports.default = TrackView;
