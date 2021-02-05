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
    $parent.append(this.$handler);
  }

  public getWidth(): number {
    const width: number = parseInt(getComputedStyle(this.$handler).width, 10);
    return width;
  }

  public setPos(value: number): void {
    this.$handler.style.left = `${value}px`;
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$handler.classList.add('adslider__handler_vertical');
    } else {
      this.$handler.classList.add('adslider__handler_horizontal');
    }
  }
}
