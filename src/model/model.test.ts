import { Model, Config } from './model';

describe('model', () => {
  let options: Config;
  let model: Model;
  describe('init function', () => {
    beforeEach(() => {
      options = { curValue: 50, limits: { min: 0, max: 100 }, showValueNote: true };
      model = new Model(options);
    });
    test('should set correct curValue', () => {
      expect(model.curValue).toBe(50);
    });
    test('should set correct min limit', () => {
      expect(model.limits.min).toBe(0);
    });
    test('should set correct max limit', () => {
      expect(model.limits.max).toBe(100);
    });
    test('should set correct showValueNote', () => {
      expect(model.showValueNote).toBe(true);
    });
    describe('function setValueFromHandlerPos', () => {
      test('should set curValue depending on handler position in pixels', () => {
        const callback = jest.fn;
        model.addObserver('handlerMove', callback);
        model.setValueFromHandlerPos({ newLeft: 10, rightEdge: 370 });
        expect(model.curValue).toBe(3);
      });
    });
  });
  describe('init function if options are not correct', () => {
    test('should throw error if curValue is less than min limit', () => {
      options = { curValue: -50, limits: { min: 0, max: 100 }, showValueNote: true };
      expect(() => { new Model(options) }).toThrowError(/^Value must be in range of min and max limits$/);
    });
    test('should throw error if curValue is more than max limit', () => {
      options = { curValue: 150, limits: { min: 0, max: 100 }, showValueNote: true };
      expect(() => { new Model(options) }).toThrowError(/^Value must be in range of min and max limits$/);
    });
    test('should throw error if min limit is more than max limit', () => {
      options = { curValue: 50, limits: { min: 100, max: 0 }, showValueNote: true };
      expect(() => { new Model(options) }).toThrowError(/^Min can not be the same or more than Max$/);
    });
  });
});
