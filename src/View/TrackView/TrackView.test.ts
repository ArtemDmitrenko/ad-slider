import TrackView from './TrackView';
import { IConfig } from '../../Model/Model';
import EventTypes from '../../EventObserver/eventTypes';

describe('view', () => {
  describe('Function render', () => {
    test('creating track HTML element with class "adslider__track"', () => {
      const parent: HTMLElement = document.createElement('div');
      new TrackView(parent);
      if (parent.firstElementChild) {
        expect(parent.firstElementChild.classList.contains('adslider__track')).toBe(true);
      }
    });
  });

  describe('Function addListeners', () => {
    test('should call handleTrackMouseDown after click on track', () => {
      const parent: HTMLElement = document.createElement('div');
      const track = new TrackView(parent);

      const mockHandleHandlerChangePosition = jest.fn();
      track.addObserver(EventTypes.CHANGE_POSITION, mockHandleHandlerChangePosition);

      const mockHandleTrackMouseDown = jest.fn();
      const trackElement = parent.firstElementChild as HTMLElement;
      trackElement.addEventListener('mousedown', mockHandleTrackMouseDown);
      const mouseDown = new MouseEvent('mousedown');
      trackElement.dispatchEvent(mouseDown);
      expect(mockHandleTrackMouseDown).toHaveBeenCalledTimes(1);
    });

    test('should broadcast event CHANGE_POSITION with exact parameters when click on track', () => {
      const parent: HTMLElement = document.createElement('div');
      const track = new TrackView(parent);
      const handlerTo = parent.querySelector('.adslider__handler') as HTMLElement;
      handlerTo.style.width = '30px';
      const trackElement = parent.firstElementChild as HTMLElement;
      trackElement.style.width = '400px';
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: false,
        from: 20,
        to: 50,
        step: 1,
      };
      track.updateTrackView(options);
      const mockHandleHandlerChangePosition = jest.fn();
      track.addObserver(EventTypes.CHANGE_POSITION, mockHandleHandlerChangePosition);

      const mouseDown = new MouseEvent('mousedown', { clientX: 150 });
      trackElement.dispatchEvent(mouseDown);
      expect(mockHandleHandlerChangePosition).toHaveBeenCalledWith({
        relPosition: 0.36486486486486486,
        isFromValueChanging: false,
      });
    });

    test('horizontal view single slider: should broadcast event CHANGE_POSITION with exact parameters when drag&drop handler', () => {
      const parent: HTMLElement = document.createElement('div');
      const track = new TrackView(parent);
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: false,
        from: 20,
        to: 50,
        step: 1,
      };
      track.updateTrackView(options);

      const mockHandleHandlerChangePosition = jest.fn();
      track.addObserver(EventTypes.CHANGE_POSITION, mockHandleHandlerChangePosition);
      const handlerTo = parent.querySelector('.adslider__handler') as HTMLElement;
      handlerTo.style.width = '30px';
      const trackElement = parent.firstElementChild as HTMLElement;
      trackElement.style.width = '400px';
      const mouseDown = new MouseEvent('mousedown');
      const mouseMove = new MouseEvent('mousemove', { clientX: 100 });
      handlerTo.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);
      expect(mockHandleHandlerChangePosition).toHaveBeenCalledWith({
        relPosition: 0.2702702702702703,
        isFromValueChanging: false,
      });
    });

    test('vertical view single slider: should broadcast event CHANGE_POSITION with exact parameters when drag&drop handler', () => {
      const parent: HTMLElement = document.createElement('div');
      const track = new TrackView(parent);
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: true,
        isDouble: false,
        from: 20,
        to: 50,
        step: 1,
      };
      track.updateTrackView(options);

      const mockHandleHandlerChangePosition = jest.fn();
      track.addObserver(EventTypes.CHANGE_POSITION, mockHandleHandlerChangePosition);
      const handlerTo = parent.querySelector('.adslider__handler') as HTMLElement;
      handlerTo.style.height = '30px';
      const trackElement = parent.firstElementChild as HTMLElement;
      trackElement.style.height = '400px';
      const mouseDown = new MouseEvent('mousedown');
      const mouseMove = new MouseEvent('mousemove', { clientY: 200 });
      handlerTo.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);
      expect(mockHandleHandlerChangePosition).toHaveBeenCalledWith({
        relPosition: 0, isFromValueChanging: false,
      });
    });
  });

  describe('Function updateTrackView for single slider', () => {
    let handlerTo: HTMLElement;
    let parent: HTMLElement;
    let track: TrackView;

    beforeEach(() => {
      parent = document.createElement('div');
      track = new TrackView(parent);
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: false,
        from: 20,
        to: 50,
        step: 1,
      };
      handlerTo = parent.querySelector('.adslider__handler') as HTMLElement;
      handlerTo.style.width = '30px';
      handlerTo.style.left = '100px';
      const trackElement = parent.firstElementChild as HTMLElement;
      trackElement.style.width = '400px';
      track.updateTrackView(options);
    });

    test('should set position of handler', () => {
      expect(handlerTo.style.left).toBe('185px');
    });

    test('should set width of bar', () => {
      const bar = parent.querySelector('.adslider__bar') as HTMLElement;
      expect(bar.style.width).toBe('200px');
    });

    test('should set value of note', () => {
      const value = parent.querySelector('.adslider__value') as HTMLElement;
      expect(value.textContent).toBe('50');
    });

    test('should render handlerFrom when update slider to double', () => {
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: true,
        from: 20,
        to: 50,
        step: 1,
      };
      track.updateTrackView(options);
      handlerTo = parent.querySelectorAll('.adslider__handler')[0] as HTMLElement;
      const handlerFrom = parent.querySelectorAll('.adslider__handler')[1] as HTMLElement;
      expect(handlerTo).toBeTruthy();
      expect(handlerFrom).toBeTruthy();
    });
  });

  describe('Function updateTrackView for double slider in case of small distance between notes', () => {
    let handlerTo: HTMLElement;
    let parent: HTMLElement;
    let valueNoteCommon: HTMLElement;
    let track: TrackView;
    beforeEach(() => {
      parent = document.createElement('div');
      track = new TrackView(parent);
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: true,
        from: 49,
        to: 50,
        step: 1,
      };
      handlerTo = parent.querySelectorAll('.adslider__handler')[0] as HTMLElement;
      const handlerFrom = parent.querySelectorAll('.adslider__handler')[1] as HTMLElement;
      handlerTo.style.width = '30px';
      handlerFrom.style.width = '30px';
      handlerTo.style.left = '50px';
      handlerFrom.style.left = '50px';
      const trackElement = parent.firstElementChild as HTMLElement;
      trackElement.style.width = '400px';
      const valueNoteTo = parent.querySelectorAll('.adslider__note')[0] as HTMLElement;
      const valueNoteFrom = parent.querySelectorAll('.adslider__note')[1] as HTMLElement;
      valueNoteTo.style.width = '32px';
      valueNoteFrom.style.width = '32px';

      track.updateTrackView(options);
      valueNoteCommon = parent.querySelector('.adslider__note_common') as HTMLElement;
    });

    test('should set value of common note', () => {
      expect(valueNoteCommon.textContent).toBe('49 - 50');
    });

    test('should delete common note when changing values', () => {
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: true,
        from: 20,
        to: 50,
        step: 1,
      };
      track.updateTrackView(options);
      valueNoteCommon = parent.querySelector('.adslider__note_common') as HTMLElement;
      expect(valueNoteCommon).toBeNull();
    });

    test('should delete common note when changes from double slider to single', () => {
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: false,
        from: 20,
        to: 50,
        step: 1,
      };
      track.updateTrackView(options);
      valueNoteCommon = parent.querySelector('.adslider__note_common') as HTMLElement;
      const handlerFrom = parent.querySelectorAll('.adslider__handler')[1] as HTMLElement;

      expect(valueNoteCommon).toBeNull();
      expect(handlerFrom).toBeUndefined();
    });

    test('should hide common note when update slider', () => {
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: false,
        isVertical: false,
        isDouble: true,
        from: 49,
        to: 50,
        step: 1,
      };
      track.updateTrackView(options);
      valueNoteCommon = parent.querySelector('.adslider__note_common') as HTMLElement;
      expect(valueNoteCommon.classList.contains('adslider__note_hide')).toBe(true);
    });
  });

  describe('Function calcHandlerPos', () => {
    let handlerTo: HTMLElement;
    let handlerFrom: HTMLElement;
    let parent: HTMLElement;
    let track: TrackView;
    beforeEach(() => {
      parent = document.createElement('div');
      track = new TrackView(parent);
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: true,
        from: 20,
        to: 50,
        step: 1,
      };
      handlerTo = parent.querySelectorAll('.adslider__handler')[0] as HTMLElement;
      handlerFrom = parent.querySelectorAll('.adslider__handler')[1] as HTMLElement;
      handlerTo.style.width = '30px';
      handlerFrom.style.width = '30px';
      handlerTo.style.left = '50px';
      handlerFrom.style.left = '50px';
      const trackElement = parent.firstElementChild as HTMLElement;
      trackElement.style.width = '400px';
      const valueNoteTo = parent.querySelectorAll('.adslider__note')[0] as HTMLElement;
      const valueNoteFrom = parent.querySelectorAll('.adslider__note')[1] as HTMLElement;
      valueNoteTo.style.width = '32px';
      valueNoteFrom.style.width = '32px';

      track.updateTrackView(options);
    });

    test('should set position of handlerFrom', () => {
      track.calcHandlerPos({
        value: 10,
        limits: { min: 0, max: 100 },
        isFromValueChanging: true,
      });
      expect(handlerFrom.style.left).toBe('74px');
    });

    test('should set value of handlerFrom', () => {
      track.calcHandlerPos({
        value: 10,
        limits: { min: 0, max: 100 },
        isFromValueChanging: true,
      });
      const valueFrom = parent.querySelectorAll('.adslider__value')[1] as HTMLElement;
      expect(valueFrom.textContent).toBe('10');
    });

    test('should set position of handlerTo', () => {
      track.calcHandlerPos({
        value: 90,
        limits: { min: 0, max: 100 },
        isFromValueChanging: false,
      });
      expect(handlerTo.style.left).toBe('185px');
    });

    test('should set value of handlerTo', () => {
      track.calcHandlerPos({
        value: 90,
        limits: { min: 0, max: 100 },
        isFromValueChanging: false,
      });
      const valueTo = parent.querySelectorAll('.adslider__value')[0] as HTMLElement;
      expect(valueTo.textContent).toBe('90');
    });
  });

  describe('Function setHandlerPos', () => {
    let handlerTo: HTMLElement;
    let handlerFrom: HTMLElement;
    let parent: HTMLElement;
    let track: TrackView;
    beforeEach(() => {
      parent = document.createElement('div');
      track = new TrackView(parent);
      const options: IConfig = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: true,
        from: 30,
        to: 50,
        step: 1,
      };
      handlerTo = parent.querySelectorAll('.adslider__handler')[0] as HTMLElement;
      handlerFrom = parent.querySelectorAll('.adslider__handler')[1] as HTMLElement;
      handlerTo.style.width = '30px';
      handlerFrom.style.width = '30px';
      handlerTo.style.left = '50px';
      handlerFrom.style.left = '50px';
      const trackElement = parent.firstElementChild as HTMLElement;
      trackElement.style.width = '400px';
      const valueNoteTo = parent.querySelectorAll('.adslider__note')[0] as HTMLElement;
      const valueNoteFrom = parent.querySelectorAll('.adslider__note')[1] as HTMLElement;
      valueNoteTo.style.width = '32px';
      valueNoteFrom.style.width = '32px';

      track.updateTrackView(options);
    });

    test('should set position of handlerFrom', () => {
      track.setHandlerPos({
        hasValueNote: true,
        isFromValueChanging: true,
      });
      expect(handlerFrom.style.left).toBe('111px');
    });

    test('should set value of handlerFrom', () => {
      track.setHandlerPos({
        hasValueNote: true,
        isFromValueChanging: true,
      });
      const valueFrom = parent.querySelectorAll('.adslider__value')[1] as HTMLElement;
      expect(valueFrom.textContent).toBe('30');
    });

    test('should set position of handlerTo', () => {
      track.setHandlerPos({
        hasValueNote: true,
        isFromValueChanging: false,
      });
      expect(handlerTo.style.left).toBe('185px');
    });

    test('should set value of handlerTo', () => {
      track.setHandlerPos({
        hasValueNote: true,
        isFromValueChanging: false,
      });
      const valueTo = parent.querySelectorAll('.adslider__value')[0] as HTMLElement;
      expect(valueTo.textContent).toBe('50');
    });
  });
});
