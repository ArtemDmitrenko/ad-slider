"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandlerView {
    constructor($parent) {
        this.render($parent);
    }
    render($parent) {
        this.$parent = $parent;
        this.$handler = document.createElement('div');
        this.$handler.classList.add('adslider__handler');
        $parent.append(this.$handler);
    }
    getWidth() {
        return this.$handler.offsetWidth;
    }
    setPos(value) {
        this.$handler.style.left = `${value}px`;
    }
}
exports.default = HandlerView;
