import HandlerView from './HandlerView';
import EventTypes from '../../EventObserver/eventTypes';

describe('handlerViewTo', () => {
  let parent: HTMLElement;
  let handlerViewTo: HandlerView;

  beforeEach(() => {
    parent = document.createElement('div');
    handlerViewTo = new HandlerView(parent);
  });

  test('Function render: should create element', () => {
    expect(handlerViewTo.handler).not.toBeNull();
    expect(handlerViewTo.handler.tagName).toBe('DIV');
  });

  test('Function render: should add css-class', () => {
    expect(handlerViewTo.handler.classList.contains('adslider__handler')).toBe(true);
  });

  test('Function render: should append track to parent-element', () => {
    expect(handlerViewTo.handler.parentElement).toBe(parent);
  });

  test('Function getLength: should get length of handler', () => {
    handlerViewTo.handler.style.width = '10px';
    expect(handlerViewTo.getLength()).toBe(10);
    handlerViewTo.handler.classList.add('adslider__handler_direction_vertical');
    handlerViewTo.handler.style.height = '20px';
    expect(handlerViewTo.getLength()).toBe(20);
  });

  test('Function setPos: should calc and set pos of handler', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();
    handlerViewTo.addObserver(EventTypes.CALC_VALUE_NOTE_POSITION, callback1);
    handlerViewTo.addObserver(EventTypes.SET_VALUE_NOTE_POS, callback2);
    handlerViewTo.addObserver(EventTypes.SET_BAR, callback3);
    const options = { edge: 370, value: 10, limits: { min: 0, max: 100 } };
    handlerViewTo.calcPos(options);
    handlerViewTo.setPos(false);
    expect(window.getComputedStyle(handlerViewTo.handler).left).toBe('37px');
    expect(window.getComputedStyle(handlerViewTo.handler).bottom).toBe('');
    handlerViewTo.setVerticalView(true);
    handlerViewTo.setPos(false);
    expect(window.getComputedStyle(handlerViewTo.handler).left).toBe('');
    expect(window.getComputedStyle(handlerViewTo.handler).bottom).toBe('37px');
  });

  test('Function getPos: should get position of handler', () => {
    handlerViewTo.handler.style.left = '15px';
    expect(handlerViewTo.getPos()).toBe(15);
    handlerViewTo.handler.classList.add('adslider__handler_direction_vertical');
    handlerViewTo.handler.style.bottom = '25px';
    expect(handlerViewTo.getPos()).toBe(25);
  });

  test('Function setVerticalView: should set vertical or horizontal view of slider', () => {
    handlerViewTo.setVerticalView(false);
    expect(handlerViewTo.handler.classList.contains('adslider__handler_direction_horizontal')).toBe(true);
    handlerViewTo.setVerticalView(true);
    expect(handlerViewTo.handler.classList.contains('adslider__handler_direction_vertical')).toBe(true);
  });
});
