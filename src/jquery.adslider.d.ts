interface JQuery {
  adslider(this: typeof $, options: IConfig): void;
  adslider(this: typeof $, methodName: keyof SliderMethods, options: IConfig): void;
  adslider(this: typeof $, methodName: keyof SliderMethods): IConfig;
}
