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
    this.showValueNote = options.showValueNote;
    this.step = options.step;
    this.vertical = options.vertical;
    this.double = options.double;
    this.from = options.from;
    this.to = options.to;
    this.curValue = options.to || options.curValue;
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
    this.init(this.options);
  }

  public init(options: Config): void {
    this.setLimits(options.limits);
    this.setValueTo(options.to);
    this.setValueFrom(options.from);
    this.setCurValue(options.curValue);
    this.setDouble(options.double, options.from);
    this.setStep(options.step);
  }

  private setDouble(double: boolean, from: number): void {
    if (double && !from) {
      throw new Error('You have to enter value of from for double slider');
    }
    this.double = double;
    this.options.double = double;
  }

  private setLimits(limits: { min: number, max: number }): void {
    if (limits.min >= limits.max) {
      throw new Error('Min can not be the same or more than Max');
    }
    this.limits = { min: limits.min, max: limits.max };
    this.options.limits = { min: limits.min, max: limits.max };
  }

  private setCurValue(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    this.curValue = this.to || value;
    this.options.curValue = this.to || value;
  }

  private setValueTo(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    // if (value < this.from) {
    //   throw new Error('Value To must be more than From');
    // }
    this.to = value;
    this.options.to = value;
  }

  private setValueFrom(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    if (value > this.to) {
      throw new Error('Value From must be less than To');
    }
    this.from = value;
    this.options.from = value;
  }

  private setStep(value: number): void {
    if (value > this.limits.max - this.limits.min) {
      throw new Error('Step can not be more than odd min and max limits');
    }
    this.step = value || 1;
    this.options.step = value || 1;
  }

  public setValueFromHandlerPos(data: { newPos: number, edge: number, handler: HTMLElement }): void {
    const odds: number = this.limits.max - this.limits.min;
    const value: number = Math.round(this.limits.min + odds * (data.newPos / data.edge));

    if (data.handler.classList.contains('adslider__handler_from')) {
      this.from = this.calcValueWithStep(value, this.from);
      if (this.curValue - this.from < this.step && this.from > this.curValue) {
        return;
      }
      const options = { edge: data.edge, value: this.from, limits: this.limits };
      this.broadcast('calcHandlerPosForDouble', options);
      this.broadcast('setHandlerPosForDouble');
      this.broadcast('calcValueNotePosForDouble', data.handler);
      this.broadcast('setValueNotePosForDouble');
      this.broadcast('setValueOfNoteForDouble', this.from);
    } else {
      this.curValue = this.calcValueWithStep(value, this.curValue);
      if (this.double) {
        if (this.curValue - this.from < this.step && this.from > this.curValue) {
          return;
        }
      }
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
    const numberOfSteps = Math.round((value - curValue) / this.step);
    let newValue: number = curValue + this.step * numberOfSteps;
    // console.log(this.step)
    // console.log(curValue, this.step, numberOfSteps)
    if (newValue < this.limits.min) {
      newValue += this.step;
    }
    if (newValue > this.limits.max) {
      newValue -= this.step;
    }
    return newValue;
  }
}
