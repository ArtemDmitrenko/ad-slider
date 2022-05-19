import { Model, IConfig } from './Model';
import EventTypes from '../EventObserver/eventTypes';

describe('model', () => {
  let options: IConfig;
  let model: Model;
  describe('validateValues function', () => {
    describe('with correct options', () => {
      beforeEach(() => {
        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          step: 60,
          isDouble: true,
          from: 5,
          to: 95,
          isVertical: true,
        };
        model = new Model(options);
      });
      test('should set correct min limit', () => {
        expect(model.options.limits.min).toBe(0);
      });
      test('should set correct max limit', () => {
        expect(model.options.limits.max).toBe(100);
      });
      test('should set correct hasValueNote', () => {
        expect(model.options.hasValueNote).toBe(true);
      });
      test('should set step', () => {
        expect(model.options.step).toBe(60);
      });
      test('should set isDouble', () => {
        expect(model.options.isDouble).toBe(true);
      });
      test('should set valFrom', () => {
        expect(model.options.from).toBe(0);
      });
      test('should set valTo', () => {
        expect(model.options.to).toBe(100);
      });
      test('should set isVertical', () => {
        expect(model.options.isVertical).toBe(true);
      });
    });
    describe('with not correct options', () => {
      beforeEach(() => {
        const defaultOptions = {
          limits: { min: 'min', max: 'max' },
          hasValueNote: 'true',
          step: '60',
          isDouble: 'true',
          from: '5',
          to: '95',
          isVertical: 'true',
        };
        model = new Model(defaultOptions);
      });
      test('should set correct min limit', () => {
        expect(model.options.limits.min).toBe(-100);
      });
      test('should set correct max limit', () => {
        expect(model.options.limits.max).toBe(100);
      });
      test('should set correct hasValueNote', () => {
        expect(model.options.hasValueNote).toBe(true);
      });
      test('should set step', () => {
        expect(model.options.step).toBe(5);
      });
      test('should set isDouble', () => {
        expect(model.options.isDouble).toBe(false);
      });
      test('should set valFrom', () => {
        expect(model.options.from).toBe(null);
      });
      test('should set valTo', () => {
        expect(model.options.to).toBe(0);
      });
      test('should set isVertical', () => {
        expect(model.options.isVertical).toBe(false);
      });
    });
  });

  describe('function setLimitsAndValues for single slider', () => {
    beforeEach(() => {
      options = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        step: 1,
        isDouble: false,
        to: 10,
        isVertical: false,
      };
    });
    test('should return undefined if some number value is NaN', () => {
      const optionsWithNaN = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        step: 1,
        isDouble: false,
        to: NaN,
        isVertical: false,
      };
      model = new Model(options);
      expect(model.init(optionsWithNaN)).toBe(undefined);
    });
    test('should return undefined if min > max', () => {
      const newOptions = {
        limits: { min: 100, max: 0 },
        hasValueNote: true,
        step: 1,
        isDouble: false,
        to: 10,
        isVertical: false,
      };
      model = new Model(options);
      expect(model.init(newOptions)).toBe(undefined);
    });
    test('should return undefined if step > max - min', () => {
      const newOptions = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        step: 120,
        isDouble: false,
        to: 10,
        isVertical: false,
      };
      model = new Model(options);
      expect(model.init(newOptions)).toBe(undefined);
    });
    test('should return undefined if step has changed and step is not valid', () => {
      const newOptions = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        step: -3,
        isDouble: false,
        to: 10,
        isVertical: false,
      };
      model = new Model(options);
      expect(model.init(newOptions)).toBe(undefined);
    });
  });

  describe('function setLimitsAndValues for double slider', () => {
    describe('for double slider', () => {
      test('should set from, to values if step > max - min and to > min', () => {
        const newOptions = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          step: 120,
          isDouble: true,
          from: -10,
          to: 20,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.from).toBe(0);
        expect(model.options.to).toBe(100);
      });
      test('should set to value if step > max - min and to < min', () => {
        const newOptions = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          step: 120,
          isDouble: true,
          from: -10,
          to: -5,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.to).toBe(100);
      });
      test('should set max value if step > max - min and max < from', () => {
        const newOptions = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          step: 120,
          isDouble: true,
          from: 130,
          to: -5,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.limits.max).toBe(100);
      });
      test('should set from and to if min > from', () => {
        const newOptions = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: -10,
          to: 20,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.from).toBe(0);
      });
      test('should set from and to if min > from && min > to', () => {
        const newOptions = {
          limits: { min: 30, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: 0,
          to: 20,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.from).toBe(30);
        expect(model.options.to).toBe(30);
      });
      test('should set from and to if max < from && max < to', () => {
        const newOptions = {
          limits: { min: 30, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: 120,
          to: 140,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.from).toBe(100);
        expect(model.options.to).toBe(100);
      });
      test('should set from and to if max < to', () => {
        const newOptions = {
          limits: { min: -100, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: 0,
          to: 140,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.to).toBe(100);
      });
      test('should set from and to if max < from', () => {
        const newOptions = {
          limits: { min: -100, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: 120,
          to: 20,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.from).toBe(100);
      });
      test('should set from and to if min > to', () => {
        const newOptions = {
          limits: { min: -100, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: 0,
          to: -120,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.to).toBe(-100);
      });
      test('should return undefined if from !== this.options.from && from > to', () => {
        const newOptions = {
          limits: { min: -100, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: 20,
          to: 30,
          isVertical: false,
        };
        model = new Model(newOptions);
        const changedOptions = {
          limits: { min: -100, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: 40,
          to: 30,
          isVertical: false,
        };
        expect(model.init(changedOptions)).toBe(undefined);
      });
      test('should set from if from is undefined or null', () => {
        const newOptions = {
          limits: { min: -100, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: 20,
          to: 30,
          isVertical: false,
        };
        model = new Model(newOptions);
        const changedOptions = {
          limits: { min: -100, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: true,
          from: null,
          to: 30,
          isVertical: false,
        };
        model.init(changedOptions);
        expect(model.options.from).toBe(-100);
      });
    });

    describe('for single slider', () => {
      test('should set to value if max < to', () => {
        const newOptions = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          step: 20,
          isDouble: false,
          to: 120,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.to).toBe(100);
      });
      test('should set to value if min > to', () => {
        const newOptions = {
          limits: { min: 10, max: 100 },
          hasValueNote: true,
          step: 20,
          isDouble: false,
          to: 0,
          isVertical: false,
        };
        model = new Model(newOptions);
        expect(model.options.to).toBe(10);
      });
    });
  });

  describe('function setValueFromHandlerPos', () => {
    let callback1: Function;
    let callback2: Function;

    describe('for single slider', () => {
      beforeEach(() => {
        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          step: 1,
          isDouble: false,
          from: 10,
          to: 85,
          isVertical: false,
        };
        model = new Model(options);
        callback1 = jest.fn();
        callback2 = jest.fn();
        model.addObserver(EventTypes.CALC_POSITION, callback1);
        model.addObserver(EventTypes.SET_POSITION, callback2);
      });

      test('should set curValue', () => {
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.to).toBe(59);
      });
      test('should broadcast events', () => {
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(callback1).toBeCalled();
        expect(callback2).toBeCalled();
      });

      test('check that function calcValueWithStep is working properly (val less limits.min)', () => {
        const data = { relPosition: -0.5, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.to).toBe(-49);
      });
    });

    describe('for isDouble slider', () => {
      beforeEach(() => {
        const callOnChange = jest.fn();
        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          step: 10,
          isDouble: true,
          from: 5,
          to: 85,
          isVertical: false,
          onChange: callOnChange,
        };
        model = new Model(options);
        callback1 = jest.fn();
        callback2 = jest.fn();

        model.addObserver(EventTypes.CALC_POSITION, callback1);
        model.addObserver(EventTypes.SET_POSITION, callback2);
      });

      test('should set To value and check function isValFromMovesOverValTo is return true', () => {
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.from).toBe(0);
      });

      test('should set curValue and check function isValFromMovesOverValTo is return false', () => {
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.from).toBe(0);
      });

      test('should broadcast events', () => {
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(callback1).toBeCalled();
        expect(callback2).toBeCalled();
      });

      test('check that function isValFromMovesOverValTo() is working', () => {
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: true };
        model.setValueFromHandlerPos(data);
        expect(model.options.to).toBe(80);
      });
      test('should return undefined when value From moves over To or value To moves over From', () => {
        const data = { relPosition: 0.98, isFromValueChanging: true };
        expect(model.setValueFromHandlerPos(data)).toBe(undefined);
      });
    });

    describe('for isDouble slider with another options', () => {
      beforeEach(() => {
        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          step: 30,
          isDouble: true,
          from: 0,
          to: 90,
          isVertical: false,
        };
        model = new Model(options);
        callback1 = jest.fn();
        callback2 = jest.fn();
        model.addObserver(EventTypes.CALC_POSITION, callback1);
        model.addObserver(EventTypes.SET_POSITION, callback2);
      });
      test('check that function calcValueWithStep() is working', () => {
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.to).toBe(60);
      });
      test('should calc value if value > maxStepValue', () => {
        const data = { relPosition: 0.98, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.to).toBe(100);
      });
    });
  });

  describe('function getOptions', () => {
    test('should get Model data', () => {
      options = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        step: 1,
        isDouble: false,
        from: 10,
        to: 85,
        isVertical: false,
      };
      model = new Model(options);
      const result = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        step: 1,
        isDouble: false,
        from: null,
        to: 85,
        isVertical: false,
        onChange: undefined,
      };
      expect(model.getOptions()).toEqual(result);
    });
  });
});
