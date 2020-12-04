'use strict';
window.addEventListener('DOMContentLoaded', function() {

  const slider = document.querySelector('.ad-slider');
  const sliderWidth = parseInt(getComputedStyle(slider).width, 10);

  const roller = document.querySelector('.ad-slider__roller');
  const rollerWidth = parseInt(getComputedStyle(roller).width, 10);

  const value = document.querySelector('.ad-slider__value');

  let isScrolling = false;
  let x;
  let x2 = 0;

  function startScrolling(e) {
    x = e.clientX;
    isScrolling = true;
  }

  function scrolling(e) {
    if (isScrolling) {
      const move = (e.clientX - x) + x2;
      if (move < 0) {
        roller.style.left = `0px`;
        value.style.left = `0px`;
      } else if (move > (sliderWidth - rollerWidth)) {
        roller.style.left = `${sliderWidth - rollerWidth}px`;
        value.style.left = `${sliderWidth - rollerWidth}px`;
      } else {
        roller.style.left = `${move}px`;
        value.style.left = `${move}px`;
      }
    }
  }

  function stopScrolling() {
    isScrolling = false;
    x2 = parseInt(getComputedStyle(roller).left, 10);
  }

  roller.addEventListener('mousedown', e => startScrolling(e));
  document.addEventListener('mousemove', e => scrolling(e));
  document.addEventListener('mouseup', () => stopScrolling());


});