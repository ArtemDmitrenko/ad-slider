import View from './view';

describe('view', () => {
  describe('Function render', () => {
    const $container: HTMLElement = document.createElement('div');
    const view: View = new View($container);
    view.trackView.$track.style.width = '400px';
    view.handlerView.$handler.style.width = '30px';

    test('Function render: creating instance of View', () => {
      expect(view.$el).not.toBeNull();
      expect(view.$adslider).not.toBeNull();
      expect(view.trackView.$track).not.toBeNull();
      expect(view.barView.$bar).not.toBeNull();
      expect(view.scaleView.$scale).not.toBeNull();
      expect(view.handlerView.$handler).not.toBeNull();
      expect(view.handlerViewFrom.$handler).not.toBeNull();
      expect(view.valueNoteView.$note).not.toBeNull();
      expect(view.valueNoteViewFrom.$note).not.toBeNull();
    });

    test('Function render: should add classes adslider elements', () => {
      expect(view.$adslider.classList.contains('adslider')).toBe(true);
      expect(view.handlerViewFrom.$handler.classList.contains('adslider__handler_from')).toBe(true);
      expect(view.valueNoteViewFrom.$note.classList.contains('adslider__note_from')).toBe(true);
      expect(view.valueNoteView.$note.classList.contains('adslider__note_to')).toBe(true);
    });
  });

  describe('Function updateView', () => {
    describe('For single slider with horizontal view', () => {
      let view: View;
      let options: any;
      beforeEach(() => {
        const $container: HTMLElement = document.createElement('div');
        view = new View($container);
        view.trackView.$track.style.width = '400px';
        view.handlerView.$handler.style.width = '30px';
        options = {
          limits: { min: 0, max: 100 },
          curValue: 50,
          showValueNote: true,
        };
        view.updateView(options);
      });

      test('Should add classes to the elements of slider', () => {
        expect(view.$adslider.classList.contains('adslider_horizontal')).toBe(true);
        expect(view.trackView.$track.classList.contains('adslider__track_horizontal')).toBe(true);
        expect(view.handlerView.$handler.classList.contains('adslider__handler_horizontal')).toBe(true);
        expect(view.barView.$bar.classList.contains('adslider__bar_horizontal')).toBe(true);
        expect(view.valueNoteView.$note.classList.contains('adslider__note_show')).toBe(true);
        expect(view.scaleView.$scale.classList.contains('adslider__scale_horizontal')).toBe(true);
      });
      test('Should set handler position depending on the curValue', () => {
        expect(getComputedStyle(view.handlerView.$handler).left).toBe('185px');
      });
      test('Should set valueNote position depending on the handler position', () => {
        expect(getComputedStyle(view.valueNoteView.$note).left).toBe('200px');
      });
      test('Should set note value depending on the curValue', () => {
        expect(view.valueNoteView.$value.textContent).toBe('50');
      });
      test('Should add handlerFrom when slider becomes double after being single', () => {
        options = {
          limits: { min: 0, max: 100 },
          curValue: 50,
          showValueNote: true,
          step: 1,
          double: true,
          from: 49,
          to: 50,
          vertical: true,
        };
        view.updateView(options);
        expect(view.handlerViewFrom.$handler).not.toBeNull();
      });
    });

    describe('For double slider with horizontal view', () => {
      let view: View;
      let options: any;
      beforeEach(() => {
        const $container: HTMLElement = document.createElement('div');
        view = new View($container);
        view.trackView.$track.style.width = '400px';
        view.handlerView.$handler.style.width = '30px';
        view.handlerViewFrom.$handler.style.width = '30px';
        view.valueNoteView.$note.style.width = '2rem';
        options = {
          limits: { min: 0, max: 100 },
          curValue: 41,
          showValueNote: true,
          step: 15,
          double: true,
          from: 40,
          to: 41,
        };
        view.updateView(options);
      });

      test('Should add classes to the elements of slider', () => {
        expect(view.$adslider.classList.contains('adslider_horizontal')).toBe(true);
        expect(view.trackView.$track.classList.contains('adslider__track_horizontal')).toBe(true);
        expect(view.handlerView.$handler.classList.contains('adslider__handler_horizontal')).toBe(true);
        expect(view.barView.$bar.classList.contains('adslider__bar_horizontal')).toBe(true);
        expect(view.scaleView.$scale.classList.contains('adslider__scale_horizontal')).toBe(true);
      });
      test('Should set handler position depending on the curValue', () => {
        expect(getComputedStyle(view.handlerView.$handler).left).toBe('151.7px');
      });
      test('Should set handlerFrom position depending on the valueFrom', () => {
        expect(getComputedStyle(view.handlerViewFrom.$handler).left).toBe('148px');
      });
      test('Should set valueNote position depending on the handler position', () => {
        expect(getComputedStyle(view.valueNoteView.$note).left).toBe('166px');
      });
      test('Should set valueNoteFrom position depending on the handler position', () => {
        expect(getComputedStyle(view.valueNoteViewFrom.$note).left).toBe('163px');
      });
      test('Should set note value depending on the curValue', () => {
        expect(view.valueNoteView.$value.textContent).toBe('41');
      });
      test('Should set noteFrom value depending on the valFrom', () => {
        expect(view.valueNoteViewFrom.$value.textContent).toBe('40');
      });
      test('Should removeValueNotesFromAndTo if we have valueNoteViewCommon', () => {
        options = {
          limits: { min: 0, max: 100 },
          curValue: 41,
          showValueNote: true,
          step: 15,
          double: true,
          from: 40,
          to: 41,
        };
        view.updateView(options);
        expect(view.handlerViewFrom.$handler).not.toBeNull();
      });
      test('Should remove values From and To if we already have common valueNote', () => {
        options = {
          limits: { min: 0, max: 100 },
          curValue: 41,
          showValueNote: true,
          step: 15,
          double: true,
          from: 10,
          to: 41,
        };
        view.updateView(options);
        expect(view.valueNoteViewCommon).toBeNull();
      });
      test('Should delete values From if we choose single slider', () => {
        options = {
          limits: { min: 0, max: 100 },
          curValue: 41,
          showValueNote: true,
          step: 15,
          vertical: true,
        };
        view.updateView(options);
        expect(view.valueNoteViewFrom).toBeNull();
      });
    });
  });


  describe('Function addListeners', () => {
    describe('For single slider with horizontal view', () => {
      let view: View;
      let options: any;
      let callback: Function;
      let mousedown: MouseEvent;
      let mousemove: MouseEvent;
      let mouseup: MouseEvent;
      beforeEach(() => {
        const $container: HTMLElement = document.createElement('div');
        view = new View($container);
        view.trackView.$track.style.width = '400px';
        view.handlerView.$handler.style.width = '30px';
        options = {
          limits: { min: 0, max: 100 },
          curValue: 50,
          showValueNote: true,
        };
        view.updateView(options);


        view.handlerView.$handler.getBoundingClientRect = jest.fn(() => ({
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
        view.trackView.$track.getBoundingClientRect = jest.fn(() => ({
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
        view.addObserver('handlerMove', callback);

        mousedown = new MouseEvent('mousedown', { clientX: 185 });
        mousemove = new MouseEvent('mousemove', { clientX: 184 });
        mouseup = new MouseEvent('mouseup', { bubbles: true });
      });

      test('Should call function mouseMove when event mousemove happens on handler', () => {
        view.handlerView.$handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        expect(callback).toBeCalled();
      });

      test('Check that listeners of mousemove of handler are removed after mouseup', () => {
        view.handlerView.$handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        document.dispatchEvent(mouseup);
        const nextmousemove = new MouseEvent('mousemove');
        document.dispatchEvent(nextmousemove);
        expect(callback).toHaveBeenCalledTimes(1);
      });
      test('Should set newPosCopy = 0 if newPos < 0 in function checkNewPos', () => {
        mousedown = new MouseEvent('mousedown', { clientX: 12 });
        mousemove = new MouseEvent('mousemove', { clientX: 10 });
        view.handlerView.$handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        expect(callback).toBeCalled();
      });
      test('Should set newPosCopy = edge if newPos > edge in function checkNewPos', () => {
        mousedown = new MouseEvent('mousedown', { clientX: 185 });
        mousemove = new MouseEvent('mousemove', { clientX: 500 });
        view.handlerView.$handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on track', () => {
        view.trackView.$track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on bar', () => {
        view.barView.$bar.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on scale', () => {
        view.scaleView.$scale.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
    });
    describe('For double slider with vertical view', () => {
      let view: View;
      let options: any;
      let callback: Function;
      let mousedown: MouseEvent;
      let mousemove: MouseEvent;
      beforeEach(() => {
        const $container: HTMLElement = document.createElement('div');
        view = new View($container);
        view.trackView.$track.style.height = '400px';
        view.handlerView.$handler.style.height = '30px';
        options = {
          limits: { min: 0, max: 100 },
          curValue: 41,
          showValueNote: true,
          vertical: true,
          double: true,
          from: 10,
          to: 41,
        };
        view.updateView(options);

        view.handlerView.$handler.getBoundingClientRect = jest.fn(() => ({
          bottom: 170,
          height: 30,
          left: 0,
          right: 0,
          top: 20,
          width: 30,
          x: 0,
          y: 0,
          toJSON: jest.fn,
        }));

        view.handlerViewFrom.$handler.getBoundingClientRect = jest.fn(() => ({
          bottom: 100,
          height: 30,
          left: 0,
          right: 0,
          top: 50,
          width: 30,
          x: 0,
          y: 0,
          toJSON: jest.fn,
        }));
        view.trackView.$track.getBoundingClientRect = jest.fn(() => ({
          bottom: 74,
          height: 400,
          left: 0,
          right: 0,
          top: 0,
          width: 0,
          x: 0,
          y: 0,
          toJSON: jest.fn,
        }));

        callback = jest.fn();
        view.addObserver('handlerMove', callback);

        mousedown = new MouseEvent('mousedown', { clientY: 30 });
        mousemove = new MouseEvent('mousemove', { clientY: 50 });
      });

      test('Should call function mouseMove when event mousemove happens on handler', () => {
        view.handlerView.$handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        expect(callback).toBeCalled();
      });

      test('Should call function mouseMove when event mousemove happens on track', () => {
        view.trackView.$track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on track', () => {
        mousedown = new MouseEvent('mousedown', { clientY: 60 });
        view.trackView.$track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });

    });
    describe('For double slider with horizontal view', () => {
      let view: View;
      let options: any;
      let callback: Function;
      let mousedown: MouseEvent;
      let mousemove: MouseEvent;
      beforeEach(() => {
        const $container: HTMLElement = document.createElement('div');
        view = new View($container);
        view.trackView.$track.style.width = '400px';
        view.handlerView.$handler.style.width = '30px';
        options = {
          limits: { min: 0, max: 100 },
          curValue: 41,
          showValueNote: true,
          double: true,
          from: 10,
          to: 41,
        };
        view.updateView(options);

        view.handlerView.$handler.getBoundingClientRect = jest.fn(() => ({
          bottom: 0,
          height: 0,
          left: 370,
          right: 0,
          top: 0,
          width: 30,
          x: 0,
          y: 0,
          toJSON: jest.fn,
        }));

        view.handlerViewFrom.$handler.getBoundingClientRect = jest.fn(() => ({
          bottom: 0,
          height: 0,
          left: 100,
          right: 0,
          top: 0,
          width: 30,
          x: 0,
          y: 0,
          toJSON: jest.fn,
        }));
        view.trackView.$track.getBoundingClientRect = jest.fn(() => ({
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
        view.addObserver('handlerMove', callback);

        mousedown = new MouseEvent('mousedown', { clientX: 30 });
        mousemove = new MouseEvent('mousemove', { clientX: 50 });
      });

      test('Should call function mouseMove when event mousemove happens on track', () => {
        view.trackView.$track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on track if e.clientX <= middlePos', () => {
        mousedown = new MouseEvent('mousedown', { clientX: 20 });
        view.trackView.$track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on track if e.clientX > middlePos', () => {
        mousedown = new MouseEvent('mousedown', { clientX: 500 });
        view.trackView.$track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
    });
  });
});
