import ValueNoteView from './valueNoteView';

describe('valueNoteView', () => {
  let $parent: HTMLElement;
  let valueNoteView: ValueNoteView;

  beforeEach(() => {
    $parent = document.createElement('div');
    valueNoteView = new ValueNoteView($parent);
  });

  test('Function render: should create $note element', () => {
    expect(valueNoteView.$note).not.toBeNull();
    expect(valueNoteView.$note.tagName).toBe('DIV');
  });

  test('Function render: should create $value element', () => {
    expect(valueNoteView.$value).not.toBeNull();
    expect(valueNoteView.$value.tagName).toBe('P');
  });

  test('Function render: should add css-class to $note element', () => {
    expect(valueNoteView.$note.classList.contains('adslider__note')).toBe(true);
  });

  test('Function render: should add css-class to $value element', () => {
    expect(valueNoteView.$value.classList.contains('adslider__value')).toBe(true);
  });

  test('Function render: should append $value to $note', () => {
    expect(valueNoteView.$value.parentElement).toBe(valueNoteView.$note);
  });

  test('Function render: should append $note to parent-element', () => {
    expect(valueNoteView.$note.parentElement).toBe($parent);
  });

  test('Function setValue: should set value to note', () => {
    valueNoteView.setValue(50);
    expect(valueNoteView.$value.innerHTML).toBe('50');
  });

  test('Function setValueForTwo: should set values when notes are close in range slider', () => {
    valueNoteView.setValueForTwo(50, 55);
    expect(valueNoteView.$value.innerHTML).toBe('50 - 55');
  });

  test('Function setPos: should set position of valueNote', () => {
    const $handler: HTMLElement = document.createElement('div');
    $handler.style.left = '50px';
    $handler.style.width = '30px';
    valueNoteView.calcPos($handler);
    valueNoteView.setPos();
    expect(window.getComputedStyle(valueNoteView.$note).left).toBe('65px');
    valueNoteView.setVerticalView(true);
    $handler.style.bottom = '60px';
    $handler.style.height = '20px';
    valueNoteView.calcPos($handler);
    valueNoteView.setPos();
    expect(window.getComputedStyle(valueNoteView.$note).bottom).toBe('70px');
  });

  test('Function showValueNote: should have classes if showValueNote is true and back', () => {
    valueNoteView.showValueNote(true);
    expect(valueNoteView.$note.classList.contains('adslider__note_hide')).toBe(false);
    expect(valueNoteView.$note.classList.contains('adslider__note_show')).toBe(true);
    valueNoteView.showValueNote(false);
    expect(valueNoteView.$note.classList.contains('adslider__note_hide')).toBe(true);
    expect(valueNoteView.$note.classList.contains('adslider__note_show')).toBe(false);
  });

  test('Function setVerticalView: should set vertical or horizontal view of note', () => {
    valueNoteView.setVerticalView(false);
    expect(valueNoteView.$note.classList.contains('adslider__note_horizontal')).toBe(true);
    valueNoteView.setVerticalView(true);
    expect(valueNoteView.$note.classList.contains('adslider__note_vertical')).toBe(true);
  });

  test('Function getValue: return value of note', () => {
    valueNoteView.$value.textContent = '44';
    expect(valueNoteView.getValue()).toBe(44);
  });

  test('Function getPos: return pos of note', () => {
    valueNoteView.$note.style.left = '30px';
    expect(valueNoteView.getPos()).toBe(30);
    valueNoteView.setVerticalView(true);
    valueNoteView.$note.style.bottom = '40px';
    expect(valueNoteView.getPos()).toBe(40);
  });

  test('Function getSize: return size of note', () => {
    valueNoteView.$note.style.width = '30px';
    expect(valueNoteView.getSize()).toBe(30);
    valueNoteView.setVerticalView(true);
    valueNoteView.$note.style.height = '40px';
    expect(valueNoteView.getSize()).toBe(40);
  });
});
