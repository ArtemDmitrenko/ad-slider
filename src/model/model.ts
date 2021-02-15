import EventObserver from '../eventObserver/eventObserver';

export interface Config {
  limits: {
    min: number,
    max: number
  }
  curValue: number;
  showValueNote: boolean;
  step: number;
  vertical: boolean;
  double: boolean;
  from: number;
  to: number;
}

export class Model extends EventObserver {
  public limits!: {
    min: number
    max: number
  }

  public curValue!: number;

  public showValueNote: boolean;

  private step: number;

  private vertical: boolean;

  private double: boolean;

  private from: number;

  private to: number;

  public options: Config;

  constructor(options: Config) {
    super();
    this.limits = options.limits;
    this.curValue = options.to || options.curValue;
    this.showValueNote = options.showValueNote;
    this.step = options.step;
    this.vertical = options.vertical;
    this.double = options.double;
    this.from = options.from;
    this.to = options.to;
    this.options = {
      limits: this.limits,
      curValue: this.curValue,
      showValueNote: this.showValueNote,
      step: this.step,
      vertical: this.vertical,
      double: this.double,
      from: this.from,
      to: this.to,
    };
    this.init();
  }

  public init(): void {
    this.setLimits(this.limits);
    this.setCurValue(this.curValue);
    this.setValueTo(this.to);
    this.setValueFrom(this.from);
    this.setStep(this.step);
  }

  private setLimits(limits: { min: number, max: number }): void {
    if (limits.min >= limits.max) {
      throw new Error('Min can not be the same or more than Max');
    }
    this.limits = { min: limits.min, max: limits.max };
  }

  private setCurValue(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    this.curValue = value;
  }

  private setValueTo(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    this.to = value;
  }

  private setValueFrom(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    this.from = value;
  }

  private setStep(value: number): void {
    if (value > this.limits.max - this.limits.min) {
      throw new Error('Step can not be more than odd min and max limits');
    }
    this.step = value;
  }

  public setValueFromHandlerPos(data: { newPos: number, edge: number, handler: HTMLElement }): void {
    const odds: number = this.limits.max - this.limits.min;
    const value: number = Math.round(this.limits.min + odds * (data.newPos / data.edge));
    if (data.handler.classList.contains('adslider__handler_from')) {
      this.from = this.calcValueWithStep(value, this.from);
      const options = { edge: data.edge, value: this.from, limits: this.limits };
      this.broadcast('calcHandlerPosForDouble', options);
      this.broadcast('setHandlerPosForDouble');
      this.broadcast('calcValueNotePosForDouble', data.handler);
      this.broadcast('setValueNotePosForDouble');
      this.broadcast('setValueOfNoteForDouble', this.from);
    } else {
      this.curValue = this.calcValueWithStep(value, this.curValue);
      const options = { edge: data.edge, value: this.curValue, limits: this.limits };
      this.broadcast('calcHandlerPos', options);
      this.broadcast('setHandlerPos');
      this.broadcast('calcValueNotePos', data.handler);
      this.broadcast('setValueNotePos');
      this.broadcast('setValueOfNote', this.curValue);
    }
    if (this.double) {
      const optionsForBar = { edge: data.edge, valueFrom: this.from, valueTo: this.curValue, limits: this.limits, handler: data.handler };
      this.broadcast('setBarWidthForDouble', optionsForBar);
    } else {
      this.broadcast('setBarWidth', data.handler);
    }
  }

  private calcValueWithStep(value: number, curValue: number): number {
    if (this.step) {
      const numberOfSteps = Math.round((value - curValue) / this.step);
      const newValue: number = curValue + this.step * numberOfSteps;
      return newValue;
    }
    return value;
  }
}
