import ValueNoteView from './valueNoteView';

describe('valueNoteView', () => {
  let $parent: HTMLElement;
  let valueNoteView: ValueNoteView;

  beforeEach(() => {
    $parent = document.createElement('div');
    valueNoteView = new ValueNoteView($parent);
  });

  test('Function render: create $note element', () => {
    expect(valueNoteView.$note).not.toBeNull();
    expect(valueNoteView.$note.tagName).toBe('DIV');
  });

  test('Function render: create $value element', () => {
    expect(valueNoteView.$value).not.toBeNull();
    expect(valueNoteView.$value.tagName).toBe('P');
  });

  test('Function render: add css-class to $note element', () => {
    expect(valueNoteView.$note.classList.contains('adslider__note')).toBe(true);
  });

  test('Function render: add css-class to $value element', () => {
    expect(valueNoteView.$value.classList.contains('adslider__value')).toBe(true);
  });

  test('Function render: append $value to $note', () => {
    expect(valueNoteView.$value.parentElement).toBe(valueNoteView.$note);
  });

  test('Function render: append $note to parent-element', () => {
    expect(valueNoteView.$note.parentElement).toBe($parent);
  });

  test('Function setValue', () => {
    valueNoteView.setValue(50);
    expect(valueNoteView.$value.innerHTML).toBe('50');
  });

  test('Function setPos', () => {
    const handler: HTMLElement = document.createElement('div');
    handler.style.left = '200px';
    handler.style.width = '100px';
    valueNoteView.setPos(handler);
    expect(getComputedStyle(valueNoteView.$note).left).toBe('250px');
  });
  test('Function showValueNote', () => {
    valueNoteView.showValueNote(true);
    expect(valueNoteView.$note.classList.contains('adslider__note_hide')).toBe(false);
    expect(valueNoteView.$note.classList.contains('adslider__note_show')).toBe(true);
    valueNoteView.showValueNote(false);
    expect(valueNoteView.$note.classList.contains('adslider__note_hide')).toBe(true);
    expect(valueNoteView.$note.classList.contains('adslider__note_show')).toBe(false);
  });
});
