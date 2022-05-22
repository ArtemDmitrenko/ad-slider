import HandlerView from './HandlerView';
import ValueNoteView from '../ValueNoteView/ValueNoteView';
import EventTypes from '../../EventObserver/eventTypes';

jest.mock('../ValueNoteView/ValueNoteView');

describe('handlerViewTo', () => {
  let parent: HTMLElement;
  let handlerViewTo: HandlerView;

  beforeEach(() => {
    (ValueNoteView as jest.Mock<ValueNoteView>).mockClear();
    parent = document.createElement('div');
    handlerViewTo = new HandlerView(parent);
  });

  test('Function render: should create element', () => {
    expect(handlerViewTo.getHandler()).not.toBeNull();
    expect(handlerViewTo.getHandler().tagName).toBe('DIV');
  });

  test('Function render: should add css-class', () => {
    expect(handlerViewTo.getHandler().classList.contains('adslider__handler')).toBe(true);
  });

  test('Function render: should append track to parent-element', () => {
    expect(handlerViewTo.getHandler().parentElement).toBe(parent);
  });

  test('Function render: should create instance of valueNoteView', () => {
    expect(ValueNoteView).toHaveBeenCalledTimes(1);
  });

  test('Function getLength: should get length of handler for vertical view', () => {
    handlerViewTo.getHandler().style.height = '20px';
    expect(handlerViewTo.getLength(true)).toBe(20);
  });

  test('Function getLength: should get length of handler', () => {
    handlerViewTo.getHandler().style.width = '10px';
    expect(handlerViewTo.getLength(false)).toBe(10);
  });

  test('Function setPos: should calc and set pos of handler for horizontal view', () => {
    const options = { edge: 370, value: 10, limits: { min: 0, max: 100 } };
    handlerViewTo.calcPos(options);
    handlerViewTo.setPos(false);
    expect(window.getComputedStyle(handlerViewTo.getHandler()).left).toBe('37px');
    expect(window.getComputedStyle(handlerViewTo.getHandler()).bottom).toBe('');
  });

  test('Function setPos: should calc and set pos of handler', () => {
    const options = { edge: 370, value: 10, limits: { min: 0, max: 100 } };
    handlerViewTo.calcPos(options);
    handlerViewTo.setPos(true);
    expect(window.getComputedStyle(handlerViewTo.getHandler()).left).toBe('');
    expect(window.getComputedStyle(handlerViewTo.getHandler()).bottom).toBe('37px');
  });

  test('Function getPos: should get position of handler for horizontal view', () => {
    handlerViewTo.getHandler().style.left = '15px';
    expect(handlerViewTo.getPos(false)).toBe(15);
  });

  test('Function getPos: should get position of handler for vertical view', () => {
    handlerViewTo.getHandler().style.bottom = '25px';
    expect(handlerViewTo.getPos(true)).toBe(25);
  });

  test('Function setValueForNote: should call method setValue of valueNoteView with parameter', () => {
    handlerViewTo.setValueForNote(10);
    const mockValueNoteViewInstance = (ValueNoteView as jest.Mock<ValueNoteView>).mock.instances[0];
    const mockSetValue = mockValueNoteViewInstance.setValue;
    expect(mockSetValue).toHaveBeenCalledWith(10);
    expect(mockSetValue).toHaveBeenCalledTimes(1);
  });

  test('Function showValueNote: should call method showValueNote of valueNoteView with parameter', () => {
    handlerViewTo.showValueNote(true);
    const mockValueNoteViewInstance = (ValueNoteView as jest.Mock<ValueNoteView>).mock.instances[0];
    const mockShowValueNote = mockValueNoteViewInstance.showValueNote;
    expect(mockShowValueNote).toHaveBeenCalledWith(true);
    expect(mockShowValueNote).toHaveBeenCalledTimes(1);
  });

  test('Function getValueNotePos: should call method getPos of valueNoteView with parameter', () => {
    handlerViewTo.getValueNotePos(true);
    const mockValueNoteViewInstance = (ValueNoteView as jest.Mock<ValueNoteView>).mock.instances[0];
    const mockGetPos = mockValueNoteViewInstance.getPos;
    expect(mockGetPos).toHaveBeenCalledWith(true);
    expect(mockGetPos).toHaveBeenCalledTimes(1);
  });

  test('Function getValueNoteSize: should call method getSize of valueNoteView with parameter', () => {
    handlerViewTo.getValueNoteSize(true);
    const mockValueNoteViewInstance = (ValueNoteView as jest.Mock<ValueNoteView>).mock.instances[0];
    const mockGetSize = mockValueNoteViewInstance.getSize;
    expect(mockGetSize).toHaveBeenCalledWith(true);
    expect(mockGetSize).toHaveBeenCalledTimes(1);
  });

  test('Function getValueOfNote: should call method getSize of valueNoteView', () => {
    handlerViewTo.getValueOfNote();
    const mockValueNoteViewInstance = (ValueNoteView as jest.Mock<ValueNoteView>).mock.instances[0];
    const mockGetValue = mockValueNoteViewInstance.getValue;
    expect(mockGetValue).toHaveBeenCalledTimes(1);
  });

  test('Function addClassToValueNoteElement: should call method addClassToNoteElement of valueNoteView with parameter', () => {
    handlerViewTo.addClassToValueNoteElement('test-class');
    const mockValueNoteViewInstance = (ValueNoteView as jest.Mock<ValueNoteView>).mock.instances[0];
    const mockAddClassToNoteElement = mockValueNoteViewInstance.addClassToNoteElement;
    expect(mockAddClassToNoteElement).toHaveBeenCalledWith('test-class');
    expect(mockAddClassToNoteElement).toHaveBeenCalledTimes(1);
  });

  test('Function deleteInstance: should delete noteElement of ValueNoteView', () => {
    handlerViewTo.deleteInstance();
    const mockValueNoteViewInstance = (ValueNoteView as jest.Mock<ValueNoteView>).mock.instances[0];
    const mockRemoveNoteElement = mockValueNoteViewInstance.removeNoteElement;
    expect(mockRemoveNoteElement).toHaveBeenCalledTimes(1);
  });

  test('Mousedown on handler should call handleHandlerMouseDown and handleHandlerMouseMove callbacks with exact parameters', () => {
    handlerViewTo.getHandler().style.width = '30px';
    handlerViewTo.getHandler().getBoundingClientRect = jest.fn(() => ({
      bottom: 0,
      height: 0,
      left: 170,
      right: 0,
      top: 0,
      width: 30,
      x: 0,
      y: 0,
      toJSON: jest.fn,
    }));
    const mockHandleHandlerMousedown = jest.fn();
    const mockHandleHandlerMousemove = jest.fn();
    handlerViewTo.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, mockHandleHandlerMousedown);
    handlerViewTo.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, mockHandleHandlerMousemove);

    const mouseDown = new MouseEvent('mousedown', { clientX: 185, clientY: 175 });
    const mouseMove = new MouseEvent('mousemove', { clientX: 144, clientY: 134 });
    const mouseUp = new MouseEvent('mouseup', { bubbles: true });

    handlerViewTo.getHandler().dispatchEvent(mouseDown);
    document.dispatchEvent(mouseMove);
    document.dispatchEvent(mouseUp);

    expect(mockHandleHandlerMousedown).toHaveBeenCalledWith({
      eventProps: {
        clientX: 185,
        clientY: 175,
      },
      handler: handlerViewTo.getHandler(),
    });

    expect(mockHandleHandlerMousemove).toHaveBeenCalledWith({
      shift: null,
      eventProps: {
        clientX: 144,
        clientY: 134,
        type: 'mousemove',
      },
      handler: handlerViewTo,
    });
  });
});
