export default class BarView {
  public $bar!: HTMLElement;

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
      this.$bar.classList.remove('adslider__bar_horizontal');
      this.$bar.classList.add('adslider__bar_vertical');
    } else {
      this.$bar.classList.remove('adslider__bar_vertical');
      this.$bar.classList.add('adslider__bar_horizontal');
    }
  }

  public setLength($handler: HTMLElement): void {
    let handlerPos: number;
    let handlerLength: number;
    this.$bar.style.bottom = '';
    this.$bar.style.left = '';
    if (this.$bar.classList.contains('adslider__bar_horizontal')) {
      this.$bar.style.height = '';
      handlerPos = parseInt(getComputedStyle($handler).left, 10);
      handlerLength = parseInt(getComputedStyle($handler).width, 10);
      const barPos: number = handlerPos + handlerLength / 2;
      this.$bar.style.width = `${barPos}px`;
    } else {
      this.$bar.style.width = '';
      handlerPos = parseInt(getComputedStyle($handler).bottom, 10);
      handlerLength = parseInt(getComputedStyle($handler).height, 10);
      const barPos: number = handlerPos + handlerLength / 2;
      this.$bar.style.height = `${barPos}px`;
    }
  }

  public setLengthForDouble(options: any): void {
    const handlerPosFrom: number = options.edge * ((options.valueFrom - options.limits.min) / (options.limits.max - options.limits.min));
    const handlerPosTo: number = options.edge * ((options.valueTo - options.limits.min) / (options.limits.max - options.limits.min));
    const handlerLength: number = parseInt(getComputedStyle(options.handler).width, 10);
    const barLength: number = Math.abs((handlerPosTo + handlerLength / 2) - (handlerPosFrom + handlerLength / 2));
    if (this.$bar.classList.contains('adslider__bar_horizontal')) {
      this.$bar.style.height = '';
      this.$bar.style.bottom = '';
      this.$bar.style.width = `${barLength}px`;
      let barPos: number;
      if (handlerPosFrom < handlerPosTo) {
        barPos = handlerPosFrom + handlerLength / 2;
      } else {
        barPos = handlerPosTo + handlerLength / 2;
      }
      this.$bar.style.left = `${barPos}px`;
    } else {
      this.$bar.style.width = '';
      this.$bar.style.left = '';
      this.$bar.style.height = `${barLength}px`;
      let barPos: number;
      if (handlerPosFrom < handlerPosTo) {
        barPos = handlerPosFrom + handlerLength / 2;
      } else {
        barPos = handlerPosTo + handlerLength / 2;
      }
      this.$bar.style.bottom = `${barPos}px`;
    }
  }
}