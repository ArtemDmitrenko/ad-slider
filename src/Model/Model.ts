import EventObserver from '../EventObserver/EventObserver';
import EventTypes from '../EventObserver/eventTypes';

interface IConfig {
  limits: {
    min: number;
    max: number;
  };
  showValueNote: boolean;
  step: number;
  vertical: boolean;
  double: boolean;
  from?: number | null;
  to: number;
  onChange?: (data: IConfig) => void;
}

class Model extends EventObserver {
  public options: IConfig;

  constructor(options: IConfig) {
    super();
    this.options = {
      limits: options.limits,
      showValueNote: options.showValueNote,
      step: options.step,
      vertical: options.vertical,
      double: options.double,
      from: options.from,
      to: options.to,
      onChange: options.onChange,
    };
    this.init();
  }

  public init(): void {
    this.setLimitsAndValues();
    this.setStep();
  }

  public setValueFromHandlerPos(data: {
    relPosition: number;
    isFrom: boolean;
  }): void {
    const { relPosition, isFrom } = data;
    const value = this.calcValueFromHandlerPos(relPosition);
    const conditionForReturn = this.options.double && this.isValToMovesOverValFrom(value);
    if (isFrom && this.isValFromMovesOverValTo(value)) {
      return;
    }
    if (!isFrom && conditionForReturn) {
      return;
    }
    this.setValAndBroadcast(value, isFrom);
    this.callOnChange();
  }

  private callOnChange() {
    if (this.options.onChange && typeof this.options.onChange === 'function') {
      this.options.onChange(this.options);
    }
  }

  private calcValueFromHandlerPos(relPos: number): number {
    const { limits: { min, max } } = this.options;
    const odds: number = max - min;
    return Math.round(min + odds * relPos);
  }

  private setLimitsAndValues(): void {
    const {
      limits: { min, max },
      from,
      to,
      double,
    } = this.options;
    if (min >= max) {
      throw new Error('Min can not be the same or more than Max');
    }
    if (!double) {
      if (max < to) {
        this.options.to = max;
      } else if (min > to) {
        this.options.to = min;
      } else {
        this.setValue(to);
      }
    }
    if (!double && typeof from === 'number') {
      this.options.from = null;
    }

    const isDoubleAndNoFrom = double && (from === null || from === undefined);
    if (isDoubleAndNoFrom) {
      this.options.from = min;
    }
    const isDoubleWithFromAndTo = double && typeof from === 'number' && typeof to === 'number';
    if (isDoubleWithFromAndTo) {
      if (min > from && min > to) {
        this.options.from = min;
        this.options.to = min;
      } else if (max < from && max < to) {
        this.options.from = max;
        this.options.to = max;
      } else if (max < to) {
        this.options.to = max;
        this.setValueFrom(from);
      } else if (max < from) {
        this.options.from = max;
        this.setValueTo(to);
      } else if (min > to) {
        this.options.to = min;
        this.setValueFrom(from);
      } else if (min > from) {
        this.options.from = min;
        this.setValueTo(to);
      } else {
        this.setValueTo(to);
        if (typeof from === 'number') {
          this.setValueFrom(from);
        }
      }
    }
  }

  private setValue(value: number): void {
    const { limits: { min, max }, step } = this.options;
    this.options.to = this.calcRoundedValue(
      value,
      step,
      max,
      min,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private calcRoundedValue(
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
    let newValue: number = step * Math.abs(numberOfSteps) + min;
    if (newValue > max) {
      newValue = max;
    }
    return newValue;
  }

  private setValueTo(value: number): void {
    const { limits: { min, max }, step } = this.options;
    if (step && typeof value === 'number') {
      this.options.to = this.calcRoundedValue(
        value,
        step,
        max,
        min,
      );
    }
  }

  private setValueFrom(value: number): void {
    const { limits: { min, max }, step, to } = this.options;
    if (value > to && to) {
      throw new Error('Value From must be less than To');
    }
    if (step && typeof value === 'number') {
      this.options.from = this.calcRoundedValue(
        value,
        step,
        max,
        min,
      );
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
      const data = { isDouble: double, isFrom, showValueNote: this.options.showValueNote };
      this.broadcast(EventTypes.SET_POSITION, data);
    } else {
      this.options.to = this.calcValueWithStep(value);
      const options = {
        value: this.options.to,
        limits,
        isFrom,
      };
      this.broadcast(EventTypes.CALC_POSITION, options);
      const data = { isDouble: double, isFrom, showValueNote: this.options.showValueNote };
      this.broadcast(EventTypes.SET_POSITION, data);
    }
    this.callOnChange();
  }

  private isValFromMovesOverValTo(value: number): boolean {
    const { to } = this.options;
    return value > to;
  }

  private isValToMovesOverValFrom(value: number): boolean {
    const { from } = this.options;
    if (from || from === 0) {
      return value < from;
    }
    return false;
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
