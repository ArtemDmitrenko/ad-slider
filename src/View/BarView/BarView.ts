import EventObserver from '../../EventObserver/EventObserver';

class BarView extends EventObserver {
  private bar!: HTMLElement;

  private barPos!: number;

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
  }

  public setLength(handler: HTMLElement, isVertical: boolean): void {
    this.bar.style.bottom = '';
    this.bar.style.left = '';
    if (isVertical) {
      const handlerPos = parseInt(getComputedStyle(handler).bottom, 10);
      const handlerLength = parseInt(getComputedStyle(handler).height, 10);
      this.bar.style.width = '';
      this.calcBarPosForSingle(handlerPos, handlerLength);
      this.bar.style.height = `${this.barPos}px`;
    } else {
      const handlerPos = parseInt(getComputedStyle(handler).left, 10);
      const handlerLength = parseInt(getComputedStyle(handler).width, 10);
      this.bar.style.height = '';
      this.calcBarPosForSingle(handlerPos, handlerLength);
      this.bar.style.width = `${this.barPos}px`;
    }
  }

  public setLengthForDouble(options: {
    valueFrom: number;
    valueTo: number;
    handler: HTMLElement;
    isVertical: boolean
  }): void {
    const { valueFrom, valueTo, handler, isVertical } = options;
    const handlerLength: number = parseInt(
      getComputedStyle(handler).width,
      10,
    );
    const barToEdge: number = valueTo + handlerLength / 2;
    const barFromEdge: number = valueFrom + handlerLength / 2;
    const barLength: number = Math.abs(barToEdge - barFromEdge);
    if (isVertical) {
      this.bar.style.width = '';
      this.bar.style.left = '';
      this.bar.style.height = `${barLength}px`;
      this.calcBarPosForDouble(valueFrom, valueTo, handlerLength);
      this.bar.style.bottom = `${this.barPos}px`;
    } else {
      this.bar.style.height = '';
      this.bar.style.bottom = '';
      this.bar.style.width = `${barLength}px`;
      this.calcBarPosForDouble(valueFrom, valueTo, handlerLength);
      this.bar.style.left = `${this.barPos}px`;
    }
  }

  private render(parent: HTMLElement): void {
    this.bar = document.createElement('div');
    this.bar.classList.add('adslider__bar');
    parent.append(this.bar);
  }

  private calcBarPosForSingle(handlerPos: number, handlerLength: number): void {
    this.barPos = handlerPos + handlerLength / 2;
  }

  private calcBarPosForDouble(
    handlerPosFrom: number,
    handlerPosTo: number,
    handlerLength: number,
  ): void {
    this.barPos = handlerPosFrom < handlerPosTo
      ? handlerPosFrom + handlerLength / 2
      : handlerPosTo + handlerLength / 2;
  }
}

export default BarView;
