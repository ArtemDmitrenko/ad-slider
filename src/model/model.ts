import EventObserver from '../eventObserver/eventObserver';

export interface Config {
  limits: {
    min: number,
    max: number
  }
  curValue: number;
  showValueNote: boolean;
}

export class Model extends EventObserver {
  public limits!: {
    min: number
    max: number
  }

  public curValue!: number;

  public showValueNote: boolean;

  public options: Config;
  static options: any;

  constructor(options: Config) {
    super();
    this.limits = options.limits;
    this.curValue = options.curValue;
    this.showValueNote = options.showValueNote;
    this.options = options;
    this.init(this.options);
  }

  public setValueFromHandlerPos(data: { newLeft: number, rightEdge: number }): void {
    const odds = this.limits.max - this.limits.min;
    const value = Math.round(this.limits.min + odds * (data.newLeft / data.rightEdge));
    this.setValue(value);
    this.broadcast('handlerMove', this.curValue);
  }

  public init(options: Config): void {
    this.setLimits(options.limits);
    this.setValue(options.curValue);
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
}
