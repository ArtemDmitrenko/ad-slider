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

  test('Function setPos: should set position of valueNote', () => {
    valueNoteView.setPos(50);
    expect(getComputedStyle(valueNoteView.$note).left).toBe('50px');
  });

  test('Function showValueNote: should have classes if showValueNote is true and back', () => {
    valueNoteView.showValueNote(true);
    expect(valueNoteView.$note.classList.contains('adslider__note_hide')).toBe(false);
    expect(valueNoteView.$note.classList.contains('adslider__note_show')).toBe(true);
    valueNoteView.showValueNote(false);
    expect(valueNoteView.$note.classList.contains('adslider__note_hide')).toBe(true);
    expect(valueNoteView.$note.classList.contains('adslider__note_show')).toBe(false);
  });
});
