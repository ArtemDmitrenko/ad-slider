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
  public options!: IConfig;

  constructor(options: IConfig) {
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
    const conditionForReturn = this.options.double && this.isValToMovesOverValFrom(value);
    if (isFromValueChanging && this.isValFromMovesOverValTo(value)) {
      return;
    }
    if (!isFromValueChanging && conditionForReturn) {
      return;
    }
    this.setValAndBroadcast(value, isFromValueChanging);
    this.callOnChange();
  }

  public getOptions(): IConfig {
    const {
      limits, showValueNote, step, vertical, double, from, to,
    } = this.options;
    return {
      limits,
      showValueNote,
      step,
      vertical,
      double,
      from,
      to,
    };
  }

  private validateValues(options: IConfig) {
    const defaultLimits = {
      min: typeof options.limits.min === 'number' ? options.limits.min : -100,
      max: typeof options.limits.max === 'number' ? options.limits.max : 100,
    };
    this.options = {
      limits: defaultLimits,
      showValueNote: typeof options.showValueNote === 'boolean' ? options.showValueNote : true,
      step: typeof options.step === 'number' ? options.step : 5,
      vertical: typeof options.vertical === 'boolean' ? options.vertical : false,
      double: typeof options.double === 'boolean' ? options.double : false,
      from: typeof options.from === 'number' ? options.from : -20,
      to: typeof options.to === 'number' ? options.to : 0,
      onChange: options.onChange,
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
      double,
      step,
      vertical,
      showValueNote,
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
    if (step !== this.options.step) {
      if (step <= 0 || step > max - min) {
        return;
      }
    }
    if (!double) {
      this.setValuesForSingleSlider(options);
    } else {
      this.setValuesForDoubleSlider(options);
    }
    this.options = {
      ...this.options,
      limits: { min, max },
      double,
      vertical,
      showValueNote,
      step,
    };
  }

  private setMinValue(options: IConfig): void {
    const {
      limits: { min, max }, double, from, to,
    } = options;
    this.options.step = max - min;
    if (!double) {
      this.options.to = min;
      this.options.limits.min = min;
    } else if (from && from < min) {
      this.options.from = min;
      this.options.limits.min = min;
      this.options.to = to < min ? min : to;
    }
  }

  private setMaxValue(options: IConfig): void {
    const { limits: { min, max }, double, from } = options;
    const isDoubleWithFrom = double && from;
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
    const { limits, double, showValueNote } = this.options;
    const data = { isDouble: double, isFromValueChanging, showValueNote };
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
    return from || from === 0 ? value < from : false;
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
      newValue = value > maxStepValue + (max - maxStepValue) / 2 ? max : maxStepValue;
    }
    return newValue;
  }
}

export { Model, IConfig };
