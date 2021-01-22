import View from './view';

describe('view', () => {
  const $container: HTMLElement = document.createElement('div');
  let view: View;

  beforeEach(() => {
    view = new View($container);
    view.trackView.$track.style.width = '400px';
    view.handlerView.$handler.style.width = '30px';
  });

  test('Function render: creating instance of View', () => {
    expect(view.$el).not.toBeNull();
  });

  describe('Function updateView', () => {
    beforeEach(() => {
      const options = { curValue: 50, limits: { min: 0, max: 100 }, showValueNote: true };
      view.updateView(options);
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

    test('Should show valueNote if showValueNote is true', () => {
      expect(view.valueNoteView.$note.classList.contains('adslider__note_show')).toBe(true);
    });
  });

  describe('Function addListeners', () => {
    let callback: Function;
    beforeEach(() => {
      view.handlerView.$handler.getBoundingClientRect = jest.fn(() => ({
        bottom: 0,
        height: 0,
        left: 259,
        right: 0,
        top: 0,
        width: 0,
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
        width: 0,
        x: 0,
        y: 0,
        toJSON: jest.fn,
      }));

      callback = jest.fn();
      view.addObserver('handlerMove', callback);

      const mousedown = new MouseEvent('mousedown', { clientX: 281 });
      const mousemove = new MouseEvent('mousemove', { clientX: 280 });

      view.handlerView.$handler.dispatchEvent(mousedown);
      document.dispatchEvent(mousemove);
    });

    test('Should call function mouseMove when event mousemove happens', () => {
      expect(callback).toBeCalled();
    });

    test('Should set handler position depending on event mousedown and mousemove', () => {
      expect(getComputedStyle(view.handlerView.$handler).left).toBe('184px');
    });

    test('Check that listeners of mousemove of handler are removed after mouseup', () => {
      const mouseup = new MouseEvent('mouseup', { bubbles: true });
      document.dispatchEvent(mouseup);
      const nextmousemove = new MouseEvent('mousemove', { clientX: 200 });
      document.dispatchEvent(nextmousemove);
      expect(getComputedStyle(view.handlerView.$handler).left).toBe('184px');
    });
    test('Should set min position of handler if trying to move handler outside the track', () => {
      const mousemove = new MouseEvent('mousemove', { clientX: 95 });
      document.dispatchEvent(mousemove);
      expect(getComputedStyle(view.handlerView.$handler).left).toBe('0px');
    });
    test('Should set max position of handler if trying to move handler outside the track', () => {
      const mousemove = new MouseEvent('mousemove', { clientX: 467 });
      document.dispatchEvent(mousemove);
      expect(getComputedStyle(view.handlerView.$handler).left).toBe('370px');
    });
  });
});
