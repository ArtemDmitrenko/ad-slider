import View from './view';

describe('view', () => {
  const $container: HTMLElement = document.createElement('div');
  // $container.classList.add('container');
  document.body.append($container);
  let view: View;

  // beforeEach(() => {
  //   $container.classList.add('container');
  //   view = new View('.container');
  // });

  test('Function render: creating instance of View', () => {
    view = new View($container);
    expect(view.$el).not.toBeNull();
  });

  test('Function render: throw Error if DOM does not have selector', () => {
    function viewWithNoSelector() {
      view = new View($container);
    }
    expect(viewWithNoSelector).toThrowError(new Error('You do not have this element in your DOM'));
  });
});
