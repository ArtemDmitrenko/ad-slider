import './main.scss';
import { IConfig } from './Model/Model';
import Presenter from './Presenter/Presenter';

(function ($) {
  const methods = {
    init(container: HTMLElement, options: IConfig): void {
      if ($(this).data('inited')) {
        $.error('Plugin has already been initialized on this selector!');
      } else {
        const presenter = new Presenter(container, options);
        $(this).data({
          presenter, inited: true,
        });
      }
    },
    update(options: IConfig): void {
      const presenter = $(this).data('presenter');
      presenter.validateModel(options);
      presenter.updateView();
    },
    getOptions(): IConfig {
      return $(this).data('presenter').model.options;
    },
  };

  type SliderMethods = {
    init(container: HTMLElement, options: IConfig): void,
    update(options: IConfig): void,
    getOptions(): IConfig,
  };

  $.fn.adslider = function (methodOrOptions: keyof SliderMethods, options?: IConfig): void | IConfig {
    if (methodOrOptions === 'update' && options) {
      return methods.update.call(this, options);
    }
    if (methodOrOptions === 'getOptions') {
      return methods.getOptions.call(this);
    }
    if (typeof methodOrOptions === 'object' && options) {
      return methods.init.call(this, this[0], options);
    }
    $.error(`Method ${methodOrOptions} does not exist on jQuery.tooltip`);
  };
}(jQuery));
