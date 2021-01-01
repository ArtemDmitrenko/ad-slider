import TrackView from './trackView';

describe('trackView', () => {
  const $parent: HTMLElement = document.createElement('div');
  const trackView = new TrackView($parent);

  test('Create element', () => {
    expect(trackView.$track).not.toBeNull();
  });

  test('Add css-class', () => {
    expect(trackView.$track.classList.contains('adslider__track')).toBe(true);
  });

  test('Append track to parent-element', () => {
    expect(trackView.$track.parentElement).toBe($parent);
  });

  test('Function getLength', () => {
    expect(trackView.getLength()).toBe(trackView.$track.offsetWidth);
  });
});
