import EventObserver from '../EventObserver/EventObserver';
import EventTypes from '../EventObserver/eventTypes';

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
    this.init();
  }

  public init(): void {
    this.setLimitsAndValues();
    this.setStep();
    this.setDouble();
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

  private setDouble(): void {
    const { limits: { min }, double, from } = this.options;
    if (double && !from) {
      this.options.from = min;
    }
    this.options.double = double;
  }

  private setLimitsAndValues(): void {
    const {
      limits: { min, max },
      curValue,
      from,
      to,
      double,
    } = this.options;
    if (min >= max) {
      throw new Error('Min can not be the same or more than Max');
    }
    if (!double) {
      if (max < curValue) {
        this.options.curValue = max;
      } else if (min > curValue) {
        this.options.curValue = min;
      } else {
        this.setCurValue(curValue);
      }
    } else if (max < to) {
      this.options.to = max;
      this.options.curValue = max;
    } else if (min > from) {
      this.options.from = min;
    } else {
      this.setValueTo(to);
      this.setValueFrom(from);
    }
  }

  private setCurValue(curValue: number): void {
    const { limits: { min, max }, step, to } = this.options;
    const newVal: number = this.setRoundedCurVal(
      curValue,
      step,
      max,
      min,
    );
    this.options.curValue = to || newVal;
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
      newCurValue = max;
    }
    return newCurValue;
  }

  private setValueTo(value: number): void {
    const { limits: { min, max }, step } = this.options;
    if (step && value) {
      const newVal: number = this.setRoundedCurVal(
        value,
        step,
        max,
        min,
      );
      this.options.to = newVal;
      this.options.curValue = newVal;
    }
  }

  private setValueFrom(value: number): void {
    const { limits: { min, max }, step, to } = this.options;
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

  private setStep(): void {
    const { limits: { min, max }, step } = this.options;
    if (step > max - min) {
      throw new Error('Step can not be more than odd min and max limits');
    }
    this.options.step = step || 1;
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
      this.options.to = this.options.curValue;
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
    const { to } = this.options;
    return value > to;
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
