import BarView from './BarView';

describe('barView', () => {
  describe('addClass', () => {
    const parent: HTMLElement = document.createElement('div');
    const bar = new BarView(parent);
    document.body.appendChild(parent);
    test('should set general className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('adslider__bar');
    });

    describe('setLength method', () => {
      test('Function setLength: should set length of bar for single slider for horizontal view', () => {
        if (parent.firstElementChild) {
          parent.firstElementChild.getBoundingClientRect = jest.fn(() => ({
            x: 0,
            y: 0,
            width: 453,
            height: 0,
            top: 0,
            left: 15,
            right: 0,
            bottom: 0,
            toJSON: jest.fn(),
          }));
          const handler: HTMLElement = document.createElement('div');
          handler.style.left = '80px';
          handler.style.width = '30px';
          bar.setLength(handler, false);
          if (parent.firstElementChild) {
            expect(window.getComputedStyle(parent.firstElementChild).width).toBe('95px');
          }
        }
      });

      test('Function setLength: should set length of bar for single slider for vertical view', () => {
        if (parent.firstElementChild) {
          parent.firstElementChild.getBoundingClientRect = jest.fn(() => ({
            x: 0,
            y: 0,
            width: 453,
            height: 0,
            top: 0,
            left: 15,
            right: 0,
            bottom: 0,
            toJSON: jest.fn(),
          }));
          const handler: HTMLElement = document.createElement('div');
          handler.style.bottom = '60px';
          handler.style.height = '30px';
          bar.setLength(handler, true);
          if (parent.firstElementChild) {
            expect(window.getComputedStyle(parent.firstElementChild).height).toBe('75px');
          }
        }
      });

      test('Function setLengthForDouble: should set length of bar for double slider for horizontal view', () => {
        if (parent.firstElementChild) {
          parent.firstElementChild.getBoundingClientRect = jest.fn(() => ({
            x: 0,
            y: 0,
            width: 101,
            height: 0,
            top: 0,
            left: 367,
            right: 0,
            bottom: 0,
            toJSON: jest.fn(),
          }));
          const handler: HTMLElement = document.createElement('div');
          handler.style.left = '300px';
          handler.style.width = '30px';
          bar.setLengthForDouble({
            valueFrom: 302,
            valueTo: 453,
            handler,
            isVertical: false,
          });
          if (parent.firstElementChild) {
            expect(window.getComputedStyle(parent.firstElementChild).width).toBe('151px');
            expect(window.getComputedStyle(parent.firstElementChild).left).toBe('317px');
          }
        }
      });

      test('Function setLengthForDouble: should set length of bar for double slider for vertical view', () => {
        if (parent.firstElementChild) {
          parent.firstElementChild.getBoundingClientRect = jest.fn(() => ({
            x: 0,
            y: 0,
            width: 101,
            height: 0,
            top: 0,
            left: 367,
            right: 0,
            bottom: 0,
            toJSON: jest.fn(),
          }));
          const handler: HTMLElement = document.createElement('div');
          handler.style.left = '300px';
          handler.style.width = '30px';
          bar.setLengthForDouble({
            valueFrom: 450,
            valueTo: 350,
            handler,
            isVertical: true,
          });
          if (parent.firstElementChild) {
            expect(window.getComputedStyle(parent.firstElementChild).height).toBe('100px');
            expect(window.getComputedStyle(parent.firstElementChild).bottom).toBe('365px');
          }
        }
      });
    });
  });
});
