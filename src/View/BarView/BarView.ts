import EventObserver from '../../EventObserver/EventObserver';

class BarView extends EventObserver {
  private bar!: HTMLElement;

  private barPos!: number;

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
    this.addListeners();
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.bar.classList.remove('adslider__bar_direction_horizontal');
      this.bar.classList.add('adslider__bar_direction_vertical');
    } else {
      this.bar.classList.remove('adslider__bar_direction_vertical');
      this.bar.classList.add('adslider__bar_direction_horizontal');
    }
  }

  public setLength(handler: HTMLElement): void {
    let handlerPos: number;
    let handlerLength: number;
    this.bar.style.bottom = '';
    this.bar.style.left = '';
    if (this.bar.classList.contains('adslider__bar_direction_horizontal')) {
      this.bar.style.height = '';
      handlerPos = parseInt(getComputedStyle(handler).left, 10);
      handlerLength = parseInt(getComputedStyle(handler).width, 10);
      this.calcBarPosForSingle(handlerPos, handlerLength);
      this.bar.style.width = `${this.barPos}px`;
    } else {
      this.bar.style.width = '';
      handlerPos = parseInt(getComputedStyle(handler).bottom, 10);
      handlerLength = parseInt(getComputedStyle(handler).height, 10);
      this.calcBarPosForSingle(handlerPos, handlerLength);
      this.bar.style.height = `${this.barPos}px`;
    }
  }

  public setLengthForDouble(options: {
    valueFrom: number;
    valueTo: number;
    handler: HTMLElement;
  }): void {
    const { valueFrom, valueTo, handler } = options;
    const handlerLength: number = parseInt(
      getComputedStyle(handler).width,
      10,
    );
    const barRightEdge: number = valueTo + handlerLength / 2;
    const barLeftEdge: number = valueFrom + handlerLength / 2;
    const barLength: number = Math.abs(barRightEdge - barLeftEdge);
    if (this.bar.classList.contains('adslider__bar_direction_horizontal')) {
      this.bar.style.height = '';
      this.bar.style.bottom = '';
      this.bar.style.width = `${barLength}px`;
      this.calcBarPosForDouble(valueFrom, valueTo, handlerLength);
      this.bar.style.left = `${this.barPos}px`;
    } else {
      this.bar.style.width = '';
      this.bar.style.left = '';
      this.bar.style.height = `${barLength}px`;
      this.calcBarPosForDouble(valueFrom, valueTo, handlerLength);
      this.bar.style.bottom = `${this.barPos}px`;
    }
  }

  private render(parent: HTMLElement): void {
    this.bar = document.createElement('div');
    this.bar.classList.add('adslider__bar');
    parent.append(this.bar);
  }

  private addListeners(): void {
    this.bar.addEventListener('mousedown', this.handleBarMouseDown);
  }

  private handleBarMouseDown = (event: MouseEvent): void => {
    this.broadcast(EventTypes.HANDLER_MOUSEDOWN_EVENT, event);
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
