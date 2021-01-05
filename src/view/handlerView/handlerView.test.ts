import HandlerView from './handlerView';

describe('handlerView', () => {
  let $parent: HTMLElement;
  let handlerView: HandlerView;

  beforeEach(() => {
    $parent = document.createElement('div');
    handlerView = new HandlerView($parent);
  });

  test('Function render: create element', () => {
    expect(handlerView.$handler).not.toBeNull();
    expect(handlerView.$handler.tagName).toBe('DIV');
  });

  test('Function render: add css-class', () => {
    expect(handlerView.$handler.classList.contains('adslider__handler')).toBe(true);
  });

  test('Function render: append track to parent-element', () => {
    expect(handlerView.$handler.parentElement).toBe($parent);
  });

  test('Function getWidth', () => {
    expect(handlerView.getWidth()).toBe(handlerView.$handler.offsetWidth);
  });

  test('Function setPos', () => {
    handlerView.setPos(5);
    expect(window.getComputedStyle(handlerView.$handler).left).toBe('5px')
  });
});
