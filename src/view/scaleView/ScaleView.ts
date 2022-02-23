import { IConfig } from '../../model/Model';
import EventObserver from '../../eventObserver/EventObserver';

class ScaleView extends EventObserver {
  private parent!: HTMLElement;

  private scale!: HTMLElement;

  private numberOfLines!: number;

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
    this.addListeners();
  }

  public drawScale(options: IConfig, handler: HTMLElement): void {
    if (options.vertical) {
      this.scale.classList.remove('adslider__scale_direction_horizontal');
      this.scale.classList.add('adslider__scale_direction_vertical');
    } else {
      this.scale.classList.remove('adslider__scale_direction_vertical');
      this.scale.classList.add('adslider__scale_direction_horizontal');
    }
    const { step, limits: { min, max } } = options;
    const odd: number = max - min;
    this.calcNumberOfLines(step, odd);
    this.setScalePos(handler);
    this.renderScaleLine();
    this.createListOfScaleLines(options);
    this.renderScaleSign(options);
  }

  private render(parent: HTMLElement): void {
    this.parent = parent;
    this.scale = document.createElement('div');
    this.scale.classList.add('adslider__scale');
    this.parent.append(this.scale);
  }

  private renderScaleLine(): HTMLElement {
    const line: HTMLElement = document.createElement('div');
    line.classList.add('adslider__scale-line');
    if (this.isVertical()) {
      line.classList.add('adslider__scale-line_direction_vertical');
    } else {
      line.classList.add('adslider__scale-line_direction_horizontal');
    }
    return line;
  }

  private addListeners(): void {
    this.scale.addEventListener('mousedown', this.handleScaleMouseDown);
  }

  private handleScaleMouseDown = (event: MouseEvent): void => {
    this.broadcast('handlerMousedownEvent', event);
  }

  private calcNumberOfLines(step: number, odd: number): void {
    this.numberOfLines = odd % step === 0 ? odd / step + 1 : Math.floor(odd / step + 2);
  }

  private setScalePos(handler: HTMLElement): void {
    let handlerLength: number;
    let trackLength: number;
    let scaleLength: number;
    if (this.isVertical()) {
      this.scale.style.width = '';
      this.scale.style.left = '';
      handlerLength = parseInt(getComputedStyle(handler).height, 10);
      trackLength = parseInt(getComputedStyle(this.parent).height, 10);
      scaleLength = trackLength - handlerLength;
      this.scale.style.height = `${scaleLength}px`;
      this.scale.style.top = `${handlerLength / 2}px`;
    } else {
      this.scale.style.height = '';
      this.scale.style.top = '';
      handlerLength = parseInt(getComputedStyle(handler).width, 10);
      trackLength = parseInt(getComputedStyle(this.parent).width, 10);
      scaleLength = trackLength - handlerLength;
      this.scale.style.width = `${scaleLength}px`;
      this.scale.style.left = `${handlerLength / 2}px`;
    }
  }

  private createListOfScaleLines(options: IConfig): void {
    const { step, limits: { min, max } } = options;
    this.scale.innerHTML = '';
    const stepPercentage = (step / (max - min)) * 100;
    for (let i = 0; i < this.numberOfLines; i += 1) {
      const line = this.renderScaleLine();
      this.scale.append(line);
      const position = i * stepPercentage > 100 ? 100 : i * stepPercentage;
      if (this.isVertical()) {
        line.style.bottom = `${position}%`;
      } else {
        line.style.left = `${position}%`;
      }
    }
  }

  private renderScaleSign(options: IConfig): void {
    const listOfLines = this.scale.querySelectorAll('.adslider__scale-line');
    listOfLines.forEach((el, index) => {
      const value: number = this.calcSigns(index, options);
      const text = document.createElement('div');
      text.classList.add('adslider__scale-text');
      if (this.isVertical()) {
        text.classList.add('adslider__scale-text_direction_vertical');
      } else {
        text.classList.add('adslider__scale-text_direction_horizontal');
      }
      text.innerText = `${value}`;
      el.append(text);
    });
  }

  private calcSigns(index: number, options: IConfig): number {
    const { step, limits: { min, max } } = options;
    let value: number;
    if (index === 0) {
      value = min;
    } else if (index === this.numberOfLines - 1) {
      value = max;
    } else {
      value = index * step + min;
    }
    return Math.round(value);
  }

  private isVertical(): boolean {
    return this.scale.classList.contains('adslider__scale_direction_vertical');
  }
}

export default ScaleView;