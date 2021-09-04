import { Config } from '../../model/model';
import EventObserver from '../../eventObserver/eventObserver';

export default class ScaleView extends EventObserver {
  private $parent!: HTMLElement;

  public $scale!: HTMLElement;

  private numberOfLines!: number;

  constructor($parent: HTMLElement) {
    super();
    this.render($parent);
    this.$scale.addEventListener('mousedown', this.changeHandlerPos.bind(this));
  }

  private changeHandlerPos(event: MouseEvent): void {
    this.broadcast('handlerMousedownEvent', event);
  }

  private render($parent: HTMLElement): void {
    this.$parent = $parent;
    this.$scale = document.createElement('div');
    this.$scale.classList.add('adslider__scale');
    this.$parent.append(this.$scale);
    this.renderScaleLine();
  }

  public drawScale(options: Config, $handler: HTMLElement): void {
    if (options.vertical) {
      this.$scale.classList.remove('adslider__scale_horizontal');
      this.$scale.classList.add('adslider__scale_vertical');
    } else {
      this.$scale.classList.remove('adslider__scale_vertical');
      this.$scale.classList.add('adslider__scale_horizontal');
    }
    const {step} = options;
    const odd: number = options.limits.max - options.limits.min;
    this.calcNumberOfLines(step, odd);
    this.setScalePos($handler);
    this.renderScaleLine();
    this.createListOfScaleLines(options);
    this.renderScaleSign(options);
  }

  private calcNumberOfLines(step: number, odd: number): number {
    this.numberOfLines = odd % step === 0 ? odd / step + 1 : Math.floor(odd / step + 2);
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

  private renderScaleLine(): HTMLElement {
    const line: HTMLElement = document.createElement('div');
    line.classList.add('adslider__scaleLine');
    if (this.isVertical()) {
      line.classList.add('adslider__scaleLine_vertical');
    } else {
      line.classList.add('adslider__scaleLine_horizontal');
    }
    return line;
  }

  private createListOfScaleLines(options: Config): void {
    this.$scale.innerHTML = '';
    const stepPercentage = (options.step / (options.limits.max - options.limits.min)) * 100;
    for (let i = 0; i < this.numberOfLines; i += 1) {
      const line = this.renderScaleLine();
      this.$scale.append(line);
      const position = i * stepPercentage > 100 ? 100 : i * stepPercentage;
      if (this.isVertical()) {
        line.style.bottom = `${position}%`;
      } else {
        line.style.left = `${position}%`;
      }
    }
  }

  private renderScaleSign(options: Config): void {
    const listOfLines = this.$scale.querySelectorAll('.adslider__scaleLine');
    listOfLines.forEach((el, index) => {
      const value: number = this.calcSigns(index, options);
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

  private calcSigns(index: number, options: Config): number {
    let value: number;
    if (index === 0) {
      value = options.limits.min;
    } else if (index === this.numberOfLines - 1) {
      value = options.limits.max;
    } else {
      value = index * options.step;
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
