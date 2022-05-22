import { IConfig } from '../../Model/Model';
import EventObserver from '../../EventObserver/EventObserver';

class ScaleView extends EventObserver {
  private parent!: HTMLElement;

  private scale!: HTMLElement;

  private signArray: Array<HTMLElement> = [];

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
  }

  public drawScale(options: IConfig, handler: HTMLElement): void {
    const {
      step,
      limits: { min, max },
      isVertical,
    } = options;
    this.setScalePos(handler, isVertical);
    this.createListOfScaleLines(step, min, max, isVertical);
    this.capacityCheckForCommonSigns(isVertical);
    this.capacityCheckForPreLastSign(isVertical);
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
    return line;
  }

  private calcNumberOfLines(step: number, odd: number): number {
    return odd % step === 0 ? odd / step + 1 : Math.floor(odd / step + 2);
  }

  private setScalePos(handler: HTMLElement, isVertical: boolean): void {
    if (isVertical) {
      const handlerLength = parseInt(getComputedStyle(handler).height, 10);
      const trackLength = parseInt(getComputedStyle(this.parent).height, 10);
      const scaleLength = trackLength - handlerLength;
      this.scale.style.width = '';
      this.scale.style.left = '';
      this.scale.style.height = `${scaleLength}px`;
      this.scale.style.top = `${handlerLength / 2}px`;
    } else {
      const handlerLength = parseInt(getComputedStyle(handler).width, 10);
      const trackLength = parseInt(getComputedStyle(this.parent).width, 10);
      const scaleLength = trackLength - handlerLength;
      this.scale.style.height = '';
      this.scale.style.top = '';
      this.scale.style.width = `${scaleLength}px`;
      this.scale.style.left = `${handlerLength / 2}px`;
    }
  }

  private createListOfScaleLines(
    step: number,
    min: number,
    max: number,
    isVertical: boolean,
  ): void {
    this.scale.innerHTML = '';
    this.signArray = [];
    const stepPercentage = (step / (max - min)) * 100;
    const odd: number = max - min;
    const numberOfLines = this.calcNumberOfLines(step, odd);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numberOfLines; i += 1) {
      const line = this.renderScaleLine();
      const position = i * stepPercentage > 100 ? 100 : i * stepPercentage;
      if (isVertical) {
        line.style.bottom = `${position}%`;
      } else {
        line.style.left = `${position}%`;
      }
      const value: number = this.calcSigns(i, step, min, max, numberOfLines);
      const textElement = this.renderScaleSign(value);
      line.append(textElement);
      fragment.append(line);
      this.signArray.push(textElement);
    }
    this.scale.append(fragment);
  }

  private renderScaleSign(value: number): HTMLElement {
    const text = document.createElement('div');
    text.classList.add('adslider__scale-text');
    text.innerText = `${value}`;
    return text;
  }

  private capacityCheckForCommonSigns(isVertical: boolean): void {
    const isSmallDistanceBetweenCommonSigns = isVertical
      ? this.isSmallDistanceBetweenCommonVerticalSigns()
      : this.isSmallDistanceBetweenCommonHorizontalSigns();
    if (isSmallDistanceBetweenCommonSigns) {
      this.hideSigns(isVertical);
    }
  }

  private isSmallDistanceBetweenCommonVerticalSigns(): boolean {
    return this.signArray.some((item, i, array) => {
      if (i > 0 && i !== array.length - 1) {
        return (array[i - 1].getBoundingClientRect().top - item.getBoundingClientRect().bottom < 0);
      }
      return false;
    });
  }

  private isSmallDistanceBetweenCommonHorizontalSigns(): boolean {
    return this.signArray.some((item, i, array) => {
      if (i > 0 && i !== array.length - 1) {
        return (item.getBoundingClientRect().left - array[i - 1].getBoundingClientRect().right < 0);
      }
      return false;
    });
  }

  private hideSigns(isVertical: boolean): void {
    this.signArray.forEach((sign, index, array) => {
      if (index % 2 !== 0 && index !== array.length - 1) {
        const line = sign.closest('.adslider__scale-line');
        if (line) {
          line.classList.add('adslider__scale-line_hidden');
        }
      }
    });
    this.signArray = this.signArray.filter((_el, i, array) => !(i % 2) || i === array.length - 1);
    this.capacityCheckForCommonSigns(isVertical);
  }

  private capacityCheckForPreLastSign(isVertical: boolean) {
    const distanceBetweenLastSigns = isVertical
      ? this.calcDistanceBetweenLastVerticalSigns()
      : this.calcDistanceBetweenLastHorizontalSigns();
    if (distanceBetweenLastSigns < 0) {
      const line = this.signArray[this.signArray.length - 2].closest('.adslider__scale-line');
      if (line) {
        line.classList.add('adslider__scale-line_hidden');
      }
      this.signArray = this.signArray.filter(
        (_el, i, array) => {
          const isOddElement = !(i % 2) && i !== array.length - 2;
          const isLastElement = i === array.length - 1;
          return isOddElement || isLastElement;
        },
      );
    } else {
      this.signArray = this.signArray.filter((_el, i) => !(i % 2));
    }
  }

  private calcDistanceBetweenLastVerticalSigns(): number {
    const lastSignPos = this.signArray[this.signArray.length - 1].getBoundingClientRect().bottom;
    const preLastSignPos = this.signArray[this.signArray.length - 2].getBoundingClientRect().top;
    return preLastSignPos - lastSignPos;
  }

  private calcDistanceBetweenLastHorizontalSigns(): number {
    const lastSignPos = this.signArray[this.signArray.length - 1].getBoundingClientRect().left;
    const preLastSignPos = this.signArray[this.signArray.length - 2].getBoundingClientRect().right;
    return lastSignPos - preLastSignPos;
  }

  private calcSigns(
    index: number,
    step: number,
    min: number,
    max: number,
    numberOfLines: number,
  ): number {
    if (index === 0) {
      return Math.round(min);
    }
    if (index === numberOfLines - 1) {
      return Math.round(max);
    }
    return Math.round(index * step + min);
  }
}

export default ScaleView;
