import EventObserver from './EventObserver';

describe('EventObserver', () => {
  let eventObserver: EventObserver;
  let mockFn: (data: number) => number;
  let newmockFn: (data: number) => number;
  describe('function addObserver', () => {
    test('should add new observer to the list', () => {
      eventObserver = new EventObserver();
      mockFn = jest.fn();
      eventObserver.addObserver('mousedown', mockFn);
      expect(eventObserver.observers.mousedown.includes(mockFn)).toBeTruthy();
    });
    test('should add new observer with the same event to the list', () => {
      newmockFn = jest.fn();
      eventObserver.addObserver('mousedown', newmockFn);
      expect(eventObserver.observers.mousedown.includes(newmockFn)).toBeTruthy();
    });
    test('should throw error if new observer is already in the list', () => {
      expect(() => { eventObserver.addObserver('mousedown', mockFn); }).toThrowError(/^Observer is already in the list!$/);
    });
  });
  describe('function broadcast', () => {
    test('should call callbacks in the list', () => {
      eventObserver = new EventObserver();
      mockFn = jest.fn((data) => data + 5);
      newmockFn = jest.fn((data) => data + 10);
      eventObserver.addObserver('mousedown', mockFn);
      eventObserver.addObserver('mousedown', newmockFn);
      eventObserver.broadcast('mousedown', 10);
      expect(mockFn).toBeCalled();
      expect(newmockFn).toBeCalled();
    });
    test('should throw error if there is no such event in the list', () => {
      expect(() => { eventObserver.broadcast('mouseup', 10); }).toThrowError(/^There is no such observer in the list!$/);
    });
  });
});
