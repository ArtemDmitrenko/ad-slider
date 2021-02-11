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
    this.curValue = options.curValue;
    this.showValueNote = options.showValueNote;
    this.step = options.step;
    this.vertical = options.vertical;
    this.double = options.double;
    this.from = options.to;
    this.to = options.to;
    this.options = options;
    this.init(this.options);
  }

  public init(options: Config): void {
    this.setLimits(options.limits);
    this.setValue(options.curValue);
    this.setValue(options.to);
    this.setValue(options.from);
    this.setStep(options.step);
  }

  private setLimits(limits: { min: number, max: number }): void {
    if (limits.min >= limits.max) {
      throw new Error('Min can not be the same or more than Max');
    }
    this.limits = { min: limits.min, max: limits.max };
  }

  private setValue(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    this.curValue = value;
  }

  private setStep(value: number): void {
    if (value > this.limits.max - this.limits.min) {
      throw new Error('Step can not be more than odd min and max limits');
    }
    this.step = value;
  }

  public setValueFromHandlerPos(data: { newPos: number, edge: number }): void {
    const odds: number = this.limits.max - this.limits.min;
    const value: number = Math.round(this.limits.min + odds * (data.newPos / data.edge));
    if (this.step) {
      this.setValueWithStep(value);
    } else {
      this.curValue = value;
    }
    const options = { value: this.curValue, limits: this.limits };
    this.broadcast('setValueOfNote', this.curValue);
    this.broadcast('setHandlerPos', options);
    this.broadcast('setValueNotePos');
    this.broadcast('setBarWidth');
  }

  private setValueWithStep(value: number): void {
    const numberOfSteps = Math.round((value - this.curValue) / this.step);
    const newValue: number = this.curValue + this.step * numberOfSteps;
    this.curValue = newValue;
  }
}
