import DemoPage from './demoPage/demoPage';

const options1 = {
  limits: { min: 0, max: 100 },
  curValue: 12,
  showValueNote: true,
  step: 30,
  // double: true,
  // from: 2000,
  // to: 3000,
  // vertical: true,
};
const options2 = {
  limits: { min: 0, max: 100 },
  curValue: 85,
  showValueNote: true,
  step: 20,
  double: true,
  from: 40,
  to: 90,
  // vertical: true,
};
const options3 = {
  limits: { min: 0, max: 1000 },
  curValue: 500,
  showValueNote: true,
  step: 100,
  // double: true,
  // from: 40,
  // to: 90,
  vertical: true,
};
const options4 = {
  limits: { min: 0, max: 100 },
  curValue: 85,
  showValueNote: true,
  step: 15,
  double: true,
  from: 40,
  to: 90,
  vertical: true,
};

$('.js-container1').adslider(options1);
$('.js-container2').adslider(options2);
$('.js-container3').adslider(options3);
$('.js-container4').adslider(options4);

/* eslint-disable no-new */
new DemoPage('.js-container1');
new DemoPage('.js-container2');
new DemoPage('.js-container3');
new DemoPage('.js-container4');
