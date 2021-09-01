import DemoPage from './demoPage/demoPage';

let options1 = {
  limits: { min: 0, max: 100 },
  curValue: 12,
  showValueNote: true,
  step: 20,
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
  // step: 0,
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

$('.container1').adslider(options1);
$('.container2').adslider(options2);
$('.container3').adslider(options3);
$('.container4').adslider(options4);

const demopage1 = new DemoPage('.container1');
const demopage2 = new DemoPage('.container2');
const demopage3 = new DemoPage('.container3');
const demopage4 = new DemoPage('.container4');
