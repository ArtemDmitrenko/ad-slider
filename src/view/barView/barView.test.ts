import BarView from './barView';

describe('barView', () => {
  const $parent: HTMLElement = document.createElement('div');
  const barView = new BarView($parent);

  test('Function render: should create element', () => {
    expect(barView.$bar).not.toBeNull();
    expect(barView.$bar.tagName).toBe('DIV');
  });

  test('Function render: should add css-class', () => {
    expect(barView.$bar.classList.contains('adslider__bar')).toBe(true);
  });

  test('Function render: should append scale to parent-element', () => {
    expect(barView.$bar.parentElement).toBe($parent);
  });

  test('Function setVerticalView: should set vertical or horizontal view of bar', () => {
    barView.setVerticalView(false);
    expect(barView.$bar.classList.contains('adslider__bar_direction_horizontal')).toBe(
      true,
    );
    barView.setVerticalView(true);
    expect(barView.$bar.classList.contains('adslider__bar_direction_vertical')).toBe(
      true,
    );
  });

  test('Function setLength: should set length of bar for single slider for horizontal view', () => {
    const $handler: HTMLElement = document.createElement('div');
    $handler.style.left = '50px';
    $handler.style.width = '30px';
    barView.setVerticalView(false);
    barView.$bar.style.height = '30px';
    barView.setLength($handler);
    expect(window.getComputedStyle(barView.$bar).height).toBe('');
    expect(window.getComputedStyle(barView.$bar).width).toBe('65px');
  });

  test('Function setLength: should set length of bar for single slider for vertical view', () => {
    const $handler: HTMLElement = document.createElement('div');
    $handler.style.bottom = '60px';
    $handler.style.height = '40px';
    barView.setVerticalView(true);
    barView.$bar.style.width = '35px';
    barView.setLength($handler);
    expect(window.getComputedStyle(barView.$bar).width).toBe('');
    expect(window.getComputedStyle(barView.$bar).height).toBe('80px');
  });

  test('Function setLengthForDouble: should set length of bar for double slider for horizontal view when valFrom less than valTo', () => {
    const $handler: HTMLElement = document.createElement('div');
    $handler.style.width = '30px';
    const options: {
      handler: HTMLElement;
      edge: number;
      limits: { min: number; max: number };
      valueFrom: number;
      valueTo: number;
    } = {
      handler: $handler,
      edge: 370,
      limits: { min: 0, max: 100 },
      valueFrom: 40,
      valueTo: 90,
    };
    barView.setVerticalView(false);
    barView.$bar.style.height = '30px';
    barView.$bar.style.bottom = '40px';
    barView.setLengthForDouble(options);
    expect(window.getComputedStyle(barView.$bar).height).toBe('');
    expect(window.getComputedStyle(barView.$bar).bottom).toBe('');
    expect(window.getComputedStyle(barView.$bar).width).toBe('185px');
    expect(window.getComputedStyle(barView.$bar).left).toBe('163px');
  });

  test('Function setLengthForDouble: should set length of bar for double slider for vertical view when valFrom more than valTo', () => {
    const $handler: HTMLElement = document.createElement('div');
    $handler.style.width = '30px';
    const options: {
      handler: HTMLElement;
      edge: number;
      limits: { min: number; max: number };
      valueFrom: number;
      valueTo: number;
    } = {
      handler: $handler,
      edge: 370,
      limits: { min: 0, max: 100 },
      valueFrom: 90,
      valueTo: 40,
    };
    barView.setVerticalView(true);
    barView.$bar.style.width = '30px';
    barView.$bar.style.left = '40px';
    barView.setLengthForDouble(options);
    expect(window.getComputedStyle(barView.$bar).width).toBe('');
    expect(window.getComputedStyle(barView.$bar).left).toBe('');
    expect(window.getComputedStyle(barView.$bar).height).toBe('185px');
    expect(window.getComputedStyle(barView.$bar).bottom).toBe('163px');
  });
});
