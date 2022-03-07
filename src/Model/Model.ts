import EventObserver from '../EventObserver/EventObserver';
import EventTypes from '../EventObserver/EventTypes';

interface IConfig {
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
  public options: IConfig;

  constructor(options: IConfig) {
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

  public init(options: IConfig): void {
    const {
      limits, step, from, to, curValue, double,
    } = options;
    this.setLimitsAndValues(limits, curValue, to, from);
    this.setStep(step);
    // this.setValueTo(to);
    // this.setValueFrom(from);
    // this.setCurValue(curValue);
    this.setDouble(double, from);
  }

  public setValueFromHandlerPos(data: {
    relPosition: number;
    isFrom: boolean;
  }): void {
    const value = this.calcValueFromHandlerPos(data.relPosition);
    const conditionForReturn = this.options.double && this.isValToMovesOverValFrom(value);
    if (data.isFrom && this.isValFromMovesOverValTo(value)) {
      return;
    }
    if (!data.isFrom && conditionForReturn) {
      return;
    }
    this.setValAndBroadcast(value, data.isFrom);
  }

  private calcValueFromHandlerPos(relPos: number): number {
    const { limits: { min, max } } = this.options;
    const odds: number = max - min;
    return Math.round(min + odds * relPos);
  }

  private setDouble(double: boolean, from: number): void {
    const { limits: { min } } = this.options;
    if (double && !from) {
      this.options.from = min;
    }
    this.options.double = double;
  }

  private setLimitsAndValues(
    limits: { min: number; max: number },
    curValue: number,
    to: number,
    from: number,
  ): void {
    const { min, max } = limits;
    if (min >= max) {
      throw new Error('Min can not be the same or more than Max');
    }
    this.options.limits = { min, max };
    if (!this.options.double) {
      if (max < this.options.curValue) {
        this.options.curValue = max;
      } else if (min > this.options.curValue) {
        this.options.curValue = min;
      } else {
        this.setCurValue(curValue);
      }
    } else if (max < this.options.to) {
      this.options.to = max;
      this.options.curValue = max;
    } else if (min > this.options.from) {
      this.options.from = min;
    } else {
      this.setValueTo(to);
      this.setValueFrom(from);
    }
  }

  private setCurValue(value: number): void {
    const { limits: { min, max }, step, to } = this.options;
    if (step) {
      const newVal: number = this.setRoundedCurVal(
        value,
        step,
        max,
        min,
      );
      this.options.curValue = to || newVal;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private setRoundedCurVal(
    value: number,
    step: number,
    max: number,
    min: number,
  ): number {
    const odd: number = Math.abs((min - value) % step);
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
    const { limits: { min, max }, step } = this.options;
    if (value < min || value > max) {
      throw new Error('Value must be in range of min and max limits');
    }
    if (step && value) {
      const newVal: number = this.setRoundedCurVal(
        value,
        step,
        max,
        min,
      );
      this.options.to = newVal;
    }
  }

  private setValueFrom(value: number): void {
    const { limits: { min, max }, step, to } = this.options;
    if (value < min || value > max) {
      throw new Error('Value must be in range of min and max limits');
    }
    if (value > to && to) {
      throw new Error('Value From must be less than To');
    }
    if (step && value) {
      const newVal = this.setRoundedCurVal(
        value,
        step,
        max,
        min,
      );
      this.options.from = newVal;
    }
  }

  private setStep(value: number): void {
    const { limits: { min, max } } = this.options;
    if (value > max - min) {
      throw new Error('Step can not be more than odd min and max limits');
    }
    this.options.step = value || 1;
  }

  private setValAndBroadcast(value: number, isFrom: boolean): void {
    const { limits, double } = this.options;
    if (isFrom) {
      this.options.from = this.calcValueWithStep(value);
      const options = {
        value: this.options.from,
        limits,
        isFrom,
      };
      this.broadcast(EventTypes.CALC_POSITION, options);
      const data = { isDouble: double, isFrom };
      this.broadcast(EventTypes.SET_POSITION, data);
    } else {
      this.options.curValue = this.calcValueWithStep(value);
      const options = {
        value: this.options.curValue,
        limits,
        isFrom,
      };
      this.broadcast(EventTypes.CALC_POSITION, options);
      const data = { isDouble: double, isFrom };
      this.broadcast(EventTypes.SET_POSITION, data);
    }
  }

  private isValFromMovesOverValTo(value: number): boolean {
    const { curValue } = this.options;
    return value > curValue;
  }

  private isValToMovesOverValFrom(value: number): boolean {
    const { from } = this.options;
    return value < from;
  }

  private calcValueWithStep(value: number): number {
    const { limits: { min, max }, step } = this.options;
    const allNumberOfSteps: number = Math.floor(Math.abs(max - min) / step);
    const maxStepValue: number = min + allNumberOfSteps * step;
    const numberOfSteps: number = Math.round((value - min) / step);
    let newValue: number = min + step * numberOfSteps;
    if (newValue < min) {
      newValue += step;
    }
    if (newValue > max) {
      newValue -= step;
    }
    if (value > maxStepValue) {
      if (value > maxStepValue + (max - maxStepValue) / 2) {
        newValue = max;
      } else {
        newValue = maxStepValue;
      }
    }
    return newValue;
  }
}

export { Model, IConfig };
