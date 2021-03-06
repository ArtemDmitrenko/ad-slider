import './main.scss';

import { Config, Model } from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

(function ($) {
  const methods = {
    init(container: HTMLElement, options: Config) {
      if ($(this).data('inited')) {
        $.error('Plugin has already been initialized on this selector!');
      } else {
        const view = new View(container);
        const model = new Model(options);
        const presenter = new Presenter(model, view);
        $(this).data({
          view, model, presenter, inited: true,
        });
      }
    },
    update(options: Config) {
      const model = $(this).data('model');
      const presenter = $(this).data('presenter');
      model.options = options;
      model.init(model.options);
      presenter.updateView();
    },
    updateCurValue(curValue: number) {
      const model = $(this).data('model');
      const presenter = $(this).data('presenter');
      model.options.curValue = curValue;
      model.init(model.options);
      presenter.updateView();
    },
    getOptions(): Object {
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
