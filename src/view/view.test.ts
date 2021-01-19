import View from './view';

describe('view', () => {
  const $container: HTMLElement = document.createElement('div');
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
});
