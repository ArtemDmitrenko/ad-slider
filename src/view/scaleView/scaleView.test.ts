import ScaleView from './ScaleView';

describe('scaleView', () => {
  const $parent: HTMLElement = document.createElement('div');
  const scaleView = new ScaleView($parent);

  test('Function render: should create element', () => {
    expect($parent.firstElementChild).not.toBeNull();
    expect(($parent.firstElementChild as HTMLElement).tagName).toBe('DIV');
  });

  test('Function render: should add css-class', () => {
    expect(($parent.firstElementChild as HTMLElement).classList.contains('adslider__scale')).toBe(true);
  });

  test('Function render: should append scale to parent-element', () => {
    expect(($parent.firstElementChild as HTMLElement).parentElement).toBe($parent);
  });

  test('Function drawScale: should draw scale depending on input data', () => {
    const $handler: HTMLElement = document.createElement('div');
    $handler.style.height = '30px';
    $parent.style.height = '400px';
    const options = {
      limits: { min: 0, max: 120 },
      curValue: 85,
      showValueNote: true,
      step: 15,
      double: true,
      from: 40,
      to: 90,
      vertical: true,
    };
    scaleView.drawScale(options, $handler);
    expect(($parent.firstElementChild as HTMLElement).classList.contains('adslider__scale_direction_vertical')).toBe(true);
    expect(window.getComputedStyle(($parent.firstElementChild as HTMLElement)).width).toBe('');
    expect(window.getComputedStyle(($parent.firstElementChild as HTMLElement)).left).toBe('');
    expect(window.getComputedStyle(($parent.firstElementChild as HTMLElement)).height).toBe('370px');
    expect(window.getComputedStyle(($parent.firstElementChild as HTMLElement)).top).toBe('15px');
    expect(($parent.firstElementChild as HTMLElement).children.length).toBe(9);
  });
});
