export default class HandlerView {
  public $handler!: HTMLElement;

  private $parent!: HTMLElement;

  private handlerPos: number;

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

  public calcPos(options: { edge: number, value: number, limits: { min: number, max: number } }): void {
    this.handlerPos = options.edge * ((options.value - options.limits.min) / (options.limits.max - options.limits.min));
  }

  public setPos(): void {
    if (this.isVertical()) {
      this.$handler.style.bottom = `${this.handlerPos}px`;
    } else {
      this.$handler.style.left = `${this.handlerPos}px`;
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
