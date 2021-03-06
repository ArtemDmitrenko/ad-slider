export default class HandlerView {
  public $handler!: HTMLElement;

  private $parent!: HTMLElement;

  private handlerPos!: number;

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

  public getPos(): number {
    if (this.isVertical()) {
      return parseInt(getComputedStyle(this.$handler).bottom, 10);
    }
    return parseInt(getComputedStyle(this.$handler).left, 10);
  }

  public calcPos(options: {
    edge: number,
    value: number,
    limits: { min: number, max: number }
  }): void {
    const oddValMin: number = options.value - options.limits.min;
    const oddMaxMin: number = options.limits.max - options.limits.min;
    this.handlerPos = options.edge * (oddValMin / oddMaxMin);
  }

  public setPos(): void {
    if (this.isVertical()) {
      this.$handler.style.left = '';
      this.$handler.style.bottom = `${this.handlerPos}px`;
    } else {
      this.$handler.style.bottom = '';
      this.$handler.style.left = `${this.handlerPos}px`;
    }
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$handler.classList.remove('adslider__handler_horizontal');
      this.$handler.classList.add('adslider__handler_vertical');
    } else {
      this.$handler.classList.remove('adslider__handler_vertical');
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
