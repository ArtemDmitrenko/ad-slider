import View from './View';
import { IConfig } from '../model/Model';

describe('view', () => {
  let view: View;
  let $container: HTMLElement;
  let adslider: HTMLElement;
  let track: HTMLElement;
  let bar: HTMLElement;
  let scale: HTMLElement;
  let handler: HTMLElement;
  let handlerFrom: HTMLElement;
  let note: HTMLElement;
  let value: HTMLElement;
  let noteFrom: HTMLElement;
  let valueFrom: HTMLElement;

  describe('Function render', () => {
    $container = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild($container);
    view = new View($container);
    adslider = $container.querySelector('.adslider') as HTMLElement;
    track = $container.querySelector('.adslider__track') as HTMLElement;
    bar = $container.querySelector('.adslider__bar') as HTMLElement;
    scale = $container.querySelector('.adslider__scale') as HTMLElement;
    handler = $container.querySelector('.adslider__handler') as HTMLElement;
    handlerFrom = $container.querySelector('.adslider__handler_type_from') as HTMLElement;
    note = $container.querySelector('.adslider__note_type_to') as HTMLElement;
    noteFrom = $container.querySelector('.adslider__note_type_from') as HTMLElement;

    test('Function render: creating instance of View', () => {
      expect($container).not.toBeNull();
      expect(adslider).not.toBeNull();
      expect(track).toBeTruthy();
      expect(bar).not.toBeNull();
      expect(scale).not.toBeNull();
      expect(handler).not.toBeNull();
      expect(handlerFrom).not.toBeNull();
      expect(note).not.toBeNull();
      expect(noteFrom).not.toBeNull();
    });
  });

  describe('Function updateView', () => {
    describe('For single slider with horizontal view', () => {
      let options: IConfig;
      beforeEach(() => {
        $container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild($container);
        view = new View($container);

        options = {
          limits: { min: 0, max: 100 },
          curValue: 50,
          showValueNote: true,
          vertical: false,
          double: false,
          from: 0,
          to: 0,
          step: 1,
        };
        adslider = $container.querySelector('.adslider') as HTMLElement;
        track = $container.querySelector('.adslider__track') as HTMLElement;
        bar = $container.querySelector('.adslider__bar') as HTMLElement;
        scale = $container.querySelector('.adslider__scale') as HTMLElement;
        handler = $container.querySelector('.adslider__handler') as HTMLElement;
        handlerFrom = $container.querySelector('.adslider__handler_type_from') as HTMLElement;
        note = $container.querySelector('.adslider__note_type_to') as HTMLElement;
        value = note.querySelector('.adslider__value') as HTMLElement;
        noteFrom = $container.querySelector('.adslider__note_type_from') as HTMLElement;
        valueFrom = noteFrom.querySelector('.adslider__value') as HTMLElement;

        track.style.width = '400px';
        handler.style.width = '30px';
        view.updateView(options);
      });

      test('Should add classes to the elements of slider', () => {
        expect(adslider.classList.contains('adslider_direction_horizontal')).toBe(true);
        expect(track.classList.contains('adslider__track_direction_horizontal')).toBe(true);
        expect(handler.classList.contains('adslider__handler_direction_horizontal')).toBe(true);
        expect(bar.classList.contains('adslider__bar_direction_horizontal')).toBe(true);
        expect(note.classList.contains('adslider__note_show')).toBe(true);
        expect(scale.classList.contains('adslider__scale_direction_horizontal')).toBe(true);
      });
      test('Should set handler position depending on the curValue', () => {
        expect(getComputedStyle(handler).left).toBe('185px');
      });
      test('Should set valueNote position depending on the handler position', () => {
        expect(getComputedStyle(note).left).toBe('200px');
      });
      test('Should set note value depending on the curValue', () => {
        expect(value.textContent).toBe('50');
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
        expect(handlerFrom).not.toBeNull();
      });
    });

    describe('For double slider with horizontal view', () => {
      let options: IConfig;
      beforeEach(() => {
        $container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild($container);
        view = new View($container);
        adslider = $container.querySelector('.adslider') as HTMLElement;
        track = $container.querySelector('.adslider__track') as HTMLElement;
        bar = $container.querySelector('.adslider__bar') as HTMLElement;
        scale = $container.querySelector('.adslider__scale') as HTMLElement;
        handler = $container.querySelector('.adslider__handler') as HTMLElement;
        handlerFrom = $container.querySelector('.adslider__handler_type_from') as HTMLElement;
        note = $container.querySelector('.adslider__note_type_to') as HTMLElement;
        value = note.querySelector('.adslider__value') as HTMLElement;
        noteFrom = $container.querySelector('.adslider__note_type_from') as HTMLElement;
        valueFrom = noteFrom.querySelector('.adslider__value') as HTMLElement;

        track.style.width = '400px';
        handler.style.width = '30px';
        handlerFrom.style.width = '30px';
        note.style.width = '2rem';
        options = {
          limits: { min: 0, max: 100 },
          curValue: 41,
          showValueNote: true,
          step: 15,
          double: true,
          from: 40,
          to: 41,
          vertical: false,
        };
        view.updateView(options);
      });

      test('Should add classes to the elements of slider', () => {
        expect(adslider.classList.contains('adslider_direction_horizontal')).toBe(true);
        expect(track.classList.contains('adslider__track_direction_horizontal')).toBe(true);
        expect(handler.classList.contains('adslider__handler_direction_horizontal')).toBe(true);
        expect(bar.classList.contains('adslider__bar_direction_horizontal')).toBe(true);
        expect(scale.classList.contains('adslider__scale_direction_horizontal')).toBe(true);
      });
      test('Should set handler position depending on the curValue', () => {
        expect(getComputedStyle(handler).left).toBe('151.7px');
      });
      test('Should set handlerFrom position depending on the valueFrom', () => {
        expect(getComputedStyle(handlerFrom).left).toBe('148px');
      });
      test('Should set valueNote position depending on the handler position', () => {
        expect(getComputedStyle(note).left).toBe('166px');
      });
      test('Should set valueNoteFrom position depending on the handler position', () => {
        expect(getComputedStyle(noteFrom).left).toBe('163px');
      });
      test('Should set note value depending on the curValue', () => {
        expect(value.textContent).toBe('41');
      });
      test('Should set noteFrom value depending on the valFrom', () => {
        expect(valueFrom.textContent).toBe('40');
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
          vertical: false,
        };
        view.updateView(options);
        expect(handlerFrom).not.toBeNull();
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
          vertical: false,
        };
        view.updateView(options);
        const valueNoteViewCommon = $container.querySelector('.adslider__note_common') as HTMLElement;
        expect(valueNoteViewCommon).toBeNull();
      });
    });
  });

  describe('Function addListeners', () => {
    describe('For single slider with horizontal view', () => {
      let options: IConfig;
      let callback: () => void;
      let mousedown: MouseEvent;
      let mousemove: MouseEvent;
      let mouseup: MouseEvent;
      beforeEach(() => {
        $container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild($container);
        view = new View($container);
        adslider = $container.querySelector('.adslider') as HTMLElement;
        track = $container.querySelector('.adslider__track') as HTMLElement;
        bar = $container.querySelector('.adslider__bar') as HTMLElement;
        scale = $container.querySelector('.adslider__scale') as HTMLElement;
        handler = $container.querySelector('.adslider__handler') as HTMLElement;
        handlerFrom = $container.querySelector('.adslider__handler_type_from') as HTMLElement;
        note = $container.querySelector('.adslider__note_type_to') as HTMLElement;
        value = note.querySelector('.adslider__value') as HTMLElement;
        noteFrom = $container.querySelector('.adslider__note_type_from') as HTMLElement;
        valueFrom = noteFrom.querySelector('.adslider__value') as HTMLElement;

        track.style.width = '400px';
        handler.style.width = '30px';
        options = {
          limits: { min: 0, max: 100 },
          curValue: 50,
          showValueNote: true,
          step: 15,
          vertical: true,
          double: false,
          from: 0,
          to: 0,
        };
        view.updateView(options);

        handler.getBoundingClientRect = jest.fn(() => ({
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
        track.getBoundingClientRect = jest.fn(() => ({
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
        view.addObserver('changePos', callback);

        mousedown = new MouseEvent('mousedown', { clientX: 185 });
        mousemove = new MouseEvent('mousemove', { clientX: 184 });
        mouseup = new MouseEvent('mouseup', { bubbles: true });
      });

      test('Should call function mouseMove when event mousemove happens on handler', () => {
        handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        expect(callback).toBeCalled();
      });

      test('Check that listeners of mousemove of handler are removed after mouseup', () => {
        handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        document.dispatchEvent(mouseup);
        const nextmousemove = new MouseEvent('mousemove');
        document.dispatchEvent(nextmousemove);
        expect(callback).toHaveBeenCalledTimes(1);
      });
      test('Should set newPosCopy = 0 if newPos < 0 in function checkNewPos', () => {
        mousedown = new MouseEvent('mousedown', { clientX: 12 });
        mousemove = new MouseEvent('mousemove', { clientX: 10 });
        handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        expect(callback).toBeCalled();
      });
      test('Should set newPosCopy = edge if newPos > edge in function checkNewPos', () => {
        mousedown = new MouseEvent('mousedown', { clientX: 185 });
        mousemove = new MouseEvent('mousemove', { clientX: 500 });
        handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on track', () => {
        track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on bar', () => {
        bar.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on scale', () => {
        scale.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
    });
    describe('For double slider with vertical view', () => {
      let options: IConfig;
      let callback: () => void;
      let mousedown: MouseEvent;
      let mousemove: MouseEvent;
      beforeEach(() => {
        $container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild($container);
        view = new View($container);
        adslider = $container.querySelector('.adslider') as HTMLElement;
        track = $container.querySelector('.adslider__track') as HTMLElement;
        bar = $container.querySelector('.adslider__bar') as HTMLElement;
        scale = $container.querySelector('.adslider__scale') as HTMLElement;
        handler = $container.querySelector('.adslider__handler') as HTMLElement;
        handlerFrom = $container.querySelector('.adslider__handler_type_from') as HTMLElement;
        note = $container.querySelector('.adslider__note_type_to') as HTMLElement;
        value = note.querySelector('.adslider__value') as HTMLElement;
        noteFrom = $container.querySelector('.adslider__note_type_from') as HTMLElement;
        valueFrom = noteFrom.querySelector('.adslider__value') as HTMLElement;

        track.style.height = '400px';
        handler.style.height = '30px';
        options = {
          limits: { min: 0, max: 100 },
          curValue: 41,
          showValueNote: true,
          vertical: true,
          double: true,
          from: 10,
          to: 41,
          step: 1,
        };
        view.updateView(options);

        handler.getBoundingClientRect = jest.fn(() => ({
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
        handlerFrom.getBoundingClientRect = jest.fn(() => ({
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
        track.getBoundingClientRect = jest.fn(() => ({
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
        view.addObserver('changePos', callback);
        mousedown = new MouseEvent('mousedown', { clientY: 30 });
        mousemove = new MouseEvent('mousemove', { clientY: 50 });
      });

      test('Should call function mouseMove when event mousemove happens on handler', () => {
        handler.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);
        expect(callback).toBeCalled();
      });

      test('Should call function mouseMove when event mousemove happens on track', () => {
        track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on track', () => {
        mousedown = new MouseEvent('mousedown', { clientY: 60 });
        track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
    });
    describe('For double slider with horizontal view', () => {
      let options: IConfig;
      let callback: () => void;
      let mousedown: MouseEvent;
      beforeEach(() => {
        $container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild($container);
        view = new View($container);
        adslider = $container.querySelector('.adslider') as HTMLElement;
        track = $container.querySelector('.adslider__track') as HTMLElement;
        bar = $container.querySelector('.adslider__bar') as HTMLElement;
        scale = $container.querySelector('.adslider__scale') as HTMLElement;
        handler = $container.querySelector('.adslider__handler') as HTMLElement;
        handlerFrom = $container.querySelector('.adslider__handler_type_from') as HTMLElement;
        note = $container.querySelector('.adslider__note_type_to') as HTMLElement;
        value = note.querySelector('.adslider__value') as HTMLElement;
        noteFrom = $container.querySelector('.adslider__note_type_from') as HTMLElement;
        valueFrom = noteFrom.querySelector('.adslider__value') as HTMLElement;

        track.style.width = '400px';
        handler.style.width = '30px';
        options = {
          limits: { min: 0, max: 100 },
          curValue: 41,
          showValueNote: true,
          double: true,
          from: 10,
          to: 41,
          step: 1,
          vertical: false,
        };
        view.updateView(options);
        handler.getBoundingClientRect = jest.fn(() => ({
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
        handlerFrom.getBoundingClientRect = jest.fn(() => ({
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
        track.getBoundingClientRect = jest.fn(() => ({
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
        view.addObserver('changePos', callback);
        mousedown = new MouseEvent('mousedown', { clientX: 30 });
      });
      test('Should call function mouseMove when event mousemove happens on track', () => {
        track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on track if e.clientX <= middlePos', () => {
        mousedown = new MouseEvent('mousedown', { clientX: 20 });
        track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
      test('Should call function mouseMove when event mousemove happens on track if e.clientX > middlePos', () => {
        mousedown = new MouseEvent('mousedown', { clientX: 500 });
        track.dispatchEvent(mousedown);
        expect(callback).toBeCalled();
      });
    });
  });
});
