import EventObserver from '../EventObserver/EventObserver';
import EventTypes from '../EventObserver/eventTypes';

interface IConfig {
  limits: {
    min: number;
    max: number;
  };
  hasValueNote: boolean;
  step: number;
  isVertical: boolean;
  isDouble: boolean;
  from?: number | null;
  to: number;
  onChange?: (data: IConfig) => void;
}

type Any = number | string | boolean;

interface IUsersConfig {

  limits?: {
    min?: Any;
    max?: Any;
  };
  hasValueNote?: Any;
  step?: Any;
  isVertical?: Any;
  isDouble?: Any;
  from?: Any | null;
  to?: Any;
  onChange?: (data: IConfig) => void;
}

class Model extends EventObserver {
  public options!: IConfig;

  constructor(options: IUsersConfig) {
    super();
    this.validateValues(options);
    this.init(this.options);
  }

  public init(options: IConfig): void {
    this.setLimitsAndValues(options);
  }

  public setValueFromHandlerPos(data: {
    relPosition: number;
    isFromValueChanging: boolean;
  }): void {
    const { relPosition, isFromValueChanging } = data;
    const value = this.calcValueFromHandlerPos(relPosition);
    const isValFromMovesOverValTo = isFromValueChanging && this.isValFromMovesOverValTo(value);
    const isValToMovesOverValFrom = !isFromValueChanging && this.isValToMovesOverValFrom(value);
    const conditionForReturn = isValFromMovesOverValTo || isValToMovesOverValFrom;
    if (conditionForReturn) {
      return;
    }
    this.setValAndBroadcast(value, isFromValueChanging);
    this.callOnChange();
  }

  public getOptions(): IConfig {
    return { ...this.options };
  }

  private validateValues(options: IUsersConfig) {
    const {
      limits,
      hasValueNote,
      step,
      isVertical,
      isDouble,
      from,
      to,
      onChange,
    } = options;
    const defaultLimits = {
      min: limits && typeof limits.min === 'number' ? limits.min : -100,
      max: limits && typeof limits.max === 'number' ? limits.max : 100,
    };
    this.options = {
      limits: defaultLimits,
      hasValueNote: typeof hasValueNote === 'boolean' ? hasValueNote : true,
      step: typeof step === 'number' ? step : 5,
      isVertical: typeof isVertical === 'boolean' ? isVertical : false,
      isDouble: typeof isDouble === 'boolean' ? isDouble : false,
      from: typeof from === 'number' ? from : -20,
      to: typeof to === 'number' ? to : 0,
      onChange,
    };
  }

  private callOnChange() {
    if (typeof this.options.onChange === 'function') {
      this.options.onChange(this.options);
    }
  }

  private calcValueFromHandlerPos(relPos: number): number {
    const { limits: { min, max } } = this.options;
    const odds: number = max - min;
    return Math.round(min + odds * relPos);
  }

  private setLimitsAndValues(options: IConfig): void {
    const {
      limits: { min, max },
      from,
      to,
      isDouble,
      step,
      isVertical,
      hasValueNote,
    } = options;
    const isMinMaxNaN = Number.isNaN(min) || Number.isNaN(max);
    const isFromValueChangingToNaN = Number.isNaN(from) || Number.isNaN(to) || Number.isNaN(step);
    if (isMinMaxNaN || isFromValueChangingToNaN) {
      return;
    }
    if (min >= max) {
      return;
    }
    if (step > max - min) {
      this.setMinValue(options);
      this.setMaxValue(options);
      return;
    }
    const hasStepChanged = step !== this.options.step;
    const isStepNotValid = step <= 0 || step > max - min;
    if (hasStepChanged && isStepNotValid) {
      return;
    }
    if (!isDouble) {
      this.setValuesForSingleSlider(options);
    } else {
      this.setValuesForDoubleSlider(options);
    }
    this.options = {
      ...this.options,
      limits: { min, max },
      isDouble,
      isVertical,
      hasValueNote,
      step,
    };
  }

  private setMinValue(options: IConfig): void {
    const {
      limits: { min, max }, isDouble, from, to,
    } = options;
    this.options.step = max - min;
    if (!isDouble) {
      this.options.to = min;
      this.options.limits.min = min;
    } else if (from && from < min) {
      this.options.from = min;
      this.options.limits.min = min;
      this.options.to = to < min ? min : to;
    }
  }

  private setMaxValue(options: IConfig): void {
    const { limits: { min, max }, isDouble, from } = options;
    const isDoubleWithFrom = isDouble && from;
    if (isDoubleWithFrom && max < from) {
      this.options.from = max;
    }
    this.options.step = max - min;
    this.options.to = max;
    this.options.limits.max = max;
  }

  private setValuesForSingleSlider(options: IConfig): void {
    const {
      limits: { min, max },
      from,
      to,
      step,
    } = options;
    if (max < to) {
      this.options.to = max;
    } else if (min > to) {
      this.options.to = min;
    } else {
      this.setValue(to, min, max, step);
    }
    if (typeof from === 'number') {
      this.options.from = null;
    }
  }

  private setValuesForDoubleSlider(options: IConfig): void {
    const {
      limits: { min, max },
      from,
      to,
      step,
    } = options;
    if (from === null || from === undefined) {
      this.options.from = min;
    }
    if (typeof from === 'number' && typeof to === 'number') {
      if (min > from && min > to) {
        this.options.from = min;
        this.options.to = min;
      } else if (max < from && max < to) {
        this.options.from = max;
        this.options.to = max;
      } else if (max < to) {
        this.options.to = max;
        this.setValueFrom(from, min, max, step, to);
      } else if (max < from) {
        this.options.from = max;
        this.setValueTo(to, min, max, step);
      } else if (min > to) {
        this.options.to = min;
        this.setValueFrom(from, min, max, step, to);
      } else if (min > from) {
        this.options.from = min;
        this.setValueTo(to, min, max, step);
      } else {
        if (from !== this.options.from && from > to) {
          return;
        }
        this.setValueFrom(from, min, max, step, to);
        this.setValueTo(to, min, max, step);
      }
    }
  }

  private setValue(value: number, min: number, max: number, step: number): void {
    this.options.to = this.calcRoundedValue(
      value,
      step,
      max,
      min,
    );
  }

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
    const newValue: number = step * Math.abs(numberOfSteps) + min;
    return newValue > max ? max : newValue;
  }

  private setValueTo(value: number, min: number, max: number, step: number): void {
    if (step && typeof value === 'number') {
      this.options.to = this.calcRoundedValue(
        value,
        step,
        max,
        min,
      );
    }
  }

  private setValueFrom(value: number, min: number, max: number, step: number, to: number): void {
    if (value > to && to) {
      return;
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

  private setValAndBroadcast(value: number, isFromValueChanging: boolean): void {
    const { limits, isDouble, hasValueNote } = this.options;
    const data = { isDouble, isFromValueChanging, hasValueNote };
    const options = {
      limits,
      isFromValueChanging,
      value,
    };
    if (isFromValueChanging) {
      this.options.from = this.calcValueWithStep(value);
      options.value = this.options.from;
    } else {
      this.options.to = this.calcValueWithStep(value);
      options.value = this.options.to;
    }
    this.broadcast(EventTypes.CALC_POSITION, options);
    this.broadcast(EventTypes.SET_POSITION, data);
    this.callOnChange();
  }

  private isValFromMovesOverValTo(value: number): boolean {
    const { to } = this.options;
    return value > to;
  }

  private isValToMovesOverValFrom(value: number): boolean {
    const { from } = this.options;
    return typeof from === 'number' && value < from;
  }

  private calcValueWithStep(value: number): number {
    const { limits: { min, max }, step } = this.options;
    const allNumberOfSteps: number = Math.floor(Math.abs(max - min) / step);
    const maxStepValue: number = min + allNumberOfSteps * step;
    const numberOfSteps: number = Math.round((value - min) / step);
    const newValue: number = min + step * numberOfSteps;
    if (newValue < min) {
      return newValue + step;
    }
    if (value > maxStepValue) {
      return value > maxStepValue + (max - maxStepValue) / 2 ? max : maxStepValue;
    }
    if (newValue > max) {
      return newValue - step;
    }
    return newValue;
  }
}

export { Model, IConfig };
