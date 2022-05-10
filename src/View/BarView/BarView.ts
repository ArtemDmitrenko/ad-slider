import EventObserver from '../../EventObserver/EventObserver';

class BarView extends EventObserver {
  private bar!: HTMLElement;

  private barPos!: number;

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
  }

  public setLength(handler: HTMLElement, vertical: boolean): void {
    this.bar.style.bottom = '';
    this.bar.style.left = '';
    if (vertical) {
      this.bar.style.width = '';
      const handlerPos = parseInt(getComputedStyle(handler).bottom, 10);
      const handlerLength = parseInt(getComputedStyle(handler).height, 10);
      this.calcBarPosForSingle(handlerPos, handlerLength);
      this.bar.style.height = `${this.barPos}px`;
    } else {
      this.bar.style.height = '';
      const handlerPos = parseInt(getComputedStyle(handler).left, 10);
      const handlerLength = parseInt(getComputedStyle(handler).width, 10);
      this.calcBarPosForSingle(handlerPos, handlerLength);
      this.bar.style.width = `${this.barPos}px`;
    }
  }

  public setLengthForDouble(options: {
    valueFrom: number;
    valueTo: number;
    handler: HTMLElement;
    vertical: boolean
  }): void {
    const { valueFrom, valueTo, handler, vertical } = options;
    const handlerLength: number = parseInt(
      getComputedStyle(handler).width,
      10,
    );
    const barRightEdge: number = valueTo + handlerLength / 2;
    const barLeftEdge: number = valueFrom + handlerLength / 2;
    const barLength: number = Math.abs(barRightEdge - barLeftEdge);
    if (vertical) {
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
