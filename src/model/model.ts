import EventObserver from '../eventObserver/eventObserver';

interface Config {
  limits: {
    min: number;
    max: number;
  };
  curValue: number;
  showValueNote: boolean;
  step: number;
  vertical: boolean;
  double: boolean;
  from: number;
  to: number;
}

class Model extends EventObserver {
  public limits!: {
    min: number;
    max: number;
  };

  public curValue!: number;

  public showValueNote: boolean;

  private step: number;

  private vertical: boolean;

  private double: boolean;

  public from: number;

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
    this.setStep(options.step);
    this.setValueTo(options.to);
    this.setValueFrom(options.from);
    this.setCurValue(options.curValue);
    this.setDouble(options.double, options.from);
  }

  private setDouble(double: boolean, from: number): void {
    if (double && !from) {
      this.from = this.limits.min;
    }
    this.double = double;
    this.options.double = double;
  }

  private setLimits(limits: { min: number; max: number }): void {
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
    if (this.step) {
      const newVal: number = this.setRoundedCurVal(
        value,
        this.step,
        this.limits.max,
        this.limits.min,
      );
      this.curValue = this.to || newVal;
      this.options.curValue = this.to || newVal;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private setRoundedCurVal(
    value: number,
    step: number,
    max: number,
    min: number,
  ): number {
    const odd: number = (min - value) % step;
    if (odd === 0) {
      return value;
    }
    const numberOfSteps: number = Math.round((min - value) / step);
    let newCurValue: number = step * Math.abs(numberOfSteps) + min;
    if (newCurValue > max) {
      newCurValue -= step;
    }
    return newCurValue;
  }

  private setValueTo(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    if (this.step && value) {
      const newVal: number = this.setRoundedCurVal(
        value,
        this.step,
        this.limits.max,
        this.limits.min,
      );
      this.to = newVal;
      this.options.to = newVal;
    }
  }

  private setValueFrom(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    if (value > this.to && this.to) {
      throw new Error('Value From must be less than To');
    }
    if (this.step && value) {
      const newVal = this.setRoundedCurVal(
        value,
        this.step,
        this.limits.max,
        this.limits.min,
      );
      this.from = newVal;
      this.options.from = newVal;
    }
  }

  private setStep(value: number): void {
    if (value > this.limits.max - this.limits.min) {
      throw new Error('Step can not be more than odd min and max limits');
    }
    this.step = value || 1;
    this.options.step = value || 1;
  }

  private setValFromAndBroadcast(
    value: number,
    edge: number,
    handler: HTMLElement,
  ): void {
    this.from = this.calcValueWithStep(value);
    const options = { edge, value: this.from, limits: this.limits };
    this.broadcast('calcHandlerPosForDouble', options);
    this.broadcast('setHandlerPosForDouble');
    this.broadcast('calcValueNotePosForDouble', handler);
    this.broadcast('setValueNotePosForDouble');
    this.broadcast('setValueOfNoteForDouble', this.from);
  }

  private setValCurAndBroadcast(
    value: number,
    edge: number,
    handler: HTMLElement,
  ): void {
    this.curValue = this.calcValueWithStep(value);
    const options = { edge, value: this.curValue, limits: this.limits };
    this.broadcast('calcHandlerPos', options);
    this.broadcast('setHandlerPos');
    this.broadcast('calcValueNotePos', handler);
    this.broadcast('setValueNotePos');
    this.broadcast('setValueOfNote', this.curValue);
  }

  private broadcastDouble(edge: number, handler: HTMLElement): void {
    if (this.double) {
      const optionsForBar = {
        edge,
        valueFrom: this.from,
        valueTo: this.curValue,
        limits: this.limits,
        handler,
      };
      this.broadcast('setBarWidthForDouble', optionsForBar);
      this.broadcast('setOneNote', optionsForBar);
    } else {
      this.broadcast('setBarWidth', handler);
    }
  }

  public setValueFromHandlerPos(data: {
    newPos: number,
    edge: number,
    handler: HTMLElement,
    isHandlerFrom: boolean
  }): void {
    const value = this.calcValueFromHandlerPos(data.newPos, data.edge);
    if (data.isHandlerFrom) {
      if (this.isValFromMovesOverValTo(value)) {
        return;
      }
      this.setValFromAndBroadcast(value, data.edge, data.handler);
    } else {
      if (this.double && this.isValToMovesOverValFrom(value)) {
        return;
      }
      this.setValCurAndBroadcast(value, data.edge, data.handler);
    }
    this.broadcastDouble(data.edge, data.handler);
  }

  private isValFromMovesOverValTo(value: number): boolean {
    return value > this.curValue;
  }

  private isValToMovesOverValFrom(value: number): boolean {
    return value < this.from;
  }

  public calcValueFromHandlerPos(newPos: number, edge: number): number {
    const odds: number = this.limits.max - this.limits.min;
    return Math.round(this.limits.min + odds * (newPos / edge));
  }

  private calcValueWithStep(value: number): number {
    const AllNumberOfSteps: number = Math.floor(
      Math.abs(this.limits.max - this.limits.min) / this.step,
    );
    const maxStepValue: number = this.limits.min + AllNumberOfSteps * this.step;
    const numberOfSteps: number = Math.round(
      (value - this.limits.min) / this.step,
    );
    let newValue: number = this.limits.min + this.step * numberOfSteps;
    if (newValue < this.limits.min) {
      newValue += this.step;
    }
    if (newValue > this.limits.max) {
      newValue -= this.step;
    }
    if (value > maxStepValue) {
      if (value > maxStepValue + (this.limits.max - maxStepValue) / 2) {
        newValue = this.limits.max;
      } else {
        newValue = maxStepValue;
      }
    }
    return newValue;
  }
}

export { Model, Config };
