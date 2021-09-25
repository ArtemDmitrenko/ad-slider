/* eslint-disable linebreak-style */
/* eslint-disable prefer-rest-params */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import './main.scss';

import { Config } from './model/model';
import Presenter from './presenter/presenter';

(function ($) {
  const methods = {
    init(container: HTMLElement, options: Config): void {
      if ($(this).data('inited')) {
        $.error('Plugin has already been initialized on this selector!');
      } else {
        const presenter = new Presenter(container, options);
        $(this).data({
          presenter, inited: true,
        });
      }
    },
    update(options: Config): void {
      const { model } = $(this).data('presenter');
      const presenter = $(this).data('presenter');
      model.options = options;
      model.init(model.options);
      presenter.updateView();
    },
    updateCurValue(curValue: number): void {
      const { model } = $(this).data('presenter');
      const presenter = $(this).data('presenter');
      model.options.curValue = curValue;
      model.init(model.options);
      presenter.updateView();
    },
    getOptions(): Config {
      return $(this).data('presenter').model.options;
    },
  };

  type methods = {
    init(container: HTMLElement, options: Config): void,
    update(options: Config): void,
    updateCurValue(curValue: number): void,
    getOptions(): Config,
  };

  $.fn.adslider = function (methodOrOptions: keyof methods) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      return methods.init.call(this, this[0], methodOrOptions);
    }
    $.error(`Method ${methodOrOptions} does not exist on jQuery.tooltip`);
  };
}(jQuery));
