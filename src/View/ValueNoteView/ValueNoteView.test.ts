import ValueNoteView from './ValueNoteView';

describe('valueNoteView', () => {
  let parent: HTMLElement;
  let valueNoteView: ValueNoteView;

  beforeEach(() => {
    parent = document.createElement('div');
    valueNoteView = new ValueNoteView(parent, false);
  });

  test('Function render: should create note element', () => {
    expect(valueNoteView.noteElement).not.toBeNull();
    expect(valueNoteView.noteElement.tagName).toBe('DIV');
  });

  test('Function render: should create value element', () => {
    expect(parent.firstElementChild).not.toBeNull();
    if (parent.firstElementChild && parent.firstElementChild.firstElementChild) {
      expect(parent.firstElementChild.firstElementChild.tagName).toBe('P');
    }
  });

  test('Function render: should add css-class to note element', () => {
    expect(valueNoteView.noteElement.classList.contains('adslider__note')).toBe(true);
  });

  test('Function render: should add css-class to value element', () => {
    if (parent.firstElementChild && parent.firstElementChild.firstElementChild) {
      expect(parent.firstElementChild.firstElementChild.classList.contains('adslider__value')).toBe(true);
    }
  });

  test('Function render: should append value to note', () => {
    const noteElement = (parent.firstElementChild as HTMLElement).firstElementChild;
    if (noteElement) {
      expect(noteElement.parentElement).toBe(valueNoteView.noteElement);
    }
  });

  test('Function render: should append note to parent-element', () => {
    expect(valueNoteView.noteElement.parentElement).toBe(parent);
  });

  test('Function setValue: should set value to note', () => {
    valueNoteView.setValue(50);
    if (parent.firstElementChild && parent.firstElementChild.firstElementChild) {
      expect(parent.firstElementChild.firstElementChild.innerHTML).toBe('50');
    }
  });

  test('Function setValueForTwo: should set values when notes are close in range slider', () => {
    valueNoteView.setValueForTwo(50, 55);
    if (parent.firstElementChild && parent.firstElementChild.firstElementChild) {
      expect(parent.firstElementChild.firstElementChild.innerHTML).toBe('50 - 55');
    }
  });

  test('Function setPos: should set position of valueNote for vertical view', () => {
    valueNoteView.setPos(50, true);
    expect(window.getComputedStyle(valueNoteView.noteElement).bottom).toBe('50px');
    expect(window.getComputedStyle(valueNoteView.noteElement).left).toBe('');
  });

  test('Function setPos: should set position of valueNote for horizontal view', () => {
    valueNoteView.setPos(40, false);
    expect(window.getComputedStyle(valueNoteView.noteElement).left).toBe('40px');
    expect(window.getComputedStyle(valueNoteView.noteElement).bottom).toBe('');
  });

  test('Function showValueNote: should have classes if showValueNote is true', () => {
    valueNoteView.showValueNote(true);
    expect(valueNoteView.noteElement.classList.contains('adslider__note_hide')).toBe(false);
    expect(valueNoteView.noteElement.classList.contains('adslider__note_show')).toBe(true);
  });

  test('Function showValueNote: should have classes if showValueNote is false', () => {
    valueNoteView.showValueNote(false);
    expect(valueNoteView.noteElement.classList.contains('adslider__note_hide')).toBe(true);
    expect(valueNoteView.noteElement.classList.contains('adslider__note_show')).toBe(false);
  });

  test('Function getPos: return pos of note for vertical view', () => {
    valueNoteView.noteElement.style.bottom = '30px';
    expect(valueNoteView.getPos(true)).toBe(30);
  });

  test('Function getPos: return pos of note for horizontal view', () => {
    valueNoteView.noteElement.style.left = '40px';
    expect(valueNoteView.getPos(false)).toBe(40);
  });

  test('Function getSize: return size of note for vertical view', () => {
    valueNoteView.noteElement.style.height = '30px';
    expect(valueNoteView.getSize(true)).toBe(30);
  });
  test('Function getSize: return size of note for horizontal view', () => {
    valueNoteView.noteElement.style.width = '30px';
    expect(valueNoteView.getSize(false)).toBe(30);
  });

  test('Function getValue: return value of note', () => {
    if (parent.firstElementChild && parent.firstElementChild.firstElementChild) {
      parent.firstElementChild.firstElementChild.textContent = '50';
    }
    expect(valueNoteView.getValue()).toBe(50);
  });

  test('Function calcPos: should return center of handler position', () => {
    const options = {
      handlerPos: '20px',
      handlerSize: 30,
    };
    expect(valueNoteView.calcPos(options)).toBe(35);
  });

  test('Function removeNoteElement: should remove noteElement', () => {
    valueNoteView.removeNoteElement();
    expect(parent.querySelector('adslider__note')).toBe(null);
  });
});
