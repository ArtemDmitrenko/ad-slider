import View from './view';

describe('view', () => {
  const $container: HTMLElement = document.createElement('div');
  let view: View;

  describe('Function render', () => {
    beforeEach(() => {
      view = new View($container);
      view.trackView.$track.style.width = '400px';
      view.handlerView.$handler.style.width = '30px';
    });

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
      view = new View($container);
      view.trackView.$track.style.width = '400px';
      view.handlerView.$handler.style.width = '30px';
      const options = {
        limits: { min: 0, max: 100 },
        curValue: 50,
        showValueNote: true,
      };
      // view.updateView(options);

      // test('Should add classes to the elements of slider', () => {
      //   expect(view.$adslider.classList.contains('adslider_horizontal')).toBe(true);
      //   expect(view.trackView.$track.classList.contains('adslider__track_horizontal')).toBe(true);
      //   expect(view.handlerView.$handler.classList.contains('adslider__handler_horizontal')).toBe(true);
      //   expect(view.barView.$bar.classList.contains('adslider__bar_horizontal')).toBe(true);
      //   expect(view.valueNoteView.$note.classList.contains('adslider__note_show')).toBe(true);
      //   expect(view.scaleView.$scale.classList.contains('adslider__scale_horizontal')).toBe(true);
      // });
      test('Should set handler position depending on the curValue', () => {
        console.log(options.curValue)
        expect(getComputedStyle(view.handlerView.$handler).left).toBe('185px');
      });
      // test('Should set valueNote position depending on the handler position', () => {
      //   expect(getComputedStyle(view.valueNoteView.$note).left).toBe('200px');
      // });
      // test('Should set note value depending on the curValue', () => {
      //   expect(view.valueNoteView.$value.textContent).toBe('50');
      // });
    });

    // describe('For double slider view', () => {
    //   let options: any;
    //   view = new View($container);
    //   view.trackView.$track.style.width = '400px';
    //   view.handlerView.$handler.style.width = '30px';

    //   options = {
    //     limits: { min: 0, max: 100 },
    //     curValue: 50,
    //     showValueNote: true,
    //     // step: 15,
    //     // double: true,
    //     // from: 40,
    //     // to: 90,
    //     vertical: true,
    //   };
    //   view.updateView(options);

    //   test('Should add classes to the elements of slider', () => {
    //     expect(view.$adslider.classList.contains('adslider_vertical')).toBe(true);
    //     expect(view.trackView.$track.classList.contains('adslider__track_vertical')).toBe(true);
    //     expect(view.handlerView.$handler.classList.contains('adslider__handler_vertical')).toBe(true);
    //     expect(view.barView.$bar.classList.contains('adslider__bar_vertical')).toBe(true);
    //     expect(view.valueNoteView.$note.classList.contains('adslider__note_show')).toBe(true);
    //     expect(view.scaleView.$scale.classList.contains('adslider__scale_vertical')).toBe(true);
    //   });
    //   test('Should set handler position depending on the curValue', () => {
    //     expect(getComputedStyle(view.handlerView.$handler).left).toBe('185px');
    //   });
    //   test('Should set valueNote position depending on the handler position', () => {
    //     expect(getComputedStyle(view.valueNoteView.$note).left).toBe('200px');
    //   });
    //   test('Should set note value depending on the curValue', () => {
    //     expect(view.valueNoteView.$value.textContent).toBe('50');
    //   });

    //   options = {
    //     limits: { min: 0, max: 100 },
    //     curValue: 50,
    //     showValueNote: true,
    //     // step: 15,
    //     double: true,
    //     from: 40,
    //     to: 90,
    //     vertical: true,
    //   };
    //   view.updateView(options);

    //   test('Should set note value depending on the curValue', () => {
    //     expect(view.valueNoteViewFrom.$value.textContent).toBe('40');
    //     expect(view.valueNoteView.$value.textContent).toBe('90');
    //   });
    // });
  });

  // describe('Function addListeners', () => {
  //   let callback: Function;
  //   beforeEach(() => {
  //     view.handlerView.$handler.getBoundingClientRect = jest.fn(() => ({
  //       bottom: 259,
  //       height: 30,
  //       left: 259,
  //       right: 0,
  //       top: 0,
  //       width: 30,
  //       x: 0,
  //       y: 0,
  //       toJSON: jest.fn,
  //     }));
  //     view.trackView.$track.getBoundingClientRect = jest.fn(() => ({
  //       bottom: 74,
  //       height: 370,
  //       left: 74,
  //       right: 0,
  //       top: 0,
  //       width: 370,
  //       x: 0,
  //       y: 0,
  //       toJSON: jest.fn,
  //     }));

  //     callback = jest.fn();
  //     view.addObserver('handlerMove', callback);

  //     const mousedown = new MouseEvent('mousedown', { clientX: 281 });
  //     const mousemove = new MouseEvent('mousemove', { clientX: 280 });

  //     view.handlerView.$handler.dispatchEvent(mousedown);
  //     document.dispatchEvent(mousemove);
  //   });

  //   test('Should call function mouseMove when event mousemove happens', () => {
  //     expect(callback).toBeCalled();
  //   });

  //   test('Should set handler position depending on event mousedown and mousemove', () => {
  //     expect(getComputedStyle(view.handlerView.$handler).left).toBe('184px');
  //   });

  // test('Check that listeners of mousemove of handler are removed after mouseup', () => {
  //   const mouseup = new MouseEvent('mouseup', { bubbles: true });
  //   document.dispatchEvent(mouseup);
  //   const nextmousemove = new MouseEvent('mousemove', { clientX: 200 });
  //   document.dispatchEvent(nextmousemove);
  //   expect(getComputedStyle(view.handlerView.$handler).left).toBe('184px');
  // });
  // test('Should set min position of handler if trying to move handler outside the track', () => {
  //   const mousemove = new MouseEvent('mousemove', { clientX: 95 });
  //   document.dispatchEvent(mousemove);
  //   expect(getComputedStyle(view.handlerView.$handler).left).toBe('0px');
  // });
  // test('Should set max position of handler if trying to move handler outside the track', () => {
  //   const mousemove = new MouseEvent('mousemove', { clientX: 467 });
  //   document.dispatchEvent(mousemove);
  //   expect(getComputedStyle(view.handlerView.$handler).left).toBe('370px');
  // });
  // });
});
