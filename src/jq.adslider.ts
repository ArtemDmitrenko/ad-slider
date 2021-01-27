import './main.scss';

import { Config, Model } from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

(function ($) {
  const methods = {
    init(container: HTMLElement, options: Config) {
      const view = new View(container);
      const model = new Model(options);
      const presenter = new Presenter(model, view);
      $(this).data({ view, model, presenter });
    },
    update(options: Config) {
      const model = $(this).data('model');
      const view = $(this).data('view');
      model.options = options;
      model.init(model.options);
      view.updateView(model.options);
    },
    getOptions() {
      return $(this).data('model').options;
    },
  };

  $.fn.adslider = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      return methods.init.call(this, this[0], methodOrOptions);
    }
    $.error(`Method ${methodOrOptions} does not exist on jQuery.tooltip`);
  };
}(jQuery));
