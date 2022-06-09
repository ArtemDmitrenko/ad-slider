class BarView {
  private bar!: HTMLElement;

  constructor(parent: HTMLElement) {
    this.render(parent);
  }

  public setLength(handler: HTMLElement, isVertical: boolean): void {
    this.bar.style.bottom = '';
    this.bar.style.left = '';
    const handlerPos = isVertical
      ? parseInt(getComputedStyle(handler).bottom, 10)
      : parseInt(getComputedStyle(handler).left, 10);
    const handlerLength = isVertical
      ? parseInt(getComputedStyle(handler).height, 10)
      : parseInt(getComputedStyle(handler).width, 10);
    const barPosition = this.calcBarPosForSingle(handlerPos, handlerLength);
    if (isVertical) {
      this.bar.style.width = '';
      this.bar.style.height = `${barPosition}px`;
    } else {
      this.bar.style.height = '';
      this.bar.style.width = `${barPosition}px`;
    }
  }

  public setLengthForDouble(options: {
    valueFrom: number;
    valueTo: number;
    handler: HTMLElement;
    isVertical: boolean
  }): void {
    const {
      valueFrom,
      valueTo,
      handler,
      isVertical,
    } = options;
    const handlerLength: number = parseInt(
      getComputedStyle(handler).width,
      10,
    );
    const barToEdge: number = valueTo + handlerLength / 2;
    const barFromEdge: number = valueFrom + handlerLength / 2;
    const barLength: number = Math.abs(barToEdge - barFromEdge);
    const barPosition = this.calcBarPosForDouble(valueFrom, valueTo, handlerLength);
    if (isVertical) {
      this.bar.style.width = '';
      this.bar.style.left = '';
      this.bar.style.height = `${barLength}px`;
      this.bar.style.bottom = `${barPosition}px`;
    } else {
      this.bar.style.height = '';
      this.bar.style.bottom = '';
      this.bar.style.width = `${barLength}px`;
      this.bar.style.left = `${barPosition}px`;
    }
  }

  private render(parent: HTMLElement): void {
    this.bar = document.createElement('div');
    this.bar.classList.add('adslider__bar');
    parent.append(this.bar);
  }

  private calcBarPosForSingle(handlerPos: number, handlerLength: number): number {
    return handlerPos + handlerLength / 2;
  }

  private calcBarPosForDouble(
    handlerPosFrom: number,
    handlerPosTo: number,
    handlerLength: number,
  ): number {
    return handlerPosFrom < handlerPosTo
      ? handlerPosFrom + handlerLength / 2
      : handlerPosTo + handlerLength / 2;
  }
}

export default BarView;
