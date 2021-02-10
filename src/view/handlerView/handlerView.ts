export default class HandlerView {
  public $handler!: HTMLElement;

  private $parent!: HTMLElement;

  constructor($parent: HTMLElement) {
    this.render($parent);
  }

  private render($parent: HTMLElement): void {
    this.$parent = $parent;
    this.$handler = document.createElement('div');
    this.$handler.classList.add('adslider__handler');
    this.$parent.append(this.$handler);
  }

  public getLength(): number {
    let length: number;
    if (this.isVertical()) {
      length = parseInt(getComputedStyle(this.$handler).height, 10);
    } else {
      length = parseInt(getComputedStyle(this.$handler).width, 10);
    }
    return length;
  }

  public setPos(value: number): void {
    if (this.isVertical()) {
      this.$handler.style.bottom = `${value}px`;
    } else {
      this.$handler.style.left = `${value}px`;
    }
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$handler.classList.add('adslider__handler_vertical');
    } else {
      this.$handler.classList.add('adslider__handler_horizontal');
    }
  }

  private isVertical(): boolean {
    if (this.$handler.classList.contains('adslider__handler_vertical')) {
      return true;
    }
    return false;
  }
}
