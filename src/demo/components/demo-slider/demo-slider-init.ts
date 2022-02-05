import DemoSlider from './demo-slider';
import { defaultOptions } from '../../pages/demo-page/default-options.json';

export default function demoSlidersInit(): void {
  const demoSliderContainers = document.querySelectorAll('.js-demo-slider');
  demoSliderContainers.forEach((item, i) => {
    new DemoSlider(item as HTMLElement, defaultOptions[i]);
  });
}
