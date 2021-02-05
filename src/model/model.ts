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

  public options: Config;

  constructor(options: Config) {
    super();
    this.limits = options.limits;
    this.curValue = options.curValue;
    this.showValueNote = options.showValueNote;
    this.step = options.step;
    this.vertical = options.vertical;
    this.options = options;
    this.init(this.options);
  }

  public init(options: Config): void {
    this.setLimits(options.limits);
    this.setValue(options.curValue);
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
  }

  private setValueWithStep(value: number): void {
    if (value > (this.curValue + this.step / 2)) {
      const newValue: number = this.curValue + this.step;
      if (newValue <= this.limits.max) {
        this.curValue = newValue;
      }
    }
    if (value < (this.curValue - this.step / 2)) {
      const newValue: number = this.curValue - this.step;
      if (newValue >= this.limits.min) {
        this.curValue = newValue;
      }
    }
  }
}
