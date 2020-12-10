export default class HandlerView {
  constructor(parent) {
    this.parent = parent;
    this._render();
  }
  _render() {
    this.$handler = document.createElement('div');
    this.$handler.classList.add('adslider__handler');
    this.parent.append(this.$handler);
  }
}