import EventObserver from '../../eventObserver/eventObserver';

class BarView extends EventObserver {
  public $bar!: HTMLElement;

  private barPos!: number;

  constructor($parent: HTMLElement) {
    super();
    this.render($parent);
    this.addListeners();
  }

  private render($parent: HTMLElement): void {
    this.$bar = document.createElement('div');
    this.$bar.classList.add('adslider__bar');
    $parent.append(this.$bar);
  }

  private addListeners(): void {
    this.$bar.addEventListener('mousedown', this.handleBarMouseDown.bind(this));
  }

  private handleBarMouseDown(event: MouseEvent): void {
    this.broadcast('handlerMousedownEvent', event);
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$bar.classList.remove('adslider__bar_horizontal');
      this.$bar.classList.add('adslider__bar_vertical');
    } else {
      this.$bar.classList.remove('adslider__bar_vertical');
      this.$bar.classList.add('adslider__bar_horizontal');
    }
  }

  public setLength($handler: HTMLElement): void {
    let handlerPos: number;
    let handlerLength: number;
    this.$bar.style.bottom = '';
    this.$bar.style.left = '';
    if (this.$bar.classList.contains('adslider__bar_horizontal')) {
      this.$bar.style.height = '';
      handlerPos = parseInt(getComputedStyle($handler).left, 10);
      handlerLength = parseInt(getComputedStyle($handler).width, 10);
      this.calcBarPosForSingle(handlerPos, handlerLength);
      this.$bar.style.width = `${this.barPos}px`;
    } else {
      this.$bar.style.width = '';
      handlerPos = parseInt(getComputedStyle($handler).bottom, 10);
      handlerLength = parseInt(getComputedStyle($handler).height, 10);
      this.calcBarPosForSingle(handlerPos, handlerLength);
      this.$bar.style.height = `${this.barPos}px`;
    }
  }

  public setLengthForDouble(options: {
    valueFrom: number;
    limits: { min: number; max: number };
    valueTo: number;
    edge: number;
    handler: HTMLElement;
  }): void {
    const oddFromMin: number = options.valueFrom - options.limits.min;
    const oddToMin: number = options.valueTo - options.limits.min;
    const oddMaxMin: number = options.limits.max - options.limits.min;
    const handlerPosFrom: number = options.edge * (oddFromMin / oddMaxMin);
    const handlerPosTo: number = options.edge * (oddToMin / oddMaxMin);
    const handlerLength: number = parseInt(
      getComputedStyle(options.handler).width,
      10,
    );
    const sumToLength: number = handlerPosTo + handlerLength / 2;
    const sumFromLength: number = handlerPosFrom + handlerLength / 2;
    const barLength: number = Math.abs(sumToLength - sumFromLength);
    if (this.$bar.classList.contains('adslider__bar_horizontal')) {
      this.$bar.style.height = '';
      this.$bar.style.bottom = '';
      this.$bar.style.width = `${barLength}px`;
      this.calcBarPosForDouble(handlerPosFrom, handlerPosTo, handlerLength);
      this.$bar.style.left = `${this.barPos}px`;
    } else {
      this.$bar.style.width = '';
      this.$bar.style.left = '';
      this.$bar.style.height = `${barLength}px`;
      this.calcBarPosForDouble(handlerPosFrom, handlerPosTo, handlerLength);
      this.$bar.style.bottom = `${this.barPos}px`;
    }
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
