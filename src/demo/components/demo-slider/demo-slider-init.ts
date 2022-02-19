import DemoSlider from './DemoSlider';

export default function demoSlidersInit(): void {
  const demoSliderContainers = document.querySelectorAll('.js-demo-slider');
  demoSliderContainers.forEach((item) => {
    new DemoSlider(item as HTMLElement);
  });
}
