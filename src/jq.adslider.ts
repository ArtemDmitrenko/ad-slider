import './main.scss';

import { Config } from './model/model';
import Presenter from './presenter/presenter';

(function ($) {
  const methods = {
    init(container: HTMLElement, options: Config) {
      if ($(this).data('inited')) {
        $.error('Plugin has already been initialized on this selector!');
      } else {
        const presenter = new Presenter(container, options);
        $(this).data({
          presenter, inited: true,
        });
      }
    },
    update(options: Config) {
      const { model } = $(this).data('presenter');
      const presenter = $(this).data('presenter');
      model.options = options;
      model.init(model.options);
      presenter.updateView();
    },
    updateCurValue(curValue: number) {
      const { model } = $(this).data('presenter');
      const presenter = $(this).data('presenter');
      model.options.curValue = curValue;
      model.init(model.options);
      presenter.updateView();
    },
    getOptions(): Object {
      return $(this).data('presenter').model.options;
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
