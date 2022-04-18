import { IConfig } from '../../Model/Model';
import EventObserver from '../../EventObserver/EventObserver';

class ScaleView extends EventObserver {
  private parent!: HTMLElement;

  private scale!: HTMLElement;

  private numberOfLines!: number;

  private lineArray: Array<Element> = [];

  private signArray: Array<HTMLDivElement> = [];

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
  }

  public drawScale(options: IConfig, handler: HTMLElement): void {
    if (options.vertical) {
      this.scale.classList.remove('adslider__scale_direction_horizontal');
      this.scale.classList.add('adslider__scale_direction_vertical');
    } else {
      this.scale.classList.remove('adslider__scale_direction_vertical');
      this.scale.classList.add('adslider__scale_direction_horizontal');
    }
    const {
      step,
      limits: { min, max },
    } = options;
    const odd: number = max - min;
    this.calcNumberOfLines(step, odd);
    this.setScalePos(handler);
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

  private calcNumberOfLines(step: number, odd: number): void {
    this.numberOfLines = odd % step === 0 ? odd / step + 1 : Math.floor(odd / step + 2);
  }

  private setScalePos(handler: HTMLElement): void {
    if (this.isVertical()) {
      this.scale.style.width = '';
      this.scale.style.left = '';
      const handlerLength = parseInt(getComputedStyle(handler).height, 10);
      const trackLength = parseInt(getComputedStyle(this.parent).height, 10);
      const scaleLength = trackLength - handlerLength;
      this.scale.style.height = `${scaleLength}px`;
      this.scale.style.top = `${handlerLength / 2}px`;
    } else {
      this.scale.style.height = '';
      this.scale.style.top = '';
      const handlerLength = parseInt(getComputedStyle(handler).width, 10);
      const trackLength = parseInt(getComputedStyle(this.parent).width, 10);
      const scaleLength = trackLength - handlerLength;
      this.scale.style.width = `${scaleLength}px`;
      this.scale.style.left = `${handlerLength / 2}px`;
    }
  }

  private createListOfScaleLines(options: IConfig): void {
    const {
      step,
      limits: { min, max },
    } = options;
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
    listOfLines.forEach((line, index) => {
      const value: number = this.calcSigns(index, options);
      const text = document.createElement('div');
      text.classList.add('adslider__scale-text');
      if (this.isVertical()) {
        text.classList.add('adslider__scale-text_direction_vertical');
      } else {
        text.classList.add('adslider__scale-text_direction_horizontal');
      }
      text.innerText = `${value}`;
      line.append(text);
      this.lineArray.push(line);
      this.signArray.push(text);
    });
    this.capacityCheckForSign();
  }

  private capacityCheckForSign(): void {
    const isSmallDistanceBetweenSigns = this.isVertical()
      ? this.isSmallDistanceBetweenVerticalSigns()
      : this.isSmallDistanceBetweenHorizontalSigns();
    if (isSmallDistanceBetweenSigns) {
      this.hideSigns();
    }
    this.lineArray = [];
    this.signArray = [];
  }

  private isSmallDistanceBetweenVerticalSigns(): boolean {
    return this.signArray.some((item, i, array) => {
      if (i > 0) {
        return (
          array[i - 1].getBoundingClientRect().top
            - item.getBoundingClientRect().bottom
          < 0
        );
      }
      return false;
    });
  }

  private isSmallDistanceBetweenHorizontalSigns(): boolean {
    return this.signArray.some((item, i, array) => {
      if (i > 0) {
        return (
          item.getBoundingClientRect().left
            - array[i - 1].getBoundingClientRect().right
          < 0
        );
      }
      return false;
    });
  }

  private hideSigns(): void {
    this.lineArray.forEach((line, index, array) => {
      if (index % 2 !== 0 && index !== array.length - 1) {
        line.classList.add('adslider__scale-line_hidden');
      }
    });
    this.setPenultimateSignView();
    this.capacityCheckForSign();
  }

  private setPenultimateSignView() {
    const distanceBetweenLastSigns = this.isVertical()
      ? this.calcDistanceBetweenLastVerticalSigns() : this.calcDistanceBetweenLastHorizontalSigns();
    if (distanceBetweenLastSigns < 0) {
      this.lineArray[this.lineArray.length - 2].classList.add(
        'adslider__scale-line_hidden',
      );
      this.lineArray = this.lineArray.filter(
        (_el, i, array) => (!(i % 2) && i !== array.length - 2) || i === array.length - 1,
      );
      this.signArray = this.signArray.filter(
        (_el, i, array) => (!(i % 2) && i !== array.length - 2) || i === array.length - 1,
      );
    } else {
      this.lineArray = this.lineArray.filter((_el, i) => !(i % 2));
      this.signArray = this.signArray.filter((_el, i) => !(i % 2));
    }
  }

  private calcDistanceBetweenLastVerticalSigns(): number {
    const lastSignPos = this.signArray[this.signArray.length - 1].getBoundingClientRect().top;
    const preLastSignPos = this.signArray[this.signArray.length - 2].getBoundingClientRect().bottom;
    return lastSignPos - preLastSignPos;
  }

  private calcDistanceBetweenLastHorizontalSigns(): number {
    const lastSignPos = this.signArray[this.signArray.length - 1].getBoundingClientRect().left;
    const preLastSignPos = this.signArray[this.signArray.length - 2].getBoundingClientRect().right;
    return preLastSignPos - lastSignPos;
  }

  private calcSigns(index: number, options: IConfig): number {
    const {
      step,
      limits: { min, max },
    } = options;
    if (index === 0) {
      return Math.round(min);
    }
    if (index === this.numberOfLines - 1) {
      return Math.round(max);
    }
    return Math.round(index * step + min);
  }

  private isVertical(): boolean {
    return this.scale.classList.contains('adslider__scale_direction_vertical');
  }
}

export default ScaleView;
