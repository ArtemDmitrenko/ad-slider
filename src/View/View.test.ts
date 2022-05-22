import View from './View';
import { IConfig } from '../Model/Model';
import TrackView from './TrackView/TrackView';

jest.mock('./TrackView/TrackView');

describe('view', () => {
  let view: View;
  let container: HTMLElement;
  let adslider: HTMLElement;

  describe('Function render', () => {
    container = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(container);
    view = new View(container);
    adslider = container.querySelector('.adslider') as HTMLElement;

    test('Function render: creating instance of View', () => {
      expect(container).not.toBeNull();
      expect(adslider).not.toBeNull();
    });
  });

  describe('Function updateView', () => {
    describe('For single slider with horizontal view', () => {
      let options: IConfig;
      beforeEach(() => {
        container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(container);
        view = new View(container);
        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          isVertical: false,
          isDouble: false,
          from: 0,
          to: 50,
          step: 1,
        };
        adslider = container.querySelector('.adslider') as HTMLElement;
        view.updateView(options);
      });

      test('Should add classes to the elements of slider', () => {
        expect(adslider.classList.contains('adslider_direction_horizontal')).toBe(true);
      });
    });

    describe('For single slider with vertical view', () => {
      let options: IConfig;
      beforeEach(() => {
        container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(container);
        view = new View(container);
        options = {
          limits: { min: 0, max: 100 },
          hasValueNote: true,
          isVertical: true,
          isDouble: false,
          from: 0,
          to: 50,
          step: 1,
        };

        adslider = container.querySelector('.adslider') as HTMLElement;
        view.updateView(options);
      });

      test('Should add classes to the elements of slider', () => {
        expect(adslider.classList.contains('adslider_direction_vertical')).toBe(true);
      });
    });
  });

  describe('Function calcPosition', () => {
    beforeEach(() => {
      TrackView.mockClear();
      container = document.createElement('div');
      document.body.innerHTML = '';
      document.body.appendChild(container);
      view = new View(container);
    });

    test('should call method of trackView calcHandlerPos with parameters', () => {
      const props = {
        value: 5,
        limits: { min: 0, max: 100 },
        isFromValueChanging: false,
      };
      view.calcPos(props);
      const mockTrackViewInstance = TrackView.mock.instances[0];
      const mockCalcHandlerPos = mockTrackViewInstance.calcHandlerPos;
      expect(mockCalcHandlerPos).toHaveBeenCalledWith(props);
    });

    test('should call method of trackView setHandlerPos with parameters', () => {
      const props = {
        hasValueNote: false,
        isFromValueChanging: false,
      };
      view.setPos(props);
      const mockTrackViewInstance = TrackView.mock.instances[0];
      const mockSetHandlerPos = mockTrackViewInstance.setHandlerPos;
      expect(mockSetHandlerPos).toHaveBeenCalledWith(props);
    });
  });
});
