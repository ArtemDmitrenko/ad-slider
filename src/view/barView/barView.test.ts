import BarView from './barView';

describe('barView', () => {
  describe('addClass', () => {
    const $parent: HTMLElement = document.createElement('div');
    const bar = new BarView($parent);
    document.body.appendChild($parent);
    test('should set general className', () => {
      expect(($parent.firstElementChild as HTMLElement).className).toBe('adslider__bar');
    });
    test('should set className for vertical type, method setVerticalView', () => {
      bar.setVerticalView(true);
      expect(($parent.firstElementChild as HTMLElement).className).toBe('adslider__bar adslider__bar_direction_vertical');
    });
    test('should set className for horizontal type, method setVerticalView', () => {
      bar.setVerticalView(false);
      expect(($parent.firstElementChild as HTMLElement).className).toBe('adslider__bar adslider__bar_direction_horizontal');
    });

    describe('setLength method', () => {
      test('Function setLength: should set length of bar for single slider for horizontal view', () => {
        bar.setVerticalView(false);
        if ($parent.firstElementChild) {
          $parent.firstElementChild.getBoundingClientRect = jest.fn(() => ({
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
          const $handler: HTMLElement = document.createElement('div');
          $handler.style.left = '75.6px';
          $handler.style.width = '30px';
          bar.setLength($handler);
          if ($parent.firstElementChild) {
            expect(window.getComputedStyle($parent.firstElementChild).width).toBe('90px');
          }
        }
      });
      test('Function setLengthForDouble: should set length of bar for double slider for horizontal view', () => {
        bar.setVerticalView(false);
        if ($parent.firstElementChild) {
          $parent.firstElementChild.getBoundingClientRect = jest.fn(() => ({
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
          const $handler: HTMLElement = document.createElement('div');
          $handler.style.left = '302.4px';
          $handler.style.width = '30px';
          bar.setLengthForDouble({ valueFrom: 302, valueTo: 453, handler: $handler });
          if ($parent.firstElementChild) {
            expect(window.getComputedStyle($parent.firstElementChild).width).toBe('151px');
            expect(window.getComputedStyle($parent.firstElementChild).left).toBe('317px');
          }
        }
      });
      test('Function setLength: should set length of bar for single double for vertical view', () => {
        bar.setVerticalView(true);
        if ($parent.firstElementChild) {
          $parent.firstElementChild.getBoundingClientRect = jest.fn(() => ({
            x: 0,
            y: 0,
            width: 0,
            height: 140,
            top: 0,
            left: 0,
            right: 0,
            bottom: 154,
            toJSON: jest.fn(),
          }));
          const $handler: HTMLElement = document.createElement('div');
          $handler.style.bottom = '310px';
          $handler.style.width = '30px';
          bar.setLengthForDouble({ valueFrom: 139, valueTo: 310, handler: $handler });
          if ($parent.firstElementChild) {
            expect(window.getComputedStyle($parent.firstElementChild).height).toBe('171px');
            expect(window.getComputedStyle($parent.firstElementChild).bottom).toBe('154px');
          }
        }
      });
    });
  });
});
