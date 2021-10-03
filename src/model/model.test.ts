import { Model, Config } from './model';

describe('model', () => {
  let options: Config;
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
      expect(model.options.curValue).toBe(60);
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
    test('should throw error if curValue is less than min limit', () => {
      options = {
        limits: { min: 0, max: 100 },
        curValue: -50,
        showValueNote: true,
        step: 1,
        double: false,
        from: 0,
        to: 0,
        vertical: false,
      };
      expect(() => { new Model(options); }).toThrowError(/^Value must be in range of min and max limits$/);
    });
    test('should throw error if curValue is more than max limit', () => {
      options = {
        limits: { min: 0, max: 100 },
        curValue: 150,
        showValueNote: true,
        step: 1,
        double: false,
        from: 0,
        to: 0,
        vertical: false,
      };
      expect(() => { new Model(options); }).toThrowError(/^Value must be in range of min and max limits$/);
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
    test('should throw error if valTo is more than limits.max or less than limits.min', () => {
      options = {
        limits: { min: 50, max: 100 },
        curValue: 85,
        showValueNote: true,
        step: 1,
        double: false,
        from: 30,
        to: 120,
        vertical: false,
      };
      expect(() => { new Model(options); }).toThrowError(/^Value must be in range of min and max limits$/);
    });
    test('should throw error if valFrom is more than limits.max or less than limits.min', () => {
      options = {
        limits: { min: 50, max: 100 },
        curValue: 85,
        showValueNote: true,
        step: 1,
        double: false,
        from: 30,
        to: 0,
        vertical: false,
      };
      expect(() => { new Model(options); }).toThrowError(/^Value must be in range of min and max limits$/);
    });
    test('should throw error if valFrom is more than valTo', () => {
      options = {
        limits: { min: 0, max: 100 },
        curValue: 85,
        showValueNote: true,
        step: 1,
        double: false,
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
    let callback3: Function;
    let callback4: Function;
    let callback5: Function;
    let callback6: Function;
    let callback7: Function;
    let callback8: Function;
    let callback9: Function;
    let callback10: Function;
    let callback11: Function;
    let callback12: Function;
    const $handler: HTMLElement = document.createElement('div');

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
        callback3 = jest.fn();
        callback4 = jest.fn();
        callback5 = jest.fn();
        callback6 = jest.fn();
        model.addObserver('calcHandlerPos', callback1);
        model.addObserver('setHandlerPos', callback2);
        model.addObserver('calcValueNotePos', callback3);
        model.addObserver('setValueNotePos', callback4);
        model.addObserver('setValueOfNote', callback5);
        model.addObserver('setBarWidth', callback6);
      });

      test('should set curValue', () => {
        const data = {
          newPos: 220, edge: 370, handler: $handler, isHandlerFrom: false,
        };
        model.setValueFromHandlerPos(data);
        expect(model.options.curValue).toBe(59);
      });
      test('should broadcast events', () => {
        const data = {
          newPos: 220, edge: 370, handler: $handler, isHandlerFrom: false,
        };
        model.setValueFromHandlerPos(data);
        expect(callback1).toBeCalled();
        expect(callback2).toBeCalled();
        expect(callback3).toBeCalled();
        expect(callback4).toBeCalled();
        expect(callback5).toBeCalled();
        expect(callback6).toBeCalled();
      });
      test('check that function calcValueWithStep is working properly (val less limits.min)', () => {
        const data = {
          newPos: -20, edge: 370, handler: $handler, isHandlerFrom: false,
        };
        model.setValueFromHandlerPos(data);
        expect(model.options.curValue).toBe(-4);
      });
      test('check that function calcValueWithStep is working properly (val more limits.max)', () => {
        const data = {
          newPos: 400, edge: 370, handler: $handler, isHandlerFrom: false,
        };
        model.setValueFromHandlerPos(data);
        expect(model.options.curValue).toBe(100);
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
        callback3 = jest.fn();
        callback4 = jest.fn();
        callback5 = jest.fn();
        callback6 = jest.fn();
        callback7 = jest.fn();
        callback8 = jest.fn();
        callback9 = jest.fn();
        callback10 = jest.fn();
        callback11 = jest.fn();
        callback12 = jest.fn();

        model.addObserver('calcHandlerPosForDouble', callback1);
        model.addObserver('setHandlerPosForDouble', callback2);
        model.addObserver('calcValueNotePosForDouble', callback3);
        model.addObserver('setValueNotePosForDouble', callback4);
        model.addObserver('setValueOfNoteForDouble', callback5);
        model.addObserver('setBarWidthForDouble', callback6);
        model.addObserver('setOneNote', callback7);

        model.addObserver('calcHandlerPos', callback8);
        model.addObserver('setHandlerPos', callback9);
        model.addObserver('calcValueNotePos', callback10);
        model.addObserver('setValueNotePos', callback11);
        model.addObserver('setValueOfNote', callback12);
      });

      test('should set curValue and check function isValFromMovesOverValTo is return true', () => {
        $handler.classList.add('adslider__handler_from');
        const data = {
          newPos: 100, edge: 370, handler: $handler, isHandlerFrom: true,
        };
        model.setValueFromHandlerPos(data);
        expect(model.options.from).toBe(0);
      });

      test('should set curValue and check function isValFromMovesOverValTo is return false', () => {
        $handler.classList.add('adslider__handler_from');
        const data = {
          newPos: 10, edge: 370, handler: $handler, isHandlerFrom: true,
        };
        model.setValueFromHandlerPos(data);
        expect(model.options.from).toBe(0);
      });

      test('should broadcast events', () => {
        $handler.classList.add('adslider__handler_from');
        const data = {
          newPos: 10, edge: 370, handler: $handler, isHandlerFrom: true,
        };
        model.setValueFromHandlerPos(data);
        expect(callback1).toBeCalled();
        expect(callback2).toBeCalled();
        expect(callback3).toBeCalled();
        expect(callback4).toBeCalled();
        expect(callback5).toBeCalled();
        expect(callback6).toBeCalled();
        expect(callback7).toBeCalled();
      });

      test('check that function isValFromMovesOverValTo() is working', () => {
        $handler.classList.remove('adslider__handler_from');
        const data = {
          newPos: -10, edge: 370, handler: $handler, isHandlerFrom: true,
        };
        model.setValueFromHandlerPos(data);
        expect(model.options.curValue).toBe(10);
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
        callback3 = jest.fn();
        callback4 = jest.fn();
        callback5 = jest.fn();
        callback6 = jest.fn();
        callback7 = jest.fn();
        callback8 = jest.fn();
        callback9 = jest.fn();
        callback10 = jest.fn();
        callback11 = jest.fn();
        callback12 = jest.fn();

        model.addObserver('calcHandlerPosForDouble', callback1);
        model.addObserver('setHandlerPosForDouble', callback2);
        model.addObserver('calcValueNotePosForDouble', callback3);
        model.addObserver('setValueNotePosForDouble', callback4);
        model.addObserver('setValueOfNoteForDouble', callback5);
        model.addObserver('setBarWidthForDouble', callback6);
        model.addObserver('setOneNote', callback7);
        model.addObserver('calcHandlerPos', callback8);
        model.addObserver('setHandlerPos', callback9);
        model.addObserver('calcValueNotePos', callback10);
        model.addObserver('setValueNotePos', callback11);
        model.addObserver('setValueOfNote', callback12);
      });
      test('check that function calcValueWithStep() is working', () => {
        $handler.classList.remove('adslider__handler_from');
        const data = {
          newPos: 481, edge: 504, handler: $handler, isHandlerFrom: true,
        };
        model.setValueFromHandlerPos(data);
        expect(model.options.curValue).toBe(90);
      });
    });
  });
});
