import TrackView from './TrackView';
import { IConfig } from '../../Model/Model';
import HandlerView from '../HandlerView/HandlerView';
import ScaleView from '../ScaleView/ScaleView';
import BarView from '../BarView/BarView';
import ValueNoteView from '../ValueNoteView/ValueNoteView';
import EventTypes from '../../EventObserver/eventTypes';

jest.mock('../HandlerView/HandlerView');
jest.mock('../ScaleView/ScaleView');
jest.mock('../BarView/BarView');
jest.mock('../ValueNoteView/ValueNoteView');

describe('view', () => {
  const parent: HTMLElement = document.createElement('div');
  let track: TrackView;

  describe('Function render', () => {
    track = new TrackView(parent);

    test('Function render: creating track', () => {
      expect(track).toBeTruthy();
    });
  });

  describe('Function updateTrackView', () => {
    describe('For single slider with horizontal view', () => {
      let options: IConfig;

      beforeEach(() => {
        HandlerView.mockClear();
        ScaleView.mockClear();
        BarView.mockClear();

        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          isVertical: false,
          isDouble: false,
          from: 20,
          to: 50,
          step: 1,
        };
        const returnOfGetHandler = document.createElement('div');
        const mockGetHandler = jest.fn();
        HandlerView.prototype.getHandler = mockGetHandler;
        mockGetHandler.mockReturnValue(returnOfGetHandler);

        track = new TrackView(parent);
        track.updateTrackView(options);
      });

      test('should call method of HandlerView calcPos', () => {
        const mockHandlerViewInstance = HandlerView.mock.instances[0];
        const mockCalcPos = mockHandlerViewInstance.calcPos;
        expect(mockCalcPos).toHaveBeenCalledTimes(1);
      });

      test('should call method of HandlerView setPos', () => {
        const mockHandlerViewInstance = HandlerView.mock.instances[0];
        const mockSetPos = mockHandlerViewInstance.setPos;
        expect(mockSetPos).toHaveBeenCalledTimes(1);
      });

      test('should call method of HandlerView setValueForNote', () => {
        const mockHandlerViewInstance = HandlerView.mock.instances[0];
        const mockSetValueForNote = mockHandlerViewInstance.setValueForNote;
        expect(mockSetValueForNote).toHaveBeenCalledTimes(1);
      });

      test('should call method of HandlerView showValueNote', () => {
        const mockHandlerViewInstance = HandlerView.mock.instances[0];
        const mockShowValueNote = mockHandlerViewInstance.showValueNote;
        expect(mockShowValueNote).toHaveBeenCalledTimes(1);
      });

      test('should call method of ScaleView drawScale', () => {
        const mockScaleViewInstance = ScaleView.mock.instances[0];
        const mockDrawScale = mockScaleViewInstance.drawScale;
        expect(mockDrawScale).toHaveBeenCalledTimes(1);
      });

      test('should call method of BarView setBar', () => {
        const mockBarViewInstance = BarView.mock.instances[0];
        const mockSetLength = mockBarViewInstance.setLength;
        expect(mockSetLength).toHaveBeenCalledTimes(1);
      });
    });

    describe('For double slider with horizontal view', () => {
      let options: IConfig;

      beforeEach(() => {
        HandlerView.mockClear();
        ScaleView.mockClear();
        BarView.mockClear();

        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          isVertical: false,
          isDouble: true,
          from: 20,
          to: 50,
          step: 1,
        };
        const returnOfGetHandler = document.createElement('div');
        const mockGetHandler = jest.fn();
        HandlerView.prototype.getHandler = mockGetHandler;
        mockGetHandler.mockReturnValue(returnOfGetHandler);

        track = new TrackView(parent);
        track.updateTrackView(options);
      });

      test('should call method of HandlerView calcPos', () => {
        const mockHandlerViewInstance = HandlerView.mock.instances[0];
        const mockCalcPos = mockHandlerViewInstance.calcPos;
        expect(mockCalcPos).toHaveBeenCalledTimes(1);
      });

      test('should call method of HandlerView setPos', () => {
        const mockHandlerViewInstance = HandlerView.mock.instances[0];
        const mockSetPos = mockHandlerViewInstance.setPos;
        expect(mockSetPos).toHaveBeenCalledTimes(1);
      });

      test('should call method of HandlerView setValueForNote', () => {
        const mockHandlerViewInstance = HandlerView.mock.instances[0];
        const mockSetValueForNote = mockHandlerViewInstance.setValueForNote;
        expect(mockSetValueForNote).toHaveBeenCalledTimes(1);
      });

      test('should call method of HandlerView showValueNote', () => {
        const mockHandlerViewInstance = HandlerView.mock.instances[0];
        const mockShowValueNote = mockHandlerViewInstance.showValueNote;
        expect(mockShowValueNote).toHaveBeenCalledTimes(1);
      });

      test('should call method of ScaleView drawScale', () => {
        const mockScaleViewInstance = ScaleView.mock.instances[0];
        const mockDrawScale = mockScaleViewInstance.drawScale;
        expect(mockDrawScale).toHaveBeenCalledTimes(1);
      });

      test('should call method of BarView setLengthForDouble', () => {
        const mockBarViewInstance = BarView.mock.instances[0];
        const mockSetLengthForDouble = mockBarViewInstance.setLengthForDouble;
        expect(mockSetLengthForDouble).toBeCalled();
      });
    });

    describe('For double slider with common note of horizontal view', () => {
      let options: IConfig;

      beforeEach(() => {
        HandlerView.mockClear();
        ValueNoteView.mockClear();

        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          isVertical: false,
          isDouble: true,
          from: 48,
          to: 50,
          step: 1,
        };
        const returnOfGetHandler = document.createElement('div');
        const mockGetHandler = jest.fn();
        HandlerView.prototype.getHandler = mockGetHandler;
        mockGetHandler.mockReturnValue(returnOfGetHandler);
      });

      test('should call methods of TrackView removeClassToNoteElement', () => {
        const myIsSmallDistanceBetweenNotes = jest.spyOn(TrackView.prototype as any, 'isSmallDistanceBetweenNotes');
        myIsSmallDistanceBetweenNotes.mockReturnValue(true);
        track = new TrackView(parent);
        track.updateTrackView(options);


        const mockValueNoteViewInstance = ValueNoteView.mock.instances[0];
        const mockRemoveClassToNoteElement = mockValueNoteViewInstance.removeClassToNoteElement;
        expect(mockRemoveClassToNoteElement).toBeCalled();
      });

      test('should call methods of TrackView addClassToNoteElement', () => {
        const myIsSmallDistanceBetweenNotes = jest.spyOn(TrackView.prototype as any, 'isSmallDistanceBetweenNotes');
        myIsSmallDistanceBetweenNotes.mockReturnValue(true);
        track = new TrackView(parent);
        track.updateTrackView(options);


        const mockValueNoteViewInstance = ValueNoteView.mock.instances[0];
        const mockAddClassToNoteElement = mockValueNoteViewInstance.addClassToNoteElement;
        expect(mockAddClassToNoteElement).toBeCalled();
      });

      test('should call methods of TrackView addClassToNoteElement', () => {
        const myIsSmallDistanceBetweenNotes = jest.spyOn(TrackView.prototype as any, 'isSmallDistanceBetweenNotes');
        myIsSmallDistanceBetweenNotes.mockReturnValue(true);
        track = new TrackView(parent);
        track.updateTrackView(options);
        myIsSmallDistanceBetweenNotes.mockReturnValue(false);
        track.updateTrackView(options);
        const mockHandlerViewInstance = HandlerView.mock.instances[0];
        const mockShowValueNote = mockHandlerViewInstance.showValueNote;
        expect(mockShowValueNote).toBeCalled();
      });
    });
  });

  describe('Function calcHandlerPos', () => {
    let options: IConfig;
    beforeEach(() => {
      HandlerView.mockClear();
      ScaleView.mockClear();
      BarView.mockClear();

      options = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: false,
        from: 20,
        to: 50,
        step: 1,
      };
      const returnOfGetHandler = document.createElement('div');
      const mockGetHandler = jest.fn();
      HandlerView.prototype.getHandler = mockGetHandler;
      mockGetHandler.mockReturnValue(returnOfGetHandler);

      track = new TrackView(parent);
      track.updateTrackView(options);

      const data = {
        limits: { min: 0, max: 100 },
        value: 50,
        isFromValueChanging: false,
      };
      track.calcHandlerPos(data);
    });

    test('should call method of HandlerView calcPos', () => {
      const mockHandlerViewInstance = HandlerView.mock.instances[0];
      const mockCalcPos = mockHandlerViewInstance.calcPos;
      expect(mockCalcPos).toBeCalled();
    });

    test('should call method of HandlerView setPos', () => {
      const mockHandlerViewInstance = HandlerView.mock.instances[0];
      const mockSetPos = mockHandlerViewInstance.setPos;
      expect(mockSetPos).toBeCalled();
    });
  });

  describe('Function setHandlerPos', () => {
    let options: IConfig;
    beforeEach(() => {
      HandlerView.mockClear();
      ScaleView.mockClear();
      BarView.mockClear();

      options = {
        limits: { min: 0, max: 100 },
        hasValueNote: true,
        isVertical: false,
        isDouble: false,
        from: 20,
        to: 50,
        step: 1,
      };

      const returnOfGetHandler = document.createElement('div');
      const mockGetHandler = jest.fn();
      HandlerView.prototype.getHandler = mockGetHandler;
      mockGetHandler.mockReturnValue(returnOfGetHandler);

      track = new TrackView(parent);
      track.updateTrackView(options);

      const data = {
        hasValueNote: true,
        isFromValueChanging: true,
      };
      track.setHandlerPos(data);
    });

    test('should call method of HandlerView setPos', () => {
      const mockHandlerViewInstance = HandlerView.mock.instances[0];
      const mockSetPos = mockHandlerViewInstance.setPos;
      expect(mockSetPos).toBeCalled();
    });
  });

  describe('Function addListeners', () => {
    describe('For single slider', () => {
      let options: IConfig;
      let callback: () => void;
      let mousedown: MouseEvent;
      let mousemove: MouseEvent;
      let mouseup: MouseEvent;
      let trackElement: HTMLElement;
      beforeEach(() => {
        HandlerView.mockClear();
        ScaleView.mockClear();
        BarView.mockClear();
  
        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          isVertical: false,
          isDouble: true,
          from: 20,
          to: 50,
          step: 1,
        };
        const returnOfGetHandler = document.createElement('div');
        // returnOfGetHandler.style.left = '50px';
        // returnOfGetHandler.style.top = '50px';

        const mockGetHandler = jest.fn();
        HandlerView.prototype.getHandler = mockGetHandler;
        mockGetHandler.mockReturnValue(returnOfGetHandler);
        
        track = new TrackView(parent);
        // track.updateTrackView(options);
        trackElement = parent.querySelector('.adslider__track') as HTMLElement;
        trackElement.style.width = '400px';
        trackElement.getBoundingClientRect = jest.fn(() => ({
          bottom: 0,
          height: 0,
          left: 74,
          right: 0,
          top: 0,
          width: 400,
          x: 0,
          y: 0,
          toJSON: jest.fn,
        }));
        callback = jest.fn();
        track.addObserver(EventTypes.CHANGE_POSITION, callback);

        mousedown = new MouseEvent('mousedown', { clientX: 184, clientY: 50 });
        // mousemove = new MouseEvent('mousemove', { clientX: 184 });
        // mouseup = new MouseEvent('mouseup', { bubbles: true });

        trackElement.dispatchEvent(mousedown);
      });

      // test('Should call function mouseMove when event mousemove happens on handler', () => {
      //   expect(callback).toBeCalled();
      // });
    });
  });
});
