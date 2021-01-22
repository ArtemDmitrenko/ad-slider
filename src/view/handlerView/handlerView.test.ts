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

  test('Function getWidth: should get width of handler', () => {
    handlerView.$handler.style.width = '10px';
    expect(handlerView.getWidth()).toBe(10);
  });

  test('Function setPos: should set position of handler', () => {
    handlerView.setPos(5);
    expect(window.getComputedStyle(handlerView.$handler).left).toBe('5px')
  });
});
