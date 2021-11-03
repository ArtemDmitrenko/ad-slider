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
  public options: Config;

  constructor(options: Config) {
    super();
    this.options = {
      limits: options.limits,
      curValue: options.to || options.curValue,
      showValueNote: options.showValueNote,
      step: options.step,
      vertical: options.vertical,
      double: options.double,
      from: options.from,
      to: options.to,
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
      this.options.from = this.options.limits.min;
    }
    this.options.double = double;
  }

  private setLimits(limits: { min: number; max: number }): void {
    if (limits.min >= limits.max) {
      throw new Error('Min can not be the same or more than Max');
    }
    this.options.limits = { min: limits.min, max: limits.max };
  }

  private setCurValue(value: number): void {
    if (value < this.options.limits.min || value > this.options.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    if (this.options.step) {
      const newVal: number = this.setRoundedCurVal(
        value,
        this.options.step,
        this.options.limits.max,
        this.options.limits.min,
      );
      this.options.curValue = this.options.to || newVal;
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
    if (value < this.options.limits.min || value > this.options.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    if (this.options.step && value) {
      const newVal: number = this.setRoundedCurVal(
        value,
        this.options.step,
        this.options.limits.max,
        this.options.limits.min,
      );
      this.options.to = newVal;
    }
  }

  private setValueFrom(value: number): void {
    if (value < this.options.limits.min || value > this.options.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    if (value > this.options.to && this.options.to) {
      throw new Error('Value From must be less than To');
    }
    if (this.options.step && value) {
      const newVal = this.setRoundedCurVal(
        value,
        this.options.step,
        this.options.limits.max,
        this.options.limits.min,
      );
      this.options.from = newVal;
    }
  }

  private setStep(value: number): void {
    if (value > this.options.limits.max - this.options.limits.min) {
      throw new Error('Step can not be more than odd min and max limits');
    }
    this.options.step = value || 1;
  }

  private setValAndBroadcast(
    value: number,
    isHandlerFrom: boolean,
  ): void {
    if (isHandlerFrom) {
      this.options.from = this.calcValueWithStep(value);
      const options = {
        value: this.options.from, limits: this.options.limits, isHandlerFrom,
      };
      this.broadcast('calcPos', options);
      const data = { isDouble: this.options.double, isHandlerFrom };
      this.broadcast('setPos', data);
    } else {
      this.options.curValue = this.calcValueWithStep(value);
      const options = {
        value: this.options.curValue, limits: this.options.limits, isHandlerFrom,
      };
      this.broadcast('calcPos', options);
      const data = { isDouble: this.options.double, isHandlerFrom };
      this.broadcast('setPos', data);
    }
  }

  public setValueFromHandlerPos(data: {
    relPosition: number,
    isHandlerFrom: boolean
  }): void {
    const value = this.calcValueFromHandlerPos(data.relPosition);
    if (data.isHandlerFrom) {
      if (this.isValFromMovesOverValTo(value)) {
        return;
      }
    } else if (this.options.double && this.isValToMovesOverValFrom(value)) {
      return;
    }
    this.setValAndBroadcast(value, data.isHandlerFrom);
  }

  private isValFromMovesOverValTo(value: number): boolean {
    return value > this.options.curValue;
  }

  private isValToMovesOverValFrom(value: number): boolean {
    return value < this.options.from;
  }

  public calcValueFromHandlerPos(relPos: number): number {
    const odds: number = this.options.limits.max - this.options.limits.min;
    return Math.round(this.options.limits.min + odds * relPos);
  }

  private calcValueWithStep(value: number): number {
    const AllNumberOfSteps: number = Math.floor(
      Math.abs(this.options.limits.max - this.options.limits.min) / this.options.step,
    );
    const maxStepValue: number = this.options.limits.min + AllNumberOfSteps * this.options.step;
    const numberOfSteps: number = Math.round(
      (value - this.options.limits.min) / this.options.step,
    );
    let newValue: number = this.options.limits.min + this.options.step * numberOfSteps;
    if (newValue < this.options.limits.min) {
      newValue += this.options.step;
    }
    if (newValue > this.options.limits.max) {
      newValue -= this.options.step;
    }
    if (value > maxStepValue) {
      if (value > maxStepValue + (this.options.limits.max - maxStepValue) / 2) {
        newValue = this.options.limits.max;
      } else {
        newValue = maxStepValue;
      }
    }
    return newValue;
  }
}

export { Model, Config };
