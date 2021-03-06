import HandlerView from './handlerView';

describe('handlerView', () => {
  let $parent: HTMLElement;
  let handlerView: HandlerView;

  beforeEach(() => {
    $parent = document.createElement('div');
    handlerView = new HandlerView($parent);
  });

  test('Function render: should create element', () => {
    expect(handlerView.$handler).not.toBeNull();
    expect(handlerView.$handler.tagName).toBe('DIV');
  });

  test('Function render: should add css-class', () => {
    expect(handlerView.$handler.classList.contains('adslider__handler')).toBe(true);
  });

  test('Function render: should append track to parent-element', () => {
    expect(handlerView.$handler.parentElement).toBe($parent);
  });

  test('Function getLength: should get length of handler', () => {
    handlerView.$handler.style.width = '10px';
    expect(handlerView.getLength()).toBe(10);
    handlerView.$handler.classList.add('adslider__handler_vertical');
    handlerView.$handler.style.height = '20px';
    expect(handlerView.getLength()).toBe(20);
  });

  test('Function setPos: should calc and set pos of handler', () => {
    const options = { edge: 370, value: 10, limits: { min: 0, max: 100 } };
    handlerView.calcPos(options);
    handlerView.setPos();
    expect(window.getComputedStyle(handlerView.$handler).left).toBe('37px');
    expect(window.getComputedStyle(handlerView.$handler).bottom).toBe('');
    handlerView.setVerticalView(true);
    handlerView.setPos();
    expect(window.getComputedStyle(handlerView.$handler).left).toBe('');
    expect(window.getComputedStyle(handlerView.$handler).bottom).toBe('37px');
  });

  test('Function getPos: should get position of handler', () => {
    handlerView.$handler.style.left = '15px';
    expect(handlerView.getPos()).toBe(15);
    handlerView.$handler.classList.add('adslider__handler_vertical');
    handlerView.$handler.style.bottom = '25px';
    expect(handlerView.getPos()).toBe(25);
  });

  test('Function setVerticalView: should set vertical or horizontal view of slider', () => {
    handlerView.setVerticalView(false);
    expect(handlerView.$handler.classList.contains('adslider__handler_horizontal')).toBe(true);
    handlerView.setVerticalView(true);
    expect(handlerView.$handler.classList.contains('adslider__handler_vertical')).toBe(true);
  });
});
