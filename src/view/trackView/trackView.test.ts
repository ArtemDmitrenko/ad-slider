import TrackView from './trackView';

describe('trackView', () => {
  const $parent: HTMLElement = document.createElement('div');
  const trackView = new TrackView($parent);

  test('Function render: should create element', () => {
    expect(trackView.$track).not.toBeNull();
    expect(trackView.$track.tagName).toBe('DIV');
  });

  test('Function render: should add css-class', () => {
    expect(trackView.$track.classList.contains('adslider__track')).toBe(true);
  });

  test('Function render: should append track to parent-element', () => {
    expect(trackView.$track.parentElement).toBe($parent);
  });

  test('Function getWidth: should get width of track', () => {
    trackView.$track.style.width = '20px';
    expect(trackView.getWidth()).toBe(20);
  });
});
