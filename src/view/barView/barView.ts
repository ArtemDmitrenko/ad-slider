export default class BarView {
  private $bar!: HTMLElement;

  private $parent!: HTMLElement;

  constructor($parent: HTMLElement) {
    this.render($parent);
  }

  private render($parent: HTMLElement): void {
    this.$parent = $parent;
    this.$bar = document.createElement('div');
    this.$bar.classList.add('adslider__bar');
    $parent.append(this.$bar);
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$bar.classList.add('adslider__bar_vertical');
    } else {
      this.$bar.classList.add('adslider__bar_horizontal');
    }
  }

  public setLength($handler: HTMLElement): void {
    let handlerPos: number;
    let handlerLength: number;
    if (this.$bar.classList.contains('adslider__bar_horizontal')) {
      handlerPos = parseInt(getComputedStyle($handler).left, 10);
      handlerLength = parseInt(getComputedStyle($handler).width, 10);
      const barPos: number = handlerPos + handlerLength / 2;
      this.$bar.style.width = `${barPos}px`;
    } else {
      handlerPos = parseInt(getComputedStyle($handler).bottom, 10);
      handlerLength = parseInt(getComputedStyle($handler).height, 10);
      const barPos: number = handlerPos + handlerLength / 2;
      this.$bar.style.height = `${barPos}px`;
    }
  }
}