import TrackView from './trackView';

describe('trackView', () => {
  const $parent: HTMLElement = document.createElement('div');
  const trackView = new TrackView($parent);

  test('Function render: create element', () => {
    expect(trackView.$track).not.toBeNull();
    expect(trackView.$track.tagName).toBe('DIV');
  });

  test('Function render: add css-class', () => {
    expect(trackView.$track.classList.contains('adslider__track')).toBe(true);
  });

  test('Function render: append track to parent-element', () => {
    expect(trackView.$track.parentElement).toBe($parent);
  });

  test('Function getLength', () => {
    expect(trackView.getLength()).toBe(trackView.$track.offsetWidth);
  });
});
