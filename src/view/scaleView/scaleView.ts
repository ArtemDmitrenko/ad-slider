import { Config } from '../../model/model';

export default class ScaleView {
  private $parent!: HTMLElement;

  public $scale!: HTMLElement;

  private numberOfLines!: number;

  constructor($parent: HTMLElement) {
    this.render($parent);
  }

  private render($parent: HTMLElement): void {
    this.$parent = $parent;
    this.$scale = document.createElement('div');
    this.$scale.classList.add('adslider__scale');
    this.$parent.append(this.$scale);
    this.renderScaleLines();
  }

  public drawScale(options: Config, $handler: HTMLElement): void {
    if (options.vertical) {
      this.$scale.classList.remove('adslider__scale_horizontal');
      this.$scale.classList.add('adslider__scale_vertical');
    } else {
      this.$scale.classList.remove('adslider__scale_vertical');
      this.$scale.classList.add('adslider__scale_horizontal');
    }
    const odd: number = options.limits.max - options.limits.min;
    this.calcNumberOfLines(odd);
    this.setScalePos($handler);
    this.renderScaleLines();
    this.renderScaleSign(options, odd);
  }

  private calcNumberOfLines(odd: number): number {
    if (odd <= 100) {
      this.numberOfLines = 6;
    } else {
      this.numberOfLines = 3;
    }
    return this.numberOfLines;
  }

  private setScalePos($handler: HTMLElement): void {
    let handlerLength: number;
    let trackLength: number;
    let scaleLength: number;
    if (this.isVertical()) {
      this.$scale.style.width = '';
      this.$scale.style.left = '';
      handlerLength = parseInt(getComputedStyle($handler).height, 10);
      trackLength = parseInt(getComputedStyle(this.$parent).height, 10);
      scaleLength = trackLength - handlerLength;
      this.$scale.style.height = `${scaleLength}px`;
      this.$scale.style.top = `${handlerLength / 2}px`;
    } else {
      this.$scale.style.height = '';
      this.$scale.style.top = '';
      handlerLength = parseInt(getComputedStyle($handler).width, 10);
      trackLength = parseInt(getComputedStyle(this.$parent).width, 10);
      scaleLength = trackLength - handlerLength;
      this.$scale.style.width = `${scaleLength}px`;
      this.$scale.style.left = `${handlerLength / 2}px`;
    }
  }

  private renderScaleLines(): void {
    const line: HTMLElement = document.createElement('div');
    line.classList.add('adslider__scaleLine');
    if (this.isVertical()) {
      line.classList.add('adslider__scaleLine_vertical');
      this.createListOfScaleLines(line);
    } else {
      line.classList.add('adslider__scaleLine_horizontal');
      this.createListOfScaleLines(line);
    }
  }

  private createListOfScaleLines(line: HTMLElement): void {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.numberOfLines; i += 1) {
      fragment.appendChild(line.cloneNode(true));
    }
    this.$scale.innerHTML = '';
    this.$scale.append(fragment);
  }

  private renderScaleSign(options: Config, odd: number): void {
    const listOfLines = this.$scale.querySelectorAll('.adslider__scaleLine');
    listOfLines.forEach((el, index) => {
      const value: number = this.calcSigns(index, options, odd);
      const $text = document.createElement('div');
      $text.classList.add('adslider__scaleText');
      if (this.isVertical()) {
        $text.classList.add('adslider__scaleText_vertical');
      } else {
        $text.classList.add('adslider__scaleText_horizontal');
      }
      $text.innerText = `${value}`;
      el.append($text);
    });
  }

  private calcSigns(index: number, options: Config, odd: number): number {
    let value: number;
    if (index === 0) {
      value = options.limits.min;
    }
    if (index === this.numberOfLines - 1) {
      value = options.limits.max;
    } else {
      value = odd * (index / (this.numberOfLines - 1)) + options.limits.min;
    }
    return Math.round(value);
  }

  private isVertical(): boolean {
    if (this.$scale.classList.contains('adslider__scale_vertical')) {
      return true;
    }
    return false;
  }
}
