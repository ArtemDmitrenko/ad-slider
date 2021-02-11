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

  public setLengthForDouble($handlerFrom: HTMLElement, $handlerTo: HTMLElement) {
    let handlerPosFrom: number;
    let handlerPosTo: number;
    let handlerLengthFrom: number;
    let handlerLengthTo: number;
    if (this.$bar.classList.contains('adslider__bar_horizontal')) {
      handlerPosFrom = parseInt(getComputedStyle($handlerFrom).left, 10);
      handlerLengthFrom = parseInt(getComputedStyle($handlerFrom).width, 10);
      handlerPosTo = parseInt(getComputedStyle($handlerTo).left, 10);
      handlerLengthTo = parseInt(getComputedStyle($handlerTo).width, 10);
      const barLength: number = Math.abs((handlerPosTo + handlerLengthTo / 2) - (handlerPosFrom + handlerLengthFrom / 2));
      this.$bar.style.width = `${barLength}px`;
      let barPos: number;
      if (handlerPosFrom < handlerPosTo) {
        barPos = handlerPosFrom + handlerLengthFrom / 2;
      } else {
        barPos = handlerPosTo + handlerLengthFrom / 2;
      }
      this.$bar.style.left = `${barPos}px`;
    } else {
      handlerPosFrom = parseInt(getComputedStyle($handlerFrom).bottom, 10);
      handlerLengthFrom = parseInt(getComputedStyle($handlerFrom).height, 10);
      handlerPosTo = parseInt(getComputedStyle($handlerTo).bottom, 10);
      handlerLengthTo = parseInt(getComputedStyle($handlerTo).height, 10);
      const barLength: number = Math.abs((handlerPosTo + handlerLengthTo / 2) - (handlerPosFrom + handlerLengthFrom / 2));
      this.$bar.style.height = `${barLength}px`;
      let barPos: number;
      if (handlerPosFrom < handlerPosTo) {
        barPos = handlerPosFrom + handlerLengthFrom / 2;
      } else {
        barPos = handlerPosTo + handlerLengthFrom / 2;
      }
      this.$bar.style.bottom = `${barPos}px`;
    }
  }