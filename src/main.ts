import DemoPage from './demoPage/demoPage';


let options1 = {
  limits: { min: 0, max: 100 },
  curValue: 35,
  showValueNote: true,
  // step: 20,
  double: true,
  from: 20,
  to: 80,
  // vertical: true,
};
const options2 = {
  limits: { min: 0, max: 100 },
  curValue: 85,
  showValueNote: true,
  // step: 20,
  // double: true,
  // from: 40,
  // to: 90,
  // vertical: true,
};

$('.container1').adslider(options1);
$('.container2').adslider(options2);

const demopage1 = new DemoPage('.container1');
const demopage2 = new DemoPage('.container2');





// const updateAdslider1 = (): void => {
//   options1.curValue = Number(inputCurValue1.value);
//   options1.limits.min = Number(inputMinValue1.value);
//   options1.limits.max = Number(inputMaxValue1.value);
//   if (inputShowValue1.checked) {
//     options1.showValueNote = true;
//   } else {
//     options1.showValueNote = false;
//   }
//   options1.step = Number(inputStep1.value);
//   if (inputVertical1.checked) {
//     options1.vertical = true;
//   } else {
//     options1.vertical = false;
//   }
//   if (inputDouble1.checked) {
//     options1.double = true;
//   } else {
//     options1.double = false;
//   }
//   options1.from = Number(inputFrom1.value);
//   options1.to = Number(inputTo1.value);
//   $('.container1').adslider('update', options1);
// };

// const updateAdslider2 = (): void => {
//   options2.curValue = Number(inputCurValue2.value);
//   options2.limits.min = Number(inputMinValue2.value);
//   options2.limits.max = Number(inputMaxValue2.value);
//   if (inputShowValue2.checked) {
//     options2.showValueNote = true;
//   } else {
//     options2.showValueNote = false;
//   }
//   options2.step = Number(inputStep2.value);
//   if (inputVertical2.checked) {
//     options2.vertical = true;
//   } else {
//     options2.vertical = false;
//   }
//   if (inputDouble2.checked) {
//     options2.double = true;
//   } else {
//     options2.double = false;
//   }
//   options2.from = Number(inputFrom2.value);
//   options2.to = Number(inputTo2.value);
//   $('.container2').adslider('update', options2);
// };

// inputCurValue1.addEventListener('change', updateAdslider1);
// inputMinValue1.addEventListener('change', updateAdslider1);
// inputMaxValue1.addEventListener('change', updateAdslider1);
// inputShowValue1.addEventListener('change', updateAdslider1);
// inputStep1.addEventListener('change', updateAdslider1);
// inputVertical1.addEventListener('change', updateAdslider1);
// inputDouble1.addEventListener('change', updateAdslider1);
// inputFrom1.addEventListener('change', updateAdslider1);
// inputTo1.addEventListener('change', updateAdslider1);

// inputCurValue2.addEventListener('change', updateAdslider2);
// inputMinValue2.addEventListener('change', updateAdslider2);
// inputMaxValue2.addEventListener('change', updateAdslider2);
// inputShowValue2.addEventListener('change', updateAdslider2);
// inputStep2.addEventListener('change', updateAdslider2);
// inputVertical2.addEventListener('change', updateAdslider2);
// inputDouble2.addEventListener('change', updateAdslider2);
// inputFrom2.addEventListener('change', updateAdslider2);
// inputTo2.addEventListener('change', updateAdslider2);





// const valueOnSlider1 = container1.querySelector('.adslider__value');
// function updateInput1(): void {
//   inputCurValue1.value = valueOnSlider1.textContent;
// }
// valueOnSlider1.addEventListener('DOMSubtreeModified', updateInput1);


// const valueOnSlider2 = container2.querySelector('.adslider__value');
// function updateInput2(): void {
//   inputCurValue2.value = valueOnSlider2.textContent;
// }
// valueOnSlider2.addEventListener('DOMSubtreeModified', updateInput2);




// if (inputDouble1.checked) {
//   const noteFrom1 = container1.querySelector('.adslider__note_from');
//   const valueFrom1 = noteFrom1.querySelector('.adslider__value');
//   function updateInputFrom1(): void {
//     inputFrom1.value = valueFrom1.textContent;
//   }
//   valueFrom1.addEventListener('DOMSubtreeModified', updateInputFrom1);

//   const noteTo1 = container1.querySelector('.adslider__note');
//   const valueTo1 = noteTo1.querySelector('.adslider__value');
//   function updateInputTo1(): void {
//     inputTo1.value = valueTo1.textContent;
//   }
//   valueTo1.addEventListener('DOMSubtreeModified', updateInputTo1);
// }

// if (inputDouble2.checked) {
//   const noteFrom2 = container2.querySelector('.adslider__note_from');
//   const valueFrom2 = noteFrom2.querySelector('.adslider__value');
//   function updateInputFrom2(): void {
//     inputFrom2.value = valueFrom2.textContent;
//   }
//   valueFrom2.addEventListener('DOMSubtreeModified', updateInputFrom2);

//   const noteTo2 = container2.querySelector('.adslider__note');
//   const valueTo2 = noteTo2.querySelector('.adslider__value');
//   function updateInputTo2(): void {
//     inputTo2.value = valueTo2.textContent;
//   }
//   valueTo2.addEventListener('DOMSubtreeModified', updateInputTo2);
// }



// const updateInputFrom = (): void {
//   if (inputDouble1.checked) {
//     const noteFrom1 = container1.querySelector('.adslider__note_from');
//     const valueFrom1 = noteFrom1.querySelector('.adslider__value');
//     function updateInputFrom1(): void {
//       inputFrom1.value = valueFrom1.textContent;
//     }
//     valueFrom1.addEventListener('DOMSubtreeModified', updateInputFrom1);

//     const noteTo1 = container1.querySelector('.adslider__note');
//     const valueTo1 = noteTo1.querySelector('.adslider__value');
//     function updateInputTo1(): void {
//       inputTo1.value = valueTo1.textContent;
//     }
//     valueTo1.addEventListener('DOMSubtreeModified', updateInputTo1);
//   }
//   if (inputDouble2.checked) {
//     const noteFrom2 = container2.querySelector('.adslider__note_from');
//     const valueFrom2 = noteFrom2.querySelector('.adslider__value');
//     function updateInputFrom2(): void {
//       inputFrom2.value = valueFrom2.textContent;
//     }
//     valueFrom2.addEventListener('DOMSubtreeModified', updateInputFrom2);

//     const noteTo2 = container2.querySelector('.adslider__note');
//     const valueTo2 = noteTo2.querySelector('.adslider__value');
//     function updateInputTo2(): void {
//       inputTo2.value = valueTo2.textContent;
//     }
//     valueTo2.addEventListener('DOMSubtreeModified', updateInputTo2);
//   }
// }
// inputDouble1.addEventListener('change', updateInputFrom);
// inputDouble2.addEventListener('change', updateInputFrom);

// function updateInput1(): void {
//   inputCurValue1.value = valueOnSlider1.textContent;
// }
// valueOnSlider1.addEventListener('DOMSubtreeModified', updateInput1);
