import ScaleView from './ScaleView';

describe('scaleView', () => {
  const parent: HTMLElement = document.createElement('div');
  const scaleView = new ScaleView(parent);

  test('Function render: should create element', () => {
    expect(parent.firstElementChild).not.toBeNull();
    expect((parent.firstElementChild as HTMLElement).tagName).toBe('DIV');
  });

  test('Function render: should add css-class', () => {
    expect((parent.firstElementChild as HTMLElement).classList.contains('adslider__scale')).toBe(true);
  });

  test('Function render: should append scale to parent-element', () => {
    expect((parent.firstElementChild as HTMLElement).parentElement).toBe(parent);
  });

  describe('Function drawScale for vertical view', () => {
    beforeEach(() => {
      const handler: HTMLElement = document.createElement('div');
      handler.style.height = '30px';
      parent.style.height = '400px';
      const options = {
        limits: { min: 0, max: 120 },
        hasValueNote: true,
        step: 15,
        isDouble: true,
        from: 40,
        to: 90,
        isVertical: true,
      };
      scaleView.drawScale(options, handler);
    });

    test('should set empty width and left properties', () => {
      expect(window.getComputedStyle((parent.firstElementChild as HTMLElement)).width).toBe('');
      expect(window.getComputedStyle((parent.firstElementChild as HTMLElement)).left).toBe('');
    });

    test('should set height and top properties', () => {
      expect(window.getComputedStyle((parent.firstElementChild as HTMLElement)).height).toBe('370px');
      expect(window.getComputedStyle((parent.firstElementChild as HTMLElement)).top).toBe('15px');
    });

    test('should set amount of scale lines', () => {
      expect((parent.firstElementChild as HTMLElement).children.length).toBe(9);
    });
  });

  describe('Function drawScale for horizontal view', () => {
    beforeEach(() => {
      const handler: HTMLElement = document.createElement('div');
      handler.style.width = '30px';
      parent.style.width = '400px';
      const options = {
        limits: { min: 0, max: 120 },
        hasValueNote: true,
        step: 15,
        isDouble: true,
        from: 40,
        to: 90,
        isVertical: false,
      };
      scaleView.drawScale(options, handler);
    });

    test('should set empty height and bottom properties', () => {
      expect(window.getComputedStyle((parent.firstElementChild as HTMLElement)).height).toBe('');
      expect(window.getComputedStyle((parent.firstElementChild as HTMLElement)).bottom).toBe('');
    });

    test('should set width and left properties', () => {
      expect(window.getComputedStyle((parent.firstElementChild as HTMLElement)).width).toBe('370px');
      expect(window.getComputedStyle((parent.firstElementChild as HTMLElement)).left).toBe('15px');
    });

    test('should set amount of scale lines', () => {
      expect((parent.firstElementChild as HTMLElement).children.length).toBe(9);
    });
  });
});
