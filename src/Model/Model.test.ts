import { Model, IConfig } from './Model';
import EventTypes from '../EventObserver/eventTypes';

describe('model', () => {
  let options: IConfig;
  let model: Model;
  describe('init function', () => {
    beforeEach(() => {
      options = {
        limits: { min: 0, max: 100 },
        curValue: 0,
        showValueNote: true,
        step: 60,
        double: true,
        from: 5,
        to: 95,
        vertical: true,
      };
      model = new Model(options);
    });
    test('should set correct curValue', () => {
      expect(model.options.curValue).toBe(95);
    });
    test('should set correct min limit', () => {
      expect(model.options.limits.min).toBe(0);
    });
    test('should set correct max limit', () => {
      expect(model.options.limits.max).toBe(100);
    });
    test('should set correct showValueNote', () => {
      expect(model.options.showValueNote).toBe(true);
    });
    test('should set step', () => {
      expect(model.options.step).toBe(60);
    });
    test('should set double', () => {
      expect(model.options.double).toBe(true);
    });
    test('should set valFrom', () => {
      expect(model.options.from).toBe(0);
    });
    test('should set valTo', () => {
      expect(model.options.to).toBe(60);
    });
    test('should set vertical', () => {
      expect(model.options.vertical).toBe(true);
    });
  });

  describe('init function if options are not correct', () => {
    test('should set valFrom if there are double and no valFrom', () => {
      options = {
        limits: { min: 0, max: 100 },
        curValue: 85,
        showValueNote: true,
        step: 1,
        double: true,
        from: 0,
        to: 90,
        vertical: false,
      };
      model = new Model(options);
      expect(model.options.from).toBe(0);
    });
    test('should set curValue if there are no valTo', () => {
      options = {
        limits: { min: 0, max: 100 },
        curValue: 85,
        showValueNote: true,
        step: 1,
        double: false,
        from: 0,
        to: 0,
        vertical: false,
      };
      model = new Model(options);
      expect(model.options.curValue).toBe(85);
    });
    test('should throw error if min limit is more than max limit', () => {
      options = {
        limits: { min: 100, max: 0 },
        curValue: 50,
        showValueNote: true,
        step: 1,
        double: false,
        from: 0,
        to: 0,
        vertical: false,
      };
      expect(() => { new Model(options); }).toThrowError(/^Min can not be the same or more than Max$/);
    });
    test('should throw error if min limit is more than max limit', () => {
      options = {
        limits: { min: 100, max: 0 },
        curValue: 50,
        showValueNote: true,
        step: 1,
        double: false,
        from: 0,
        to: 0,
        vertical: false,
      };
      expect(() => { new Model(options); }).toThrowError(/^Min can not be the same or more than Max$/);
    });
    test('should throw error if valFrom is more than valTo', () => {
      options = {
        limits: { min: 0, max: 100 },
        curValue: 85,
        showValueNote: true,
        step: 1,
        double: true,
        from: 80,
        to: 30,
        vertical: false,
      };
      expect(() => { new Model(options); }).toThrowError(/^Value From must be less than To$/);
    });
    test('should throw error if step is more than difference between limits.max and limits.min', () => {
      options = {
        limits: { min: 0, max: 100 },
        curValue: 85,
        showValueNote: true,
        step: 120,
        double: false,
        from: 0,
        to: 0,
        vertical: false,
      };
      expect(() => { new Model(options); }).toThrowError(/^Step can not be more than odd min and max limits$/);
    });
  });

  describe('function setValueFromHandlerPos', () => {
    let callback1: Function;
    let callback2: Function;
    const handler: HTMLElement = document.createElement('div');

    describe('for single slider', () => {
      beforeEach(() => {
        options = {
          limits: { min: 0, max: 100 },
          curValue: 85,
          showValueNote: true,
          step: 1,
          double: false,
          from: 10,
          to: 0,
          vertical: false,
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
        expect(model.options.curValue).toBe(59);
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
        expect(model.options.curValue).toBe(-49);
      });
    });

    describe('for double slider', () => {
      beforeEach(() => {
        options = {
          limits: { min: 0, max: 100 },
          curValue: 85,
          showValueNote: true,
          step: 10,
          double: true,
          from: 5,
          to: 10,
          vertical: false,
        };
        model = new Model(options);
        callback1 = jest.fn();
        callback2 = jest.fn();

        model.addObserver(EventTypes.CALC_POSITION, callback1);
        model.addObserver(EventTypes.SET_POSITION, callback2);
      });

      test('should set curValue and check function isValFromMovesOverValTo is return true', () => {
        handler.classList.add('adslider__handler_type_from');
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.from).toBe(0);
      });

      test('should set curValue and check function isValFromMovesOverValTo is return false', () => {
        handler.classList.add('adslider__handler_type_from');
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.from).toBe(0);
      });

      test('should broadcast events', () => {
        handler.classList.add('adslider__handler_type_from');
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(callback1).toBeCalled();
        expect(callback2).toBeCalled();
      });

      test('check that function isValFromMovesOverValTo() is working', () => {
        handler.classList.remove('adslider__handler_type_from');
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.curValue).toBe(60);
      });
    });

    describe('for double slider with another options', () => {
      beforeEach(() => {
        options = {
          limits: { min: 0, max: 100 },
          curValue: 85,
          showValueNote: true,
          step: 30,
          double: true,
          from: 0,
          to: 90,
          vertical: false,
        };
        model = new Model(options);
        callback1 = jest.fn();
        callback2 = jest.fn();
        model.addObserver(EventTypes.CALC_POSITION, callback1);
        model.addObserver(EventTypes.SET_POSITION, callback2);
      });
      test('check that function calcValueWithStep() is working', () => {
        handler.classList.remove('adslider__handler_type_from');
        const data = { relPosition: 0.5948040674603174, isFromValueChanging: false };
        model.setValueFromHandlerPos(data);
        expect(model.options.curValue).toBe(60);
      });
    });
  });
});
