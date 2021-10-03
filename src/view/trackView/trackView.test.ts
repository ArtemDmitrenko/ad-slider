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

  test('Function getLength: should get length of track', () => {
    trackView.$track.style.width = '20px';
    expect(trackView.getLength()).toBe(20);
    trackView.$track.classList.add('adslider__track_direction_vertical');
    trackView.$track.style.height = '55px';
    expect(trackView.getLength()).toBe(55);
  });

  test('Function setVerticalView: should set vertical or horizontal view of track', () => {
    trackView.setVerticalView(false);
    expect(trackView.$track.classList.contains('adslider__track_direction_horizontal')).toBe(true);
    trackView.setVerticalView(true);
    expect(trackView.$track.classList.contains('adslider__track_direction_vertical')).toBe(true);
  });
});
