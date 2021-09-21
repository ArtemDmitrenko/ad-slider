import ScaleView from './scaleView';

describe('scaleView', () => {
  const $parent: HTMLElement = document.createElement('div');
  const scaleView = new ScaleView($parent);

  test('Function render: should create element', () => {
    expect(scaleView.$scale).not.toBeNull();
    expect(scaleView.$scale.tagName).toBe('DIV');
  });

  test('Function render: should add css-class', () => {
    expect(scaleView.$scale.classList.contains('adslider__scale')).toBe(true);
  });

  test('Function render: should append scale to parent-element', () => {
    expect(scaleView.$scale.parentElement).toBe($parent);
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
    expect(scaleView.$scale.classList.contains('adslider__scale_vertical')).toBe(true);
    expect(window.getComputedStyle(scaleView.$scale).width).toBe('');
    expect(window.getComputedStyle(scaleView.$scale).left).toBe('');
    expect(window.getComputedStyle(scaleView.$scale).height).toBe('370px');
    expect(window.getComputedStyle(scaleView.$scale).top).toBe('15px');
    expect(scaleView.$scale.children.length).toBe(9);
  });
});
